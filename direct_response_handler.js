/**
 * Handler de Resposta Direta Profissional
 * Otimizado para Chat ID e n8n
 */

class ProfessionalDirectResponseHandler {
  constructor() {
    this.isActive = true
    this.pendingResponses = new Map()
    this.chatResponses = new Map()
    this.maxWaitTime = 15000 // 15 segundos para n8n
    this.activeChatId = null

    console.log("🎯 ProfessionalDirectResponseHandler inicializado")
  }

  setChatId(chatId) {
    this.activeChatId = chatId
    console.log(`🆔 Chat ID ativo: ${chatId}`)
  }

  async waitForResponse(requestId, chatId = null, timeout = this.maxWaitTime) {
    const targetChatId = chatId || this.activeChatId
    
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        this.pendingResponses.delete(requestId)
        reject(new Error("Timeout aguardando resposta do n8n"))
      }, timeout)

      this.pendingResponses.set(requestId, {
        resolve,
        reject,
        timeoutId,
        chatId: targetChatId,
        timestamp: Date.now(),
      })

      console.log(`⏳ Aguardando resposta: ${requestId} (Chat: ${targetChatId})`)
    })
  }

  async waitForChatResponse(chatId, timeout = this.maxWaitTime) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        this.chatResponses.delete(chatId)
        reject(new Error("Timeout aguardando resposta do chat"))
      }, timeout)

      this.chatResponses.set(chatId, {
        resolve,
        reject,
        timeoutId,
        timestamp: Date.now(),
      })

      console.log(`⏳ Aguardando resposta do chat: ${chatId}`)
    })
  }

  handleDirectResponse(requestId, data, chatId = null) {
    const pending = this.pendingResponses.get(requestId)

    if (pending) {
      // Verificar se é para o chat correto
      if (chatId && pending.chatId && chatId !== pending.chatId) {
        console.warn(`⚠️ Resposta para chat diferente: esperado ${pending.chatId}, recebido ${chatId}`)
        return false
      }

      clearTimeout(pending.timeoutId)
      this.pendingResponses.delete(requestId)

      console.log(`✅ Resposta direta processada: ${requestId} (Chat: ${chatId})`)
      pending.resolve(data)
      return true
    } else {
      console.warn(`⚠️ Resposta sem requisição pendente: ${requestId}`)
      return false
    }
  }

  handleChatResponse(chatId, data) {
    const pending = this.chatResponses.get(chatId)

    if (pending) {
      clearTimeout(pending.timeoutId)
      this.chatResponses.delete(chatId)

      console.log(`✅ Resposta do chat processada: ${chatId}`)
      pending.resolve(data)
      return true
    } else {
      console.warn(`⚠️ Resposta de chat sem requisição pendente: ${chatId}`)
      return false
    }
  }

  cleanup() {
    // Limpar respostas antigas
    const now = Date.now()
    const maxAge = 60000 // 60 segundos

    // Limpar requisições pendentes
    for (const [requestId, pending] of this.pendingResponses.entries()) {
      if (now - pending.timestamp > maxAge) {
        clearTimeout(pending.timeoutId)
        this.pendingResponses.delete(requestId)
        pending.reject(new Error("Resposta expirada"))
        console.log(`🧹 Requisição expirada removida: ${requestId}`)
      }
    }

    // Limpar respostas de chat
    for (const [chatId, pending] of this.chatResponses.entries()) {
      if (now - pending.timestamp > maxAge) {
        clearTimeout(pending.timeoutId)
        this.chatResponses.delete(chatId)
        pending.reject(new Error("Resposta de chat expirada"))
        console.log(`🧹 Resposta de chat expirada removida: ${chatId}`)
      }
    }
  }

  destroy() {
    this.isActive = false

    // Cancelar todas as requisições pendentes
    for (const [requestId, pending] of this.pendingResponses.entries()) {
      clearTimeout(pending.timeoutId)
      pending.reject(new Error("Handler destruído"))
    }

    for (const [chatId, pending] of this.chatResponses.entries()) {
      clearTimeout(pending.timeoutId)
      pending.reject(new Error("Handler destruído"))
    }

    this.pendingResponses.clear()
    this.chatResponses.clear()
    this.activeChatId = null
    
    console.log("🗑️ ProfessionalDirectResponseHandler destruído")
  }

  getStats() {
    return {
      isActive: this.isActive,
      pendingCount: this.pendingResponses.size,
      chatResponsesCount: this.chatResponses.size,
      maxWaitTime: this.maxWaitTime,
      activeChatId: this.activeChatId,
    }
  }

  // Método para testar o sistema
  async testSystem() {
    console.log("🧪 Testando sistema de resposta direta...")
    
    const testRequestId = `test_${Date.now()}`
    const testChatId = this.activeChatId || "test_chat"
    
    // Simular resposta após 1 segundo
    setTimeout(() => {
      this.handleDirectResponse(testRequestId, {
        message: "Teste bem-sucedido",
        timestamp: new Date().toISOString()
      }, testChatId)
    }, 1000)
    
    try {
      const response = await this.waitForResponse(testRequestId, testChatId, 5000)
      console.log("✅ Teste bem-sucedido:", response)
      return true
    } catch (error) {
      console.error("❌ Teste falhou:", error)
      return false
    }
  }
}

// Instância global
window.professionalDirectResponseHandler = new ProfessionalDirectResponseHandler()

// Compatibilidade
window.directResponseHandler = window.professionalDirectResponseHandler

// Limpeza automática a cada 30 segundos
setInterval(() => {
  if (window.professionalDirectResponseHandler) {
    window.professionalDirectResponseHandler.cleanup()
  }
}, 30000)

console.log("🎯 professional_direct_response_handler.js carregado")
console.log("📊 Para estatísticas: window.professionalDirectResponseHandler.getStats()")
console.log("🧪 Para testar: window.professionalDirectResponseHandler.testSystem()")
