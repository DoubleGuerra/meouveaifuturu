/**
 * Integração Otimizada do Formulário com n8n
 */

const FORM_N8N_CONFIG = {
  endpoint: "https://n8n-n8n-start.moas8k.easypanel.host/webhook/meouve-form",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
}

let isSubmitting = false // Flag para evitar múltiplos envios

function initFormIntegration() {
  const form = document.querySelector(".contact-form")
  if (form) {
    form.addEventListener("submit", handleFormSubmit)
    console.log("✅ Integração do formulário inicializada")
  } else {
    console.error("❌ Formulário de contato não encontrado")
  }
}

function handleFormSubmit(event) {
  event.preventDefault()

  // Evitar múltiplos envios
  if (isSubmitting) {
    console.log("⚠️ Envio já em andamento")
    return
  }

  const formData = {
    nome: document.getElementById("nome")?.value || "",
    cargo: document.getElementById("cargo")?.value || "",
    email: document.getElementById("email")?.value || "",
    telefone: document.getElementById("telefone")?.value || "",
    site: document.getElementById("site")?.value || "",
    funcionarios: document.getElementById("funcionarios")?.value || "",
    contato_telefone: document.getElementById("contato-telefone")?.checked || false,
    contato_email: document.getElementById("contato-email")?.checked || false,
    contato_whatsapp: document.getElementById("contato-whatsapp")?.checked || false,
    conheceu: document.getElementById("conheceu")?.value || "",
    timestamp: new Date().toISOString(),
  }

  if (!validateFormData(formData)) {
    showFormMessage("Por favor, preencha todos os campos obrigatórios.", "error")
    return
  }

  sendFormData(formData)
}

function validateFormData(formData) {
  if (!formData.nome || !formData.email || !formData.telefone) {
    return false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    showFormMessage("Por favor, insira um e-mail válido.", "error")
    return false
  }

  return true
}

function sendFormData(formData) {
  isSubmitting = true
  showFormMessage("Enviando seus dados...", "loading")

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FORM_N8N_CONFIG.timeout)

  fetch(FORM_N8N_CONFIG.endpoint, {
    method: "POST",
    headers: FORM_N8N_CONFIG.headers,
    body: JSON.stringify(formData),
    signal: controller.signal,
  })
    .then((response) => {
      clearTimeout(timeoutId)
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }
      return response.json()
    })
    .then((data) => {
      console.log("✅ Formulário enviado com sucesso")
      showFormMessage("Seus dados foram enviados com sucesso! Em breve entraremos em contato.", "success")
      resetForm()
    })
    .catch((error) => {
      clearTimeout(timeoutId)
      console.error("❌ Erro ao enviar formulário:", error)

      let errorMessage = "Ocorreu um erro ao enviar seus dados. "
      if (error.name === "AbortError") {
        errorMessage += "A requisição demorou muito para responder. "
      }
      errorMessage += "Tente novamente."

      showFormMessage(errorMessage, "error")
    })
    .finally(() => {
      isSubmitting = false
    })
}

function showFormMessage(message, type) {
  // Remover mensagem existente
  const existingMessage = document.querySelector(".form-message")
  if (existingMessage) {
    existingMessage.remove()
  }

  const messageElement = document.createElement("div")
  messageElement.className = "form-message"
  messageElement.textContent = message

  // Estilos base
  Object.assign(messageElement.style, {
    padding: "1rem",
    marginTop: "1rem",
    borderRadius: "0.5rem",
    textAlign: "center",
    fontWeight: "500",
    transition: "all 0.3s ease",
  })

  // Estilos por tipo
  const styles = {
    success: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    error: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    },
    loading: {
      backgroundColor: "#e2e3e5",
      color: "#383d41",
      border: "1px solid #d6d8db",
    },
  }

  Object.assign(messageElement.style, styles[type] || styles.loading)

  const form = document.querySelector(".contact-form")
  if (form) {
    form.appendChild(messageElement)

    // Auto-remover mensagens de sucesso/erro
    if (type !== "loading") {
      setTimeout(
        () => {
          if (messageElement.parentNode) {
            messageElement.style.opacity = "0"
            setTimeout(() => messageElement.remove(), 300)
          }
        },
        type === "error" ? 8000 : 5000,
      )
    }
  }
}

function resetForm() {
  const form = document.querySelector(".contact-form")
  if (form) {
    form.reset()
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", initFormIntegration)

console.log("📋 form_n8n_integration.js OTIMIZADO carregado")
