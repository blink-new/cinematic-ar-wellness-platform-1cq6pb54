import React, { useEffect, useRef } from 'react'
import './App.css'

// Gentle floating elements inspired by the serene lake scene
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Soft floating orbs - like gentle ripples on water */}
      <div 
        className="absolute w-32 h-32 rounded-full gentle-float"
        style={{
          background: 'radial-gradient(circle, rgba(255, 182, 193, 0.15) 0%, transparent 70%)',
          top: '15%',
          left: '10%',
          filter: 'blur(20px)',
          animationDelay: '0s'
        }}
      />
      
      <div 
        className="absolute w-24 h-24 rounded-full gentle-float"
        style={{
          background: 'radial-gradient(circle, rgba(186, 164, 255, 0.12) 0%, transparent 70%)',
          top: '60%',
          right: '20%',
          filter: 'blur(15px)',
          animationDelay: '2s'
        }}
      />
      
      <div 
        className="absolute w-40 h-40 rounded-full gentle-float"
        style={{
          background: 'radial-gradient(circle, rgba(135, 206, 235, 0.1) 0%, transparent 70%)',
          top: '40%',
          left: '70%',
          filter: 'blur(25px)',
          animationDelay: '4s'
        }}
      />

      <div 
        className="absolute w-20 h-20 rounded-full gentle-float"
        style={{
          background: 'radial-gradient(circle, rgba(255, 160, 122, 0.18) 0%, transparent 70%)',
          top: '25%',
          right: '15%',
          filter: 'blur(12px)',
          animationDelay: '6s'
        }}
      />
    </div>
  )
}

// Aurora-like background effect inspired by the sky colors
const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div 
        className="absolute top-1/2 left-1/2 w-[800px] h-[400px] aurora-effect"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(255, 182, 193, 0.08) 0%, 
              rgba(186, 164, 255, 0.06) 25%, 
              rgba(135, 206, 235, 0.04) 50%, 
              rgba(255, 160, 122, 0.06) 75%, 
              transparent 100%
            )
          `,
          filter: 'blur(60px)',
          borderRadius: '50%'
        }}
      />
    </div>
  )
}

// Subtle ripple effects like gentle water movements
const WaterRipples = () => {
  const ripplesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createRipple = () => {
      if (!ripplesRef.current) return

      const ripple = document.createElement('div')
      ripple.className = 'absolute rounded-full border border-white/5 ripple-effect'
      ripple.style.width = '20px'
      ripple.style.height = '20px'
      ripple.style.left = Math.random() * 100 + '%'
      ripple.style.top = Math.random() * 100 + '%'
      
      ripplesRef.current.appendChild(ripple)

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple)
        }
      }, 3000)
    }

    const interval = setInterval(createRipple, 4000)
    return () => clearInterval(interval)
  }, [])

  return <div ref={ripplesRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} />
}

function App() {
  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Aurora Background */}
      <AuroraBackground />
      
      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Water Ripples */}
      <WaterRipples />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Hero Section */}
        <div className="text-center max-w-5xl mx-auto">
          {/* Brand Name with sunset gradient */}
          <div className="mb-12">
            <h1 
              className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none"
              style={{
                background: `
                  linear-gradient(135deg, 
                    #FFB6C1 0%, 
                    #BAA4FF 25%, 
                    #87CEEB 50%, 
                    #FFA07A 75%, 
                    #FFB6C1 100%
                  )
                `,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 20px rgba(255, 182, 193, 0.3))',
                fontWeight: '700'
              }}
            >
              Kaydio
            </h1>
          </div>

          {/* Tagline with gentle styling */}
          <div className="mb-16">
            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-wide"
               style={{ 
                 color: 'rgba(255, 255, 255, 0.85)',
                 textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
               }}>
              A new realm of wellness
            </p>
            <div className="mt-4 w-24 h-0.5 mx-auto"
                 style={{
                   background: 'linear-gradient(90deg, transparent 0%, rgba(255, 182, 193, 0.6) 50%, transparent 100%)'
                 }} />
          </div>

          {/* Enter the Realm Button - Inspired by peaceful water surface */}
          <div className="flex justify-center">
            <button
              className="group relative px-10 py-4 text-lg font-medium text-white transition-all duration-700 hover:scale-105"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 182, 193, 0.08) 0%, 
                    rgba(186, 164, 255, 0.06) 50%, 
                    rgba(135, 206, 235, 0.08) 100%
                  )
                `,
                border: '1px solid rgba(255, 182, 193, 0.2)',
                borderRadius: '12px',
                backdropFilter: 'blur(20px)',
                boxShadow: `
                  0 8px 32px rgba(255, 182, 193, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 4px 16px rgba(0, 0, 0, 0.2)
                `
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `
                  linear-gradient(135deg, 
                    rgba(255, 182, 193, 0.15) 0%, 
                    rgba(186, 164, 255, 0.12) 50%, 
                    rgba(135, 206, 235, 0.15) 100%
                  )
                `
                e.currentTarget.style.boxShadow = `
                  0 12px 40px rgba(255, 182, 193, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  0 6px 20px rgba(0, 0, 0, 0.3)
                `
                e.currentTarget.style.borderColor = 'rgba(255, 182, 193, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `
                  linear-gradient(135deg, 
                    rgba(255, 182, 193, 0.08) 0%, 
                    rgba(186, 164, 255, 0.06) 50%, 
                    rgba(135, 206, 235, 0.08) 100%
                  )
                `
                e.currentTarget.style.boxShadow = `
                  0 8px 32px rgba(255, 182, 193, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 4px 16px rgba(0, 0, 0, 0.2)
                `
                e.currentTarget.style.borderColor = 'rgba(255, 182, 193, 0.2)'
              }}
            >
              <span className="relative z-10 tracking-wide font-medium">Enter the Realm</span>
              
              {/* Gentle inner glow */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.03) 0%, rgba(135, 206, 235, 0.03) 100%)',
                  filter: 'blur(2px)'
                }}
              />
            </button>
          </div>

          {/* Subtle wellness indicators */}
          <div className="mt-20 flex justify-center space-x-8 opacity-60">
            <div className="text-center">
              <div className="w-2 h-2 rounded-full mx-auto mb-2"
                   style={{ background: 'rgba(255, 182, 193, 0.6)' }} />
              <p className="text-xs font-light tracking-wider">Breathe</p>
            </div>
            <div className="text-center">
              <div className="w-2 h-2 rounded-full mx-auto mb-2"
                   style={{ background: 'rgba(186, 164, 255, 0.6)' }} />
              <p className="text-xs font-light tracking-wider">Focus</p>
            </div>
            <div className="text-center">
              <div className="w-2 h-2 rounded-full mx-auto mb-2"
                   style={{ background: 'rgba(135, 206, 235, 0.6)' }} />
              <p className="text-xs font-light tracking-wider">Flow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient base glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at center bottom, 
                rgba(255, 182, 193, 0.02) 0%, 
                rgba(186, 164, 255, 0.01) 40%, 
                transparent 70%
              )
            `
          }}
        />
      </div>
    </div>
  )
}

export default App