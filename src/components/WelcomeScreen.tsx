import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

// Artistic Particle Background Component
const ArtisticParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, delay: number}>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 15
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="art-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="art-particle"
          style={{
            left: `${particle.x}%`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
}

interface WelcomeScreenProps {
  onEnter: () => void
}

const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <ArtisticParticles />
      
      {/* Oil painting texture overlay */}
      <div className="absolute inset-0 oil-texture opacity-40" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-16"
        >
          {/* Tagline */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-white leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, delay: 0.3 }}
          >
            A new realm of wellness
          </motion.h1>

          {/* Enter Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0 }}
          >
            <Button 
              size="lg" 
              onClick={onEnter}
              className="bg-gradient-to-r from-oil-mediterranean-blue via-oil-sage-green to-oil-golden-amber hover:from-oil-deep-ocean hover:via-oil-forest-emerald hover:to-oil-warm-terracotta text-white px-16 py-8 text-2xl font-medium rounded-full oil-painting-glow transition-all duration-700 hover:scale-105 floating-gentle shadow-2xl"
            >
              Enter the Realm
            </Button>
          </motion.div>
        </motion.div>

        {/* Subtle decorative elements inspired by oil paintings */}
        <motion.div
          className="absolute top-1/3 left-1/5 w-40 h-40 rounded-full bg-gradient-to-br from-oil-mediterranean-blue/15 to-transparent blur-2xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-32 h-32 rounded-full bg-gradient-to-br from-oil-sage-green/15 to-transparent blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        <motion.div
          className="absolute top-1/2 right-1/3 w-28 h-28 rounded-full bg-gradient-to-br from-oil-golden-amber/15 to-transparent blur-2xl"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        />
      </div>
    </div>
  )
}

export default WelcomeScreen