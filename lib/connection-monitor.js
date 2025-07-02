/**
 * Monitor de Conexão Seguro
 * Verifica conectividade sem vazar dados
 */

class SecureConnectionMonitor {
  constructor() {
    this.isMonitoring = false
    this.connectionStatus = "unknown"
    this.lastCheck = null
    this.checkInterval = null

    this.startMonitoring()
  }

  startMonitoring() {
    if (this.isMonitoring) return

    this.isMonitoring = true
    this.performCheck()

    // Verificar a cada 30 segundos
    this.checkInterval = setInterval(() => {
      this.performCheck()
    }, 30000)
  }

  async performCheck() {
    try {
      const response = await fetch("/api/chat", {
        method: "GET",
        cache: "no-cache",
      })

      const data = await response.json()
      const newStatus = data.status === "healthy" && data.n8n_connection ? "connected" : "degraded"

      if (newStatus !== this.connectionStatus) {
        this.connectionStatus = newStatus
        this.notifyStatusChange(newStatus)
      }

      this.lastCheck = new Date().toISOString()
    } catch (error) {
      if (this.connectionStatus !== "disconnected") {
        this.connectionStatus = "disconnected"
        this.notifyStatusChange("disconnected")
      }
    }
  }

  notifyStatusChange(status) {
    // Emitir evento personalizado para a UI
    const event = new CustomEvent("connectionStatusChanged", {
      detail: { status, timestamp: new Date().toISOString() },
    })
    document.dispatchEvent(event)

    // Log apenas em desenvolvimento
    if (window.location.hostname === "localhost") {
      console.log(`[ConnectionMonitor] Status: ${status}`)
    }
  }

  getStatus() {
    return {
      status: this.connectionStatus,
      lastCheck: this.lastCheck,
      isMonitoring: this.isMonitoring,
    }
  }

  stopMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
      this.checkInterval = null
    }
    this.isMonitoring = false
  }
}

// Instância global
window.connectionMonitor = new SecureConnectionMonitor()

// Listener para mudanças de status
document.addEventListener("connectionStatusChanged", (event) => {
  const { status } = event.detail

  // Atualizar indicador visual se existir
  const statusIndicator = document.querySelector(".connection-status")
  if (statusIndicator) {
    statusIndicator.className = `connection-status status-${status}`
    statusIndicator.title = `Conexão: ${status}`
  }
})
