/**
 * Interface Simples do Chat
 * UI limpa e responsiva
 */

class SimpleChatUI {
  constructor() {
    this.chatContainer = null
    this.messagesContainer = null
    this.typingIndicator = null
    this.connectionStatus = null

    this.initialize()
  }

  initialize() {
    console.log("🎨 Inicializando SimpleChatUI...")

    this.findElements()
    this.createUIElements()
    this.setupStyles()

    console.log("✅ SimpleChatUI inicializada")
  }

  findElements() {
    // Tentar encontrar elementos existentes
    this.chatContainer =
      document.querySelector(".chat-container") ||
      document.querySelector("#chat-container") ||
      document.querySelector(".chat-interface") ||
      document.querySelector("#chat-interface")

    this.messagesContainer =
      document.querySelector(".messages-container") ||
      document.querySelector("#messages-container") ||
      document.querySelector(".chat-messages") ||
      document.querySelector("#chat-messages")
  }

  createUIElements() {
    // Se não encontrar elementos, criar estrutura básica
    if (!this.chatContainer) {
      this.createChatStructure()
    }

    // Criar indicador de digitação
    this.createTypingIndicator()

    // Criar status de conexão
    this.createConnectionStatus()
  }

  createChatStructure() {
    // Criar estrutura básica do chat se não existir
    const chatHTML = `
      <div class="simple-chat-container" style="
        max-width: 800px;
        margin: 2rem auto;
        background: white;
        border-radius: 1rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        overflow: hidden;
      ">
        <div class="chat-header" style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem;
          text-align: center;
        ">
          <h3 style="margin: 0; font-size: 1.2rem;">Assistente Virtual</h3>
          <div class="connection-status" style="font-size: 0.8rem; opacity: 0.9; margin-top: 0.5rem;">
            Conectando...
          </div>
        </div>
        
        <div class="messages-container" style="
          height: 400px;
          overflow-y: auto;
          padding: 1rem;
          background: #f8f9fa;
        ">
          <!-- Mensagens aparecerão aqui -->
        </div>
        
        <div class="typing-indicator" style="
          padding: 0.5rem 1rem;
          background: #f8f9fa;
          border-top: 1px solid #e9ecef;
          display: none;
          font-style: italic;
          color: #6c757d;
          font-size: 0.9rem;
        ">
          Assistente está digitando...
        </div>
        
        <form class="chat-form" style="
          padding: 1rem;
          background: white;
          border-top: 1px solid #e9ecef;
          display: flex;
          gap: 0.5rem;
        ">
          <textarea 
            class="message-input" 
            placeholder="Digite sua mensagem..."
            style="
              flex: 1;
              padding: 0.75rem;
              border: 1px solid #ddd;
              border-radius: 0.5rem;
              resize: none;
              font-family: inherit;
              font-size: 1rem;
              min-height: 44px;
              max-height: 120px;
            "
          ></textarea>
          <button 
            type="submit" 
            class="send-button"
            style="
              padding: 0.75rem 1.5rem;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              border-radius: 0.5rem;
              cursor: pointer;
              font-weight: 500;
              transition: all 0.2s;
            "
          >
            Enviar
          </button>
        </form>
      </div>
    `

    // Inserir no body se não houver container
    const existingContainer = document.querySelector(".simple-chat-container")
    if (!existingContainer) {
      document.body.insertAdjacentHTML("beforeend", chatHTML)
    }

    // Atualizar referências
    this.chatContainer = document.querySelector(".simple-chat-container")
    this.messagesContainer = document.querySelector(".messages-container")
    this.typingIndicator = document.querySelector(".typing-indicator")
    this.connectionStatus = document.querySelector(".connection-status")
  }

  createTypingIndicator() {
    if (!this.typingIndicator) {
      this.typingIndicator = document.querySelector(".typing-indicator")
    }
  }

  createConnectionStatus() {
    if (!this.connectionStatus) {
      this.connectionStatus = document.querySelector(".connection-status")
    }
  }

  setupStyles() {
    // Adicionar estilos CSS se necessário
    const styleId = "simple-chat-styles"
    if (!document.getElementById(styleId)) {
      const styles = `
        <style id="${styleId}">
          .simple-chat-container .send-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
          
          .simple-chat-container .message-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
          
          .chat-message {
            margin-bottom: 1rem;
            animation: fadeInUp 0.3s ease;
          }
          
          .chat-message.user {
            text-align: right;
          }
          
          .chat-message.agent {
            text-align: left;
          }
          
          .message-bubble {
            display: inline-block;
            padding: 0.75rem 1rem;
            border-radius: 1rem;
            max-width: 80%;
            word-wrap: break-word;
          }
          
          .message-bubble.user {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          
          .message-bubble.agent {
            background: white;
            color: #333;
            border: 1px solid #e9ecef;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .messages-container::-webkit-scrollbar {
            width: 6px;
          }
          
          .messages-container::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          
          .messages-container::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
          }
          
          .messages-container::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
        </style>
      `
      document.head.insertAdjacentHTML("beforeend", styles)
    }
  }

  addMessage(message, sender = "user", options = {}) {
    if (!this.messagesContainer) {
      console.warn("⚠️ Container de mensagens não encontrado")
      return
    }

    const messageElement = document.createElement("div")
    messageElement.className = `chat-message ${sender}`

    const bubbleElement = document.createElement("div")
    bubbleElement.className = `message-bubble ${sender}`
    bubbleElement.textContent = message

    messageElement.appendChild(bubbleElement)

    if (options.streaming) {
      messageElement.classList.add("message-streaming")
    }

    this.messagesContainer.appendChild(messageElement)
    this.scrollToBottom()

    return messageElement
  }

  updateMessage(messageElement, newContent) {
    if (messageElement) {
      const bubble = messageElement.querySelector(".message-bubble")
      if (bubble) {
        bubble.textContent = newContent
      }
    }
  }

  showTypingIndicator() {
    if (this.typingIndicator) {
      this.typingIndicator.style.display = "block"
    }
  }

  hideTypingIndicator() {
    if (this.typingIndicator) {
      this.typingIndicator.style.display = "none"
    }
  }

  updateConnectionStatus(isHealthy, responseTime = null) {
    if (!this.connectionStatus) return

    if (isHealthy) {
      const timeText = responseTime ? ` (${responseTime}ms)` : ""
      this.connectionStatus.textContent = `Conectado${timeText}`
      this.connectionStatus.style.color = "#28a745"
    } else {
      this.connectionStatus.textContent = "Desconectado"
      this.connectionStatus.style.color = "#dc3545"
    }
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    }
  }

  clearMessages() {
    if (this.messagesContainer) {
      this.messagesContainer.innerHTML = ""
    }
  }
}

// Instância global
window.simpleChatUI = new SimpleChatUI()

console.log("🎨 SimpleChatUI carregada!")
