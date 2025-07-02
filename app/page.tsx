"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FuturisticMeOuveAI() {
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
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/20 border-b border-cyan-500/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center animate-pulse">
                <span className="text-xl font-bold">AI</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-montserrat">
                me ouve AI
              </span>
            </div>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
              Agendar demonstração
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section com Cérebro CSS */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-32 fade-in-section"
      >
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
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-6">
          <Card className="backdrop-blur-sm bg-black/20 border-cyan-500/20 rounded-3xl">
            <CardContent className="p-8">
              <p className="text-xl md:text-2xl mb-8 text-cyan-100 leading-relaxed font-medium">
                Empresas que escutam crescem. Mas as que escutam com inteligência emocional e dados estratégicos criam
                culturas imbatíveis, decisões cirúrgicas e marcas inesquecíveis.
              </p>
              <h1
                className={`text-2xl md:text-4xl lg:text-5xl font-bold mb-10 font-montserrat leading-tight transition-all duration-1000 ${isLoaded ? "animate-glow" : ""}`}
              >
                Você vai seguir o convencional
                <br />
                ou se tornar <span className="text-orange-500">inesquecível</span>?
              </h1>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
                  onClick={() => (window.location.href = "/chat")}
                >
                  Área Exclusiva
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-4 border-2 border-orange-500 text-orange-300 hover:bg-orange-500/20 rounded-full text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  Área Restrita
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wave Shape */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="rgba(15, 23, 42, 0.8)"
            ></path>
          </svg>
        </div>
      </section>

      {/* Team Image Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900/50 to-purple-900/50 backdrop-blur-sm fade-in-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <Card className="backdrop-blur-md bg-white/5 border-cyan-500/20 rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Equipe de colaboradores trabalhando felizes e engajados"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </Card>
            <div className="text-center mt-8">
              <h3 className="text-2xl font-semibold mb-3 font-montserrat bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Colaboradores Engajados e Felizes
              </h3>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Nossa plataforma promove um ambiente de trabalho onde todos se sentem valorizados, apoiados e motivados
                a dar o seu melhor, resultando em maior produtividade e satisfação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-r from-slate-900/30 to-purple-900/30 backdrop-blur-sm fade-in-section"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Recursos Poderosos
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Transforme a saúde emocional da sua equipe com nossas ferramentas avançadas de inteligência emocional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 - Conformidade com NR-1 */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3 font-montserrat">Conformidade com NR-1</h3>
                <p className="text-gray-300">
                  Garantia de que sua empresa esteja em total conformidade com as novas exigências da NR-1.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 - Análise de Sentimentos */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3 font-montserrat">Análise de Sentimentos</h3>
                <p className="text-gray-300">
                  Ferramentas de diagnóstico avançadas para identificar padrões emocionais e áreas que precisam de
                  atenção.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 - Análise de Dados */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3 font-montserrat">Análise de Dados</h3>
                <p className="text-gray-300">
                  Relatórios detalhados e insights acionáveis para acompanhar o progresso e identificar tendências.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 - Apoio ao RH */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-teal-500/20 hover:border-teal-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-teal-500/20 to-teal-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-teal-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-teal-400 mb-3 font-montserrat">Apoio ao RH</h3>
                <p className="text-gray-300">
                  Relatórios Anonimizados com insights valiosos sobre o clima organizacional para ações inteligentes e
                  assertivas baseadas em dados.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 - Comunicação Efetiva */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-indigo-400 mb-3 font-montserrat">Comunicação Efetiva</h3>
                <p className="text-gray-300">
                  Ferramentas para melhorar a comunicação e resolver conflitos de forma construtiva.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 - Atenção Personalizada */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-pink-500/20 hover:border-pink-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-pink-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-pink-400 mb-3 font-montserrat">Atenção Personalizada</h3>
                <p className="text-gray-300">
                  Programas de desenvolvimento emocional adaptados às necessidades específicas de cada colaborador.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Solutions Section */}
      <section
        id="leadership"
        className="py-20 bg-gradient-to-r from-purple-900/30 to-slate-900/30 backdrop-blur-sm fade-in-section"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Liderança que cresce com dados, sensibilidade e visão de futuro
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Aliamos inteligência emocional e ferramentas tecnológicas avançadas para apoiar executivos em sua jornada
              de liderança, muitas vezes solitária, mas nunca sem direção.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="backdrop-blur-md bg-white/5 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4 font-montserrat">Apoio à Tomada de Decisão</h3>
                <p className="text-gray-300 mb-6">
                  Nossa plataforma oferece ferramentas de análise e inteligência artificial para auxiliar executivos na
                  tomada de decisões estratégicas, reduzindo incertezas e maximizando resultados.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-cyan-400 mt-0.5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Avaliação de cenários de negócios</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-cyan-400 mt-0.5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Identificação de oportunidades e riscos</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-cyan-400 mt-0.5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Otimização de processos e recursos</span>
                  </li>
                </ul>
                <a
                  href="#"
                  className="text-cyan-400 font-semibold flex items-center group hover:text-cyan-300 transition-colors"
                >
                  Saiba mais
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/5 border-purple-500/20 hover:border-purple-500/50 transition-all duration-500">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-purple-400 mb-4 font-montserrat">
                  Desenvolvimento de Líderes
                </h3>
                <p className="text-gray-300 mb-6">
                  Programas de coaching e mentoria baseados em IA para aprimorar as habilidades de liderança, promover a
                  inteligência emocional e capacitar líderes para os desafios do futuro.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-400 mt-0.5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Feedback 360° com IA</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-400 mt-0.5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Planos de desenvolvimento personalizados</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-400 mt-0.5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">Simulações de cenários de liderança</span>
                  </li>
                </ul>
                <a
                  href="#"
                  className="text-purple-400 font-semibold flex items-center group hover:text-purple-300 transition-colors"
                >
                  Saiba mais
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-20 bg-gradient-to-r from-slate-900/50 to-purple-900/50 backdrop-blur-sm fade-in-section"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Benefícios para sua Empresa
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Invista no bem-estar e no potencial de seus colaboradores e colha resultados extraordinários.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 - Aumento da Produtividade */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-green-500/20 hover:border-green-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7h8m0 0v8m0-8L11 3m-4 0H3v18h18V11m-6 0a5 5 0 11-10 0 5 5 0 0110 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-3 font-montserrat">Aumento da Produtividade</h3>
                <p className="text-gray-300">
                  Colaboradores mais felizes e engajados são naturalmente mais produtivos e inovadores.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 2 - Redução do Turnover */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c1.657 0 3 1.343 3 3v2a3 3 0 01-3 3m0 0V5c0-1.657-1.343-3-3-3S6 3.343 6 5v5m-3 0h12a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3 font-montserrat">Redução do Turnover</h3>
                <p className="text-gray-300">
                  Ambientes de trabalho saudáveis retêm talentos e diminuem os custos com rotatividade.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 3 - Melhora do Clima Organizacional */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3 font-montserrat">
                  Melhora do Clima Organizacional
                </h3>
                <p className="text-gray-300">Um ambiente positivo e de apoio fomenta a colaboração e a inovação.</p>
              </CardContent>
            </Card>

            {/* Benefit 4 - Fortalecimento da Marca Empregadora */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3 font-montserrat">
                  Fortalecimento da Marca Empregadora
                </h3>
                <p className="text-gray-300">
                  Empresas que cuidam de seus colaboradores atraem e retêm os melhores talentos.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 5 - Tomada de Decisão Baseada em Dados */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-indigo-400 mb-3 font-montserrat">
                  Tomada de Decisão Baseada em Dados
                </h3>
                <p className="text-gray-300">
                  Insights precisos sobre o bem-estar da equipe para decisões estratégicas e eficazes.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 6 - Inovação e Criatividade */}
            <Card className="group relative backdrop-blur-md bg-white/5 border-pink-500/20 hover:border-pink-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-pink-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-pink-400 mb-3 font-montserrat">Inovação e Criatividade</h3>
                <p className="text-gray-300">
                  Colaboradores com bem-estar emocional elevado são mais propensos a inovar e contribuir com novas
                  ideias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-900/50 to-purple-900/50 backdrop-blur-sm text-center fade-in-section">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="backdrop-blur-md bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20 rounded-3xl max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Pronto para transformar sua empresa?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
                Agende uma demonstração gratuita e descubra como a Me Ouve AI pode impulsionar o bem-estar e a
                produtividade da sua equipe.
              </p>
              <Button className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
                Agendar Demonstração
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chat Integration */}
      <div id="chat-container" className="fixed bottom-4 right-4 z-50">
        <div className="simple-chat-container backdrop-blur-md bg-black/20 border border-cyan-500/20 rounded-2xl shadow-2xl max-w-sm w-80 hidden">
          <div className="chat-header bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-4 rounded-t-2xl">
            <h3 className="font-semibold">Assistente Virtual</h3>
            <div className="connection-status text-xs opacity-90 mt-1">Conectando...</div>
          </div>

          <div className="messages-container h-64 overflow-y-auto p-4 bg-black/10">
            {/* Mensagens aparecerão aqui */}
          </div>

          <div className="typing-indicator p-2 text-xs text-gray-400 italic hidden">Assistente está digitando...</div>

          <form className="chat-form p-4 border-t border-cyan-500/20 flex gap-2">
            <input
              type="text"
              className="message-input flex-1 px-3 py-2 bg-black/20 border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              placeholder="Digite sua mensagem..."
            />
            <button
              type="submit"
              className="send-button px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>

        <button
          id="chat-toggle"
          className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>

      {/* Footer Futurístico */}
      <footer className="py-12 border-t border-cyan-500/20 backdrop-blur-md bg-black/20 fade-in-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse"></div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-montserrat">
                  Me Ouve AI
                </span>
              </div>
              <p className="text-gray-400">Soluções inovadoras para o bem-estar e produtividade da sua equipe.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#leadership" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Liderança
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Benefícios
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-400">Contato</h3>
              <p className="text-gray-400">Email: contato@meouveai.com</p>
              <p className="text-gray-400">Telefone: (XX) XXXX-XXXX</p>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8 pt-8 border-t border-gray-700">
            &copy; 2023 Me Ouve AI. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <style jsx>{`
        .font-montserrat { 
          font-family: 'Montserrat', sans-serif; 
        }

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

        /* Efeito de brilho no texto */
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
          50% { text-shadow: 0 0 30px rgba(102, 126, 234, 0.8), 0 0 40px rgba(118, 75, 162, 0.6); }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        /* Chat styles */
        .simple-chat-container.show {
          display: block !important;
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

          #chat-container {
            bottom: 1rem;
            right: 1rem;
          }

          .simple-chat-container {
            width: calc(100vw - 2rem);
            max-width: 320px;
          }
        }
      `}</style>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', () => {
            // Smooth scroll effect for internal links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                  target.scrollIntoView({
                    behavior: 'smooth'
                  });
                }
              });
            });

            // Chat toggle functionality
            const chatToggle = document.getElementById('chat-toggle');
            const chatContainer = document.querySelector('.simple-chat-container');
            
            if (chatToggle && chatContainer) {
              chatToggle.addEventListener('click', () => {
                chatContainer.classList.toggle('hidden');
                chatContainer.classList.toggle('show');
              });
            }

            // Load chat scripts
            const loadChatScripts = () => {
              const scripts = [
                '/lib/chat-ui.js',
                '/lib/chat-client.js', 
                '/lib/chat-integration.js'
              ];
              
              scripts.forEach(src => {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                document.head.appendChild(script);
              });
            };

            // Load chat scripts after a delay
            setTimeout(loadChatScripts, 1000);
          });
        `,
        }}
      />
    </div>
  )
}
