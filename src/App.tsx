import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Brain, Heart, Zap, ArrowRight } from 'lucide-react'
import './App.css'

interface Particle {
  id: number
  x: number
  delay: number
  size: number
  color: string
  duration: number
}

interface ARExperience {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
}

// Cinematic Floating Orbs
const CinematicOrbs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Primary Amethyst Orb */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: `radial-gradient(circle, hsla(264, 45%, 58%, 0.15) 0%, hsla(264, 45%, 58%, 0.05) 40%, transparent 70%)`,
          filter: 'blur(40px)',
          top: '10%',
          left: '5%'
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary Blue Orb */}
      <motion.div 
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: `radial-gradient(circle, hsla(213, 94%, 68%, 0.2) 0%, hsla(213, 94%, 68%, 0.08) 40%, transparent 70%)`,
          filter: 'blur(35px)',
          top: '20%',
          right: '10%'
        }}
        animate={{
          x: [0, -40, 25, 0],
          y: [0, 20, -30, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
      
      {/* Accent Cerise Orb */}
      <motion.div 
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: `radial-gradient(circle, hsla(329, 69%, 58%, 0.18) 0%, hsla(329, 69%, 58%, 0.06) 40%, transparent 70%)`,
          filter: 'blur(30px)',
          bottom: '25%',
          left: '15%'
        }}
        animate={{
          x: [0, 35, -15, 0],
          y: [0, -35, 20, 0],
          scale: [1, 1.3, 0.7, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6
        }}
      />
    </div>
  )
}

// Particle System
const ParticleSystem = () => {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = [
      'hsla(264, 45%, 58%, 0.6)', // Amethyst
      'hsla(213, 94%, 68%, 0.7)', // Blue
      'hsla(329, 69%, 58%, 0.5)', // Cerise
      'hsla(340, 82%, 52%, 0.4)', // Pink
    ]

    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 25,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 10 + 15
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            filter: 'blur(1px)'
          }}
          animate={{
            y: [window.innerHeight + 50, -100],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// AR Experience Cards
const ARExperienceCard = ({ title, description, icon: Icon, gradient, delay }: ARExperience & { delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="relative group cursor-pointer"
    >
      <div 
        className="p-8 rounded-3xl backdrop-blur-xl border border-white/10 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${gradient})`
        }}
      >
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${gradient.replace(/0\.1/g, '0.2')})`
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Icon className="w-8 h-8 text-white" />
            <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-2 font-display">
            {title}
          </h3>
          
          <p className="text-white/80 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const experiences: (ARExperience & { delay?: number })[] = [
    {
      title: "AR Meditation Realms",
      description: "Immerse yourself in breathtaking virtual environments designed to enhance your meditation practice.",
      icon: Brain,
      gradient: "hsla(264, 45%, 58%, 0.1) 0%, hsla(264, 45%, 58%, 0.05) 100%"
    },
    {
      title: "Biometric Wellness",
      description: "Real-time health monitoring with AI-powered insights and personalized recommendations.",
      icon: Heart,
      gradient: "hsla(213, 94%, 68%, 0.1) 0%, hsla(213, 94%, 68%, 0.05) 100%"
    },
    {
      title: "Voice-Guided Journeys",
      description: "AI wellness companion that adapts to your emotional state and guides you through personalized experiences.",
      icon: Zap,
      gradient: "hsla(329, 69%, 58%, 0.1) 0%, hsla(329, 69%, 58%, 0.05) 100%"
    }
  ]

  return (
    <div className="min-h-screen text-white overflow-hidden relative" style={{ background: '#0A0A0F' }}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Central ambient glow */}
        <div 
          className="absolute top-1/2 left-1/2 w-[1400px] h-[900px]"
          style={{
            background: `radial-gradient(ellipse at center, 
              hsla(264, 45%, 58%, 0.08) 0%, 
              hsla(213, 94%, 68%, 0.06) 30%, 
              hsla(329, 69%, 58%, 0.04) 60%, 
              transparent 100%
            )`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(100px)',
          }}
        />
      </div>
      
      <CinematicOrbs />
      <ParticleSystem />
      
      {/* Main Content */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 min-h-screen"
          >
            {/* Hero Section */}
            <div className="container mx-auto px-6 pt-20 pb-32">
              <div className="text-center max-w-6xl mx-auto">
                
                {/* Brand Name */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="mb-8"
                >
                  <h1 
                    className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none font-display"
                    style={{
                      background: `linear-gradient(135deg, 
                        hsl(264, 45%, 58%) 0%,
                        hsl(213, 94%, 68%) 25%,
                        hsl(329, 69%, 58%) 50%,
                        hsl(340, 82%, 52%) 75%,
                        hsl(264, 45%, 58%) 100%
                      )`,
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 0 40px hsla(264, 45%, 58%, 0.3)',
                      filter: 'drop-shadow(0 8px 32px hsla(264, 45%, 58%, 0.2))',
                      animation: 'gradient-shift 8s ease-in-out infinite'
                    }}
                  >
                    Kaydio
                  </h1>
                </motion.div>

                {/* Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mb-16"
                >
                  <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-wide text-white/90 mb-8">
                    A new realm of wellness
                  </p>
                  
                  {/* Decorative Line */}
                  <div className="flex justify-center">
                    <motion.div 
                      className="w-32 h-0.5"
                      style={{
                        background: `linear-gradient(90deg, 
                          transparent 0%, 
                          hsla(264, 45%, 58%, 0.8) 25%, 
                          hsla(213, 94%, 68%, 0.8) 50%, 
                          hsla(329, 69%, 58%, 0.8) 75%, 
                          transparent 100%
                        )`
                      }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scaleX: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>

                {/* Enter the Realm Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="flex justify-center mb-24"
                >
                  <motion.button
                    className="group relative px-12 py-6 text-xl font-medium text-white transition-all duration-700 font-display"
                    style={{
                      borderRadius: '20px',
                      background: `linear-gradient(135deg, 
                        hsla(264, 45%, 58%, 0.1) 0%, 
                        hsla(213, 94%, 68%, 0.08) 50%, 
                        hsla(329, 69%, 58%, 0.1) 100%
                      )`,
                      border: '1px solid hsla(264, 45%, 58%, 0.3)',
                      backdropFilter: 'blur(30px)',
                      boxShadow: `
                        0 8px 32px hsla(264, 45%, 58%, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                      `,
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `
                        0 12px 48px hsla(264, 45%, 58%, 0.3),
                        0 0 60px hsla(213, 94%, 68%, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2)
                      `
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Play className="w-5 h-5" />
                      Enter the Realm
                    </span>
                    
                    {/* Button Inner Glow */}
                    <motion.div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: `radial-gradient(circle at center, 
                          hsla(264, 45%, 58%, 0.1) 0%, 
                          transparent 70%
                        )`,
                        filter: 'blur(4px)'
                      }}
                    />
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* AR Experiences Section */}
            <div className="container mx-auto px-6 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
                  Immersive Wellness Experiences
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  Step into the future of wellness with cutting-edge AR technology and AI-powered personalization
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {experiences.map((experience, index) => (
                  <ARExperienceCard
                    key={experience.title}
                    {...experience}
                    delay={1.5 + index * 0.2}
                  />
                ))}
              </div>
            </div>

            {/* Wellness Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.1 }}
              className="flex justify-center space-x-16 pb-20"
            >
              {[
                { label: 'Breathe', color: 'hsla(264, 45%, 58%, 0.8)' },
                { label: 'Focus', color: 'hsla(213, 94%, 68%, 0.8)' },
                { label: 'Flow', color: 'hsla(329, 69%, 58%, 0.8)' }
              ].map((indicator, index) => (
                <motion.div
                  key={indicator.label}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-4 h-4 rounded-full mx-auto mb-4"
                    style={{ 
                      background: indicator.color,
                      boxShadow: `0 0 20px ${indicator.color}`
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.7,
                      ease: "easeInOut"
                    }}
                  />
                  <p className="text-sm font-light tracking-widest uppercase text-white/80 group-hover:text-white transition-colors duration-300">
                    {indicator.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(10, 10, 15, 0.4) 100%)`,
          zIndex: 5
        }}
      />
    </div>
  )
}

export default App