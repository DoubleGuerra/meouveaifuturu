/**
 * INTERCEPTADOR GLOBAL DE MENSAGENS DO CHAT
 * Garante que TODAS as ações sejam enviadas corretamente
 */

console.log("🔧 Carregando interceptador de mensagens...")

// Interceptar fetch globalmente
const originalFetch = window.fetch
window.fetch = function (...args) {
  const [url, options] = args

  // Verificar se é uma requisição para o webhook n8n
  if (url && url.includes("n8n-n8n-start.moas8k.easypanel.host/webhook/agente-me-ouve-AI")) {
    console.log("🎯 INTERCEPTANDO REQUISIÇÃO PARA N8N")
    console.log("📡 URL:", url)

    if (options && options.body) {
      try {
        let bodyData

        // Tratar diferentes tipos de body
        if (typeof options.body === "string") {
          bodyData = JSON.parse(options.body)
        } else if (options.body instanceof FormData) {
          // Para FormData (áudio), converter para objeto
          bodyData = {}
          for (const [key, value] of options.body.entries()) {
            bodyData[key] = value
          }
        }

        console.log("📦 Body interceptado:", bodyData)

        // Se NÃO tem action definida, é uma mensagem de chat
        if (!bodyData.action) {
          console.log("💬 DETECTADA MENSAGEM DE CHAT - Adicionando dados")

          // Garantir Neural ID
          if (!bodyData.neuralId && window.userNeuralId) {
            bodyData.neuralId = window.userNeuralId
          }

          // 3. AÇÃO: "chat_message" - PAYLOAD COMPLETO
          bodyData.action = "chat_message"
          bodyData.messageType = bodyData.contentType === "audio" ? "audio" : "text"
          bodyData.source = "chat_interceptor"
          bodyData.timestamp = bodyData.timestamp || new Date().toISOString()

          // Se não tem contentType, definir baseado no conteúdo
          if (!bodyData.contentType) {
            bodyData.contentType = bodyData.content ? "text" : "unknown"
          }

          console.log("📦 Body modificado para chat_message:", bodyData)

          // Atualizar o body da requisição
          if (typeof options.body === "string") {
            options.body = JSON.stringify(bodyData)
          } else if (options.body instanceof FormData) {
            // Para FormData, recriar com os novos dados
            const newFormData = new FormData()
            for (const [key, value] of Object.entries(bodyData)) {
              if (value instanceof File || value instanceof Blob) {
                newFormData.append(key, value)
              } else {
                newFormData.append(key, String(value))
              }
            }
            options.body = newFormData
          }
        } else {
          console.log(`ℹ️ Requisição já tem action definida: ${bodyData.action}`)
        }
      } catch (error) {
        console.error("❌ Erro ao processar body:", error)
      }
    }
  }

  // Chamar fetch original
  return originalFetch.apply(this, args)
}

console.log("✅ Interceptador de mensagens carregado")
