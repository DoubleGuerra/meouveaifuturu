/**
 * Handler de Resposta Profissional para n8n
 * Otimizado para Chat ID
 */

class ProfessionalResponseHandler {
  constructor() {
    this.isActive = true
    this.responseQueue = []
    this.processingQueue = false
    this.activeChatId = null

    console.log("📡 ProfessionalResponseHandler inicializado")
  }

  setChatId(chatId) {
    this.activeChatId = chatId
    console.log(`🆔 Chat ID ativo: ${chatId}`)
  }

  async handleResponse(data, chatId = null) {
    if (!this.isActive) return

    try {
      console.log("📨 Resposta do n8n recebida:", data)

      // Verificar se a resposta é para o chat ativo
      const targetChatId = chatId || data.chatId || this.activeChatId
      
      if (targetChatId && this.activeChatId && targetChatId !== this.activeChatId) {
        console.log("⚠️ Resposta para chat diferente, ignorando")
        return
      }

      // Adicionar à fila
      this.responseQueue.push({
        data,
        chatId: targetChatId,
        timestamp: Date.now(),
        processed: false,
      })

      // Processar fila
      if (!this.processingQueue) {
        this.processQueue()
      }
    } catch (error) {
      console.error("❌ Erro no handler de resposta:", error)
    }
  }

  async processQueue() {
    this.processingQueue = true

    while (this.responseQueue.length > 0) {
      const item = this.responseQueue.shift()

      try {
        await this.processResponse(item.data, item.chatId)
        item.processed = true
      } catch (error) {
        console.error("❌ Erro ao processar resposta:", error)
      }
    }

    this.processingQueue = false
  }

  async processResponse(data, chatId) {
    // Verificar se é resposta do chat
    if (data.message || data.content || data.output) {
      const message = data.message || data.content || data.output

      // Adicionar mensagem ao chat se estiver aberto
      if (window.professionalChatUI && window.professionalChatUI.addMessage) {
        window.professionalChatUI.addMessage(message, "agent")
        console.log(`✅ Mensagem adicionada ao chat (${chatId})`)
      } else if (window.addMessage) {
        // Fallback para função global
        window.addMessage(message, "agent")
        console.log(`✅ Mensagem adicionada via fallback (${chatId})`)
      }

      // Disparar evento personalizado
      const event = new CustomEvent("agentResponseReceived", {
        detail: {
          message,
          chatId,
          timestamp: Date.now(),
          source: "n8n"
        }
      })
      document.dispatchEvent(event)
    }

    // Processar outros tipos de resposta
    if (data.action) {
      this.handleActionResponse(data, chatId)
    }
  }

  handleActionResponse(data, chatId) {
    switch (data.action) {
      case "chat_started":
        console.log(`🚀 Chat iniciado confirmado: ${chatId}`)
        break
      case "chat_ended":
        console.log(`🔚 Chat finalizado: ${chatId}`)
        break
      case "typing":
        if (window.professionalChatUI && window.professionalChatUI.showTypingIndicator) {
          window.professionalChatUI.showTypingIndicator()
        }
        break
      case "stop_typing":
        if (window.professionalChatUI && window.professionalChatUI.hideTypingIndicator) {
          window.professionalChatUI.hideTypingIndicator()
        }
        break
      default:
        console.log(`📋 Ação recebida: ${data.action}`)
    }
  }

  getStats() {
    return {
      isActive: this.isActive,
      queueLength: this.responseQueue.length,
      processingQueue: this.processingQueue,
      activeChatId: this.activeChatId
    }
  }

  destroy() {
    this.isActive = false
    this.responseQueue = []
    this.activeChatId = null
    console.log("🗑️ ProfessionalResponseHandler destruído")
  }
}

// Instância global
window.professionalResponseHandler = new ProfessionalResponseHandler()

// Compatibilidade
window.webhookResponseHandler = window.professionalResponseHandler

console.log("📡 professional_response_handler.js carregado")
console.log("📊 Para estatísticas: window.professionalResponseHandler.getStats()")
