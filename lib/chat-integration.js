/**
 * Integração Profissional do Chat com Chat ID
 * Sistema otimizado para n8n
 */

document.addEventListener("DOMContentLoaded", () => {
  initializeProfessionalChat()
})

function initializeProfessionalChat() {
  console.log("🚀 Inicializando chat profissional com Chat ID...")

  // Verificar dependências
  if (!window.professionalChat) {
    console.error("❌ ProfessionalChat não encontrado")
    return
  }

  if (!window.professionalChatUI) {
    console.error("❌ ProfessionalChatUI não encontrada")
    return
  }

  // Setup básico
  setupChatForm()
  setupConnectionMonitor()

  // Inicializar sessão de chat
  initializeChatSession()

  console.log("✅ Chat profissional inicializado!")
}

function initializeChatSession() {
  // Gerar Chat ID único
  const chatId = generateChatId()
  window.currentChatId = chatId
  
  console.log(`🆔 Chat ID gerado: ${chatId}`)
  
  // Notificar n8n sobre nova sessão
  window.professionalChat.notifySessionStart(chatId)
    .then(() => {
      console.log("✅ Sessão iniciada no n8n")
      // Enviar mensagem de boas-vindas
      setTimeout(() => {
        sendWelcomeMessage()
      }, 1000)
    })
    .catch(error => {
      console.error("❌ Erro ao iniciar sessão:", error)
      // Continuar mesmo com erro
      sendWelcomeMessage()
    })
}

function generateChatId() {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `chat_${timestamp}_${random}`
}

function setupChatForm() {
  const chatForm = document.getElementById("chat-form") || document.querySelector(".chat-form")
  const messageInput = document.getElementById("message-input") || document.querySelector(".message-input")
  const sendButton = document.getElementById("send-button") || document.querySelector(".send-button")

  if (!chatForm || !messageInput) {
    console.warn("⚠️ Elementos do formulário não encontrados")
    return
  }

  // Debounce para evitar spam
  let sendTimeout = null

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    if (sendTimeout) {
      clearTimeout(sendTimeout)
    }

    sendTimeout = setTimeout(async () => {
      await handleMessageSend(messageInput, sendButton)
    }, 50)
  })

  // Enter para enviar
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      chatForm.dispatchEvent(new Event("submit"))
    }
  })

  // Auto-resize do textarea
  messageInput.addEventListener("input", () => {
    messageInput.style.height = "auto"
    messageInput.style.height = messageInput.scrollHeight + "px"
  })
}

async function handleMessageSend(messageInput, sendButton) {
  const message = messageInput.value.trim()
  if (!message) return

  // UI
  window.professionalChatUI.addMessage(message, "user")
  messageInput.value = ""
  messageInput.style.height = "auto"

  // Estado do botão
  const originalText = sendButton?.textContent || "Enviar"
  if (sendButton) {
    sendButton.disabled = true
    sendButton.textContent = "Enviando..."
  }

  // Indicador de digitação
  window.professionalChatUI.showTypingIndicator()

  const startTime = Date.now()

  try {
    const success = await window.professionalChat.sendMessage(message, {
      chatId: window.currentChatId,
      onMessage: (agentMessage, sender, options) => {
        const responseTime = Date.now() - startTime
        console.log(`⚡ Resposta recebida em ${responseTime}ms`)

        window.professionalChatUI.addMessage(agentMessage, "agent")
        window.professionalChatUI.updateConnectionStatus(true, responseTime)
      },
      onComplete: (data) => {
        const totalTime = Date.now() - startTime
        console.log(`✅ Conversa completa em ${totalTime}ms`)
      },
      onError: (error) => {
        console.error("❌ Erro no envio:", error)
        window.professionalChatUI.addMessage(
          "Desculpe, ocorreu um erro temporário. Tente novamente em alguns segundos.",
          "agent",
        )
        window.professionalChatUI.updateConnectionStatus(false)
      },
    })

    if (!success) {
      console.warn("⚠️ Falha no envio da mensagem")
    }
  } catch (error) {
    console.error("❌ Erro inesperado:", error)
    window.professionalChatUI.addMessage("Erro inesperado. Verifique sua conexão e tente novamente.", "agent")
  } finally {
    // Restaurar UI
    if (sendButton) {
      sendButton.disabled = false
      sendButton.textContent = originalText
    }
    window.professionalChatUI.hideTypingIndicator()
  }
}

async function sendWelcomeMessage() {
  console.log("👋 Enviando mensagem de boas-vindas...")

  try {
    // Mostrar indicador de digitação
    window.professionalChatUI.showTypingIndicator()

    const startTime = Date.now()

    // Enviar mensagem inicial
    const success = await window.professionalChat.sendMessage("Olá", {
      chatId: window.currentChatId,
      messageType: "welcome",
      onMessage: (agentMessage, sender, options) => {
        const responseTime = Date.now() - startTime
        console.log(`🎉 Mensagem de boas-vindas recebida em ${responseTime}ms`)

        window.professionalChatUI.addMessage(agentMessage, "agent")
        window.professionalChatUI.updateConnectionStatus(true, responseTime)
      },
      onComplete: (data) => {
        const totalTime = Date.now() - startTime
        console.log(`✅ Boas-vindas completas em ${totalTime}ms`)
      },
      onError: (error) => {
        console.error("❌ Erro na mensagem de boas-vindas:", error)

        // Fallback: mostrar mensagem padrão
        const fallbackMessage = "Olá! Sou seu assistente virtual. Como posso ajudá-lo hoje?"
        window.professionalChatUI.addMessage(fallbackMessage, "agent")
        window.professionalChatUI.updateConnectionStatus(false)
      },
    })

    if (success) {
      console.log("✅ Mensagem de boas-vindas enviada com sucesso")
    } else {
      console.warn("⚠️ Falha no envio da mensagem de boas-vindas")
    }
  } catch (error) {
    console.error("❌ Erro inesperado na mensagem de boas-vindas:", error)

    // Fallback: mostrar mensagem padrão
    const fallbackMessage = "Olá! Estou aqui para ajudá-lo. Como posso ser útil hoje?"
    window.professionalChatUI.addMessage(fallbackMessage, "agent")
  } finally {
    // Esconder indicador de digitação
    window.professionalChatUI.hideTypingIndicator()
  }
}

function setupConnectionMonitor() {
  // Monitor de conexão
  setInterval(async () => {
    const status = await window.professionalChat.quickConnectionCheck()
    window.professionalChatUI.updateConnectionStatus(status.isHealthy, status.responseTime)
  }, 30000) // A cada 30 segundos
}

// Função de teste
window.testProfessionalChat = async () => {
  console.log("🧪 Testando chat profissional...")

  const testMessages = ["Teste 1", "Teste 2", "Como você está?"]

  for (let i = 0; i < testMessages.length; i++) {
    const startTime = Date.now()

    await window.professionalChat.sendMessage(testMessages[i], {
      chatId: window.currentChatId,
      onComplete: (data) => {
        const responseTime = Date.now() - startTime
        console.log(`✅ Teste ${i + 1} - Tempo: ${responseTime}ms`)
      },
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}

// Função para obter Chat ID atual
window.getCurrentChatId = () => {
  return window.currentChatId
}

// Função para reiniciar sessão
window.restartChatSession = () => {
  console.log("🔄 Reiniciando sessão de chat...")
  initializeChatSession()
}

console.log("💬 Chat profissional integrado!")
console.log("💡 Para testar: window.testProfessionalChat()")
console.log("🆔 Para obter Chat ID: window.getCurrentChatId()")
