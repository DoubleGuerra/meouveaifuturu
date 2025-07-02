"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FuturisticHomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Mouse tracking para efeitos parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Intersection Observer para animações
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".fade-in-section").forEach((el) => {
      observer.observe(el)
    })

    // Animação de partículas CSS
    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDuration = Math.random() * 3 + 2 + "s"
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString()
      document.querySelector(".particles-container")?.appendChild(particle)

      setTimeout(() => {
        particle.remove()
      }, 5000)
    }

    const particleInterval = setInterval(createParticle, 300)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
      clearInterval(particleInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Partículas de fundo */}
      <div className="particles-container fixed inset-0 pointer-events-none z-0"></div>

      {/* Grid de fundo animado */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="grid-background"></div>
      </div>

      {/* Header Futurístico */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-black/20 border-b border-cyan-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center animate-pulse">
                <span className="text-xl font-bold">AI</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                me ouve AI
              </span>
            </div>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
              Área Exclusiva
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section com Cérebro CSS */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cérebro CSS animado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="brain-container"
            style={{
              transform: `rotateY(${mousePosition.x * 10}deg) rotateX(${mousePosition.y * 10}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div className="brain-sphere"></div>
            <div className="brain-waves">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="wave" style={{ animationDelay: `${i * 0.5}s` }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <Card className="backdrop-blur-sm bg-black/20 border-cyan-500/20 rounded-3xl">
            <CardContent className="p-8">
              <h1
                className={`text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-1000 ${isLoaded ? "animate-glow" : ""}`}
              >
                ESCUTA
                <br />
                <span className="text-4xl md:text-6xl">INTELIGENTE</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-cyan-100 leading-relaxed">
                Empresas que escutam com <span className="text-cyan-400 font-semibold">inteligência emocional</span> e
                <span className="text-purple-400 font-semibold"> dados estratégicos</span> criam culturas imbatíveis
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25">
                  Explorar IA
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-4 border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 rounded-full text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  Demonstração
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section com Glassmorphism */}
      <section className="py-20 relative fade-in-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Recursos Neurais
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transforme a saúde emocional da sua equipe com nossa IA avançada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Análise Neural",
                description: "IA que compreende padrões emocionais complexos",
                icon: "🧠",
                color: "from-cyan-500 to-blue-600",
              },
              {
                title: "Escuta Empática",
                description: "Processamento de linguagem natural avançado",
                icon: "👂",
                color: "from-purple-500 to-pink-600",
              },
              {
                title: "Insights Preditivos",
                description: "Antecipe necessidades emocionais da equipe",
                icon: "🔮",
                color: "from-green-500 to-teal-600",
              },
              {
                title: "Conformidade NR-1",
                description: "Total adequação às normas regulamentares",
                icon: "🛡️",
                color: "from-orange-500 to-red-600",
              },
              {
                title: "Dashboard Holográfico",
                description: "Visualização de dados em tempo real",
                icon: "📊",
                color: "from-indigo-500 to-purple-600",
              },
              {
                title: "Suporte Quântico",
                description: "Atendimento 24/7 com IA superinteligente",
                icon: "⚡",
                color: "from-yellow-500 to-orange-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group relative backdrop-blur-md bg-white/5 border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <CardContent className="p-6">
                  <div className="relative z-10">
                    <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                      {feature.icon}
                    </div>
                    <h3
                      className={`text-xl font-bold mb-3 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Efeito de brilho */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section com Animações */}
      <section className="py-20 relative fade-in-section">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "99.9%", label: "Precisão da IA", color: "text-cyan-400" },
              { number: "24/7", label: "Monitoramento", color: "text-purple-400" },
              { number: "500+", label: "Empresas Atendidas", color: "text-green-400" },
              { number: "∞", label: "Possibilidades", color: "text-pink-400" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`text-5xl md:text-6xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300 animate-counter`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative fade-in-section">
        <div className="container mx-auto px-6 text-center">
          <Card className="backdrop-blur-md bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20 rounded-3xl">
            <CardContent className="p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Pronto para o Futuro?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Transforme sua empresa com inteligência artificial emocional de última geração
              </p>
              <Button className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
                Iniciar Jornada Neural
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Futurístico */}
      <footer className="py-12 border-t border-cyan-500/20 backdrop-blur-md bg-black/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse"></div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  me ouve AI
                </span>
              </div>
              <p className="text-gray-400">O futuro da inteligência emocional empresarial</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">Tecnologias</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Inteligência Artificial</li>
                <li>• Machine Learning</li>
                <li>• Processamento Neural</li>
                <li>• Análise Preditiva</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Contato</h3>
              <p className="text-gray-400">contato@meouveai.com</p>
              <p className="text-gray-400">+55 (11) 9999-9999</p>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8 pt-8 border-t border-gray-700">
            © 2024 Me Ouve AI. Powered by Neural Networks.
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Partículas animadas */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #00ffff, #ff00ff);
          border-radius: 50%;
          animation: float-up linear infinite;
          pointer-events: none;
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }

        /* Grid de fundo */
        .grid-background {
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          width: 100%;
          height: 100%;
          animation: grid-move 20s linear infinite;
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        /* Cérebro CSS */
        .brain-container {
          position: relative;
          width: 300px;
          height: 300px;
          perspective: 1000px;
        }

        .brain-sphere {
          width: 200px;
          height: 200px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: brain-pulse 3s ease-in-out infinite;
          box-shadow: 
            0 0 50px rgba(102, 126, 234, 0.5),
            inset 0 0 50px rgba(118, 75, 162, 0.3);
        }

        .brain-sphere::before {
          content: '';
          position: absolute;
          top: 20%;
          left: 20%;
          right: 20%;
          bottom: 20%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2));
          border-radius: 50%;
          animation: brain-shimmer 2s ease-in-out infinite alternate;
        }

        @keyframes brain-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes brain-shimmer {
          0% { opacity: 0.3; }
          100% { opacity: 0.8; }
        }

        /* Ondas sonoras */
        .brain-waves {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .wave {
          position: absolute;
          border: 2px solid rgba(0, 255, 255, 0.3);
          border-radius: 50%;
          animation: wave-expand 3s ease-out infinite;
        }

        .wave:nth-child(1) { width: 250px; height: 250px; margin: -125px 0 0 -125px; }
        .wave:nth-child(2) { width: 300px; height: 300px; margin: -150px 0 0 -150px; }
        .wave:nth-child(3) { width: 350px; height: 350px; margin: -175px 0 0 -175px; }
        .wave:nth-child(4) { width: 400px; height: 400px; margin: -200px 0 0 -200px; }
        .wave:nth-child(5) { width: 450px; height: 450px; margin: -225px 0 0 -225px; }

        @keyframes wave-expand {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        /* Animações de entrada */
        .fade-in-section {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        /* Animação de flutuação */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Efeito de brilho no texto */
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
          50% { text-shadow: 0 0 30px rgba(102, 126, 234, 0.8), 0 0 40px rgba(118, 75, 162, 0.6); }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Contador animado */
        @keyframes counter {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-counter {
          animation: counter 1s ease-out;
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .brain-container {
            width: 200px;
            height: 200px;
          }
          
          .brain-sphere {
            width: 150px;
            height: 150px;
          }
          
          .wave:nth-child(1) { width: 180px; height: 180px; margin: -90px 0 0 -90px; }
          .wave:nth-child(2) { width: 210px; height: 210px; margin: -105px 0 0 -105px; }
          .wave:nth-child(3) { width: 240px; height: 240px; margin: -120px 0 0 -120px; }
          .wave:nth-child(4) { width: 270px; height: 270px; margin: -135px 0 0 -135px; }
          .wave:nth-child(5) { width: 300px; height: 300px; margin: -150px 0 0 -150px; }
        }
      `}</style>
    </div>
  )
}
