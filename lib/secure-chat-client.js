/**
 * Cliente de Chat Seguro - Enterprise Grade
 * SEM LOGS DE CONTEÚDO - MÁXIMA SEGURANÇA
 */

class SecureChatClient {
  constructor() {
    this.neuralId = this.initializeSecureSession()
    this.isConnected = false
    this.connectionRetries = 0
    this.maxRetries = 3
    this.requestQueue = new Map()

    // Verificar conexão inicial
    this.checkConnection()

    // Debug técnico apenas (sem conteúdo)
    if (this.isDevelopment()) {
      this.debugLog("SecureChatClient initialized")
    }
  }

  isDevelopment() {
    return window.location.hostname === "localhost" || window.location.hostname.includes("dev")
  }

  debugLog(message, metadata = null) {
    if (this.isDevelopment()) {
      console.log(`[SecureChat] ${message}`, metadata ? { hasMetadata: true } : {})
    }
  }

  initializeSecureSession() {
    let sessionId = sessionStorage.getItem("secure_chat_session")
    if (!sessionId || !this.isValidSessionId(sessionId)) {
      sessionId = this.generateSecureSessionId()
      sessionStorage.setItem("secure_chat_session", sessionId)
    }

    // Disponibilizar globalmente para compatibilidade
    window.userNeuralId = sessionId
    return sessionId
  }

  generateSecureSessionId() {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 12)
    const browser = navigator.userAgent.slice(-10).replace(/[^a-zA-Z0-9]/g, "")
    return `chat_${timestamp}_${random}_${browser}`.toLowerCase()
  }

  isValidSessionId(sessionId) {
    return /^chat_\d+_[a-z0-9]+_[a-z0-9]+$/.test(sessionId)
  }

  /**
   * Enviar mensagem de forma segura
   */
  async sendMessage(message, options = {}) {
    const { onStart, onMessage, onComplete, onError, useStream = false } = options

    // Validações de segurança
    if (!message || typeof message !== "string") {
      if (onError) onError(new Error("Mensagem inválida"))
      return false
    }

    if (message.length > 4000) {
      if (onError) onError(new Error("Mensagem muito longa"))
      return false
    }

    // Sanitizar entrada
    const sanitizedMessage = this.sanitizeInput(message)
    if (!sanitizedMessage) {
      if (onError) onError(new Error("Mensagem vazia após sanitização"))
      return false
    }

    if (onStart) onStart()

    try {
      if (useStream) {
        return await this.sendStreamMessage(sanitizedMessage, { onMessage, onComplete, onError })
      } else {
        return await this.sendDirectMessage(sanitizedMessage, { onMessage, onComplete, onError })
      }
    } catch (error) {
      this.debugLog("Message send failed")
      if (onError) onError(error)
      return false
    }
  }

  sanitizeInput(input) {
    return input
      .trim()
      .replace(/[<>]/g, "") // Remove HTML tags básicos
      .replace(/javascript:/gi, "") // Remove javascript: URLs
      .replace(/on\w+=/gi, "") // Remove event handlers
      .substring(0, 4000)
  }

  /**
   * Envio direto seguro
   */
  async sendDirectMessage(message, callbacks) {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
    const startTime = Date.now()

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Request-ID": requestId,
        },
        body: JSON.stringify({
          message,
          neuralId: this.neuralId,
          messageType: "text",
        }),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      const responseTime = Date.now() - startTime

      this.debugLog("Direct message completed", { responseTime })

      if (data.success && data.message) {
        this.isConnected = true
        this.connectionRetries = 0

        if (callbacks.onMessage) {
          callbacks.onMessage(data.message, "agent")
        }
        if (callbacks.onComplete) {
          callbacks.onComplete(data)
        }
        return true
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      this.debugLog("Direct message error")

      // Retry automático
      if (this.connectionRetries < this.maxRetries) {
        this.connectionRetries++
        await new Promise((resolve) => setTimeout(resolve, 1000 * this.connectionRetries))
        return this.sendDirectMessage(message, callbacks)
      }

      this.isConnected = false
      if (callbacks.onError) callbacks.onError(error)
      return false
    }
  }

  /**
   * Envio com streaming seguro
   */
  async sendStreamMessage(message, callbacks) {
    try {
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          neuralId: this.neuralId,
        }),
      })

      if (!response.body) {
        throw new Error("Streaming not supported")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullMessage = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6))

              if (data.type === "chunk" && data.content) {
                fullMessage += data.content
                if (callbacks.onMessage) {
                  callbacks.onMessage(fullMessage, "agent", { streaming: true })
                }
              } else if (data.type === "end") {
                if (callbacks.onComplete) {
                  callbacks.onComplete({ message: fullMessage })
                }
                return true
              } else if (data.type === "error") {
                throw new Error("Stream processing error")
              }
            } catch (e) {
              // Ignorar linhas malformadas silenciosamente
            }
          }
        }
      }
    } catch (error) {
      this.debugLog("Stream error, falling back to direct")
      // Fallback silencioso para envio direto
      return this.sendDirectMessage(message, callbacks)
    }
  }

  /**
   * Verificar conexão de forma segura
   */
  async checkConnection() {
    try {
      const response = await fetch("/api/chat", {
        method: "GET",
      })

      const data = await response.json()
      this.isConnected = data.status === "healthy" && data.n8n_connection

      this.debugLog("Connection check completed", {
        status: data.status,
        n8nConnected: data.n8n_connection,
      })

      return this.isConnected
    } catch (error) {
      this.isConnected = false
      this.debugLog("Connection check failed")
      return false
    }
  }

  /**
   * Obter status seguro (sem dados sensíveis)
   */
  getSecureStatus() {
    return {
      sessionActive: !!this.neuralId,
      isConnected: this.isConnected,
      retryCount: this.connectionRetries,
      timestamp: new Date().toISOString(),
    }
  }

  /**
   * Limpar sessão de forma segura
   */
  clearSecureSession() {
    sessionStorage.removeItem("secure_chat_session")
    this.neuralId = this.initializeSecureSession()
    this.debugLog("Session cleared and regenerated")
  }
}

// Instância global segura
window.secureChatClient = new SecureChatClient()

// Funções de compatibilidade (sem logs de conteúdo)
window.sendTextMessage = (message, neuralId, callback) => {
  return window.secureChatClient.sendMessage(message, {
    onMessage: (msg) => {
      if (window.addAgentMessageToChat) {
        window.addAgentMessageToChat(msg)
      }
    },
    onComplete: (data) => {
      if (callback) callback(null, data)
    },
    onError: (error) => {
      if (callback) callback(error, null)
    },
  })
}

// Função de teste segura
window.testSecureChat = () => {
  const testMessage = "Teste de conexão segura"
  return window.secureChatClient.sendMessage(testMessage, {
    onMessage: (response) => {
      if (window.secureChatClient.isDevelopment()) {
        console.log("[TEST] Resposta recebida com sucesso")
      }
    },
  })
}

// Log de inicialização apenas em desenvolvimento
if (window.secureChatClient.isDevelopment()) {
  console.log("🔒 SecureChatClient carregado - Modo seguro ativado")
  console.log("🧪 Para testar: window.testSecureChat()")
}
