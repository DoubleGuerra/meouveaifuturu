/**
 * Cliente de Chat Profissional
 * Integração otimizada com n8n usando Chat ID
 */

class ProfessionalChatClient {
  constructor() {
    this.apiUrl = "/api/chat"
    this.webhookUrl = "https://n8n-n8n-start.moas8k.easypanel.host/webhook/agente-me-ouve-AI"
    this.connectionStatus = "checking"
    this.requestId = 0
    this.currentChatId = null

    this.initialize()
  }

  async initialize() {
    console.log("🚀 Inicializando ProfessionalChatClient...")

    // Verificar conexão inicial
    await this.checkConnection()

    console.log("✅ ProfessionalChatClient inicializado")
  }

  generateChatId() {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000)
    return `chat_${timestamp}_${random}`
  }

  async notifySessionStart(chatId) {
    this.currentChatId = chatId
    
    const payload = {
      contentType: "system",
      action: "chat_started",
      chatId: chatId,
      timestamp: new Date().toISOString(),
      source: "chat_system",
      userAgent: navigator.userAgent
    }

    try {
      console.log("🔔 Notificando início de sessão para n8n...")
      
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
        mode: "cors"
      })

      if (response.ok) {
        console.log("✅ Sessão iniciada no n8n")
        return true
      } else {
        console.warn("⚠️ Falha ao notificar n8n:", response.status)
        return false
      }
    } catch (error) {
      console.error("❌ Erro ao notificar n8n:", error)
      return false
    }
  }

  async sendMessage(message, options = {}) {
    const messageId = `msg_${++this.requestId}_${Date.now()}`
    const chatId = options.chatId || this.currentChatId

    if (!chatId) {
      console.error("❌ Chat ID não definido")
      return false
    }

    console.log("📤 Enviando mensagem:", messageId, "Chat ID:", chatId)

    return this.sendMessageToN8n(message, options, messageId, chatId)
  }

  async sendMessageToN8n(message, options = {}, messageId, chatId) {
    const startTime = Date.now()

    try {
      const payload = {
        contentType: "text",
        action: "chat_message",
        content: message.trim(),
        chatId: chatId,
        messageId: messageId,
        messageType: options.messageType || "text",
        timestamp: new Date().toISOString(),
        source: "chat_interface"
      }

      console.log("📡 Enviando para n8n:", payload)

      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Message-ID": messageId,
          "X-Chat-ID": chatId
        },
        body: JSON.stringify(payload),
        mode: "cors"
      })

      const responseTime = Date.now() - startTime

      if (!response.ok) {
        throw new Error(`n8n Error: ${response.status} ${response.statusText}`)
      }

      // Processar resposta
      const text = await response.text()
      let data

      try {
        data = JSON.parse(text)
        console.log(`✅ Resposta JSON recebida em ${responseTime}ms:`, data)
      } catch (e) {
        data = { message: text, status: "success" }
        console.log(`✅ Resposta texto recebida em ${responseTime}ms:`, text)
      }

      // Chamar callback se fornecido
      if (options.onMessage) {
        let agentMessage = null
        
        // Tentar diferentes campos de resposta
        if (data.output) {
          agentMessage = data.output
        } else if (data.message) {
          agentMessage = data.message
        } else if (data.content) {
          agentMessage = data.content
        } else if (typeof data === 'string') {
          agentMessage = data
        }

        if (agentMessage) {
          options.onMessage(agentMessage, "agent", { responseTime })
        }
      }

      if (options.onComplete) {
        options.onComplete(data)
      }

      this.connectionStatus = "connected"
      return true
    } catch (error) {
      const responseTime = Date.now() - startTime
      console.error(`❌ Erro após ${responseTime}ms:`, error)

      if (options.onError) {
        options.onError(error)
      }

      this.connectionStatus = "error"
      return false
    }
  }

  async checkConnection() {
    try {
      console.log("🔍 Verificando conexão com n8n...")

      const testPayload = {
        contentType: "system",
        action: "health_check",
        timestamp: new Date().toISOString(),
        source: "connection_test"
      }

      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(testPayload),
        mode: "cors"
      })

      const isHealthy = response.ok
      this.connectionStatus = isHealthy ? "connected" : "degraded"

      console.log(`🔗 Status da conexão: ${this.connectionStatus}`)
      return isHealthy
    } catch (error) {
      console.error("❌ Erro na verificação de conexão:", error)
      this.connectionStatus = "error"
      return false
    }
  }

  async quickConnectionCheck() {
    const startTime = Date.now()
    const isHealthy = await this.checkConnection()
    const responseTime = Date.now() - startTime

    return {
      isHealthy,
      responseTime,
      status: this.connectionStatus,
    }
  }

  getCurrentChatId() {
    return this.currentChatId
  }

  setChatId(chatId) {
    this.currentChatId = chatId
    console.log(`🆔 Chat ID definido: ${chatId}`)
  }

  getStats() {
    return {
      connectionStatus: this.connectionStatus,
      requestId: this.requestId,
      currentChatId: this.currentChatId,
    }
  }

  // Método para testar o sistema
  async testSystem() {
    console.log("🧪 Testando sistema profissional...")
    
    const testChatId = this.generateChatId()
    await this.notifySessionStart(testChatId)
    
    const testMessage = "Teste do sistema profissional"
    
    return this.sendMessage(testMessage, {
      chatId: testChatId,
      messageType: "test",
      onMessage: (message, sender, options) => {
        console.log(`✅ Teste bem-sucedido: ${message}`)
      },
      onError: (error) => {
        console.error(`❌ Teste falhou: ${error}`)
      }
    })
  }
}

// Instância global
window.professionalChat = new ProfessionalChatClient()

// Compatibilidade
window.chatClient = window.professionalChat

console.log("💬 ProfessionalChatClient carregado!")
console.log("🧪 Para testar: window.professionalChat.testSystem()")
