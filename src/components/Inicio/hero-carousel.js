// src/components/Inicio/hero-carousel.js

import { useState, useEffect } from 'react'

export default function HeroCarousel({ items, buttons }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setNextIndex((prevIndex) => (prevIndex + 1) % items.length)
      
      setTimeout(() => {
        setCurrentIndex(nextIndex)
      }, 1000) // Espera 1 segundo antes de cambiar el índice actual
    }, 5000) // Cambiar slide cada 5 segundos

    return () => clearInterval(timer)
  }, [items.length, nextIndex])

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="md:w-1/2 p-6 bg-transparent flex flex-col justify-between min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
        <div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-red-600 font-serif tracking-wide text-shadow-lg transition-opacity duration-1000 ease-in-out">
            {items[currentIndex].name}
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 text-white font-sans leading-relaxed transition-opacity duration-1000 ease-in-out">
            {items[currentIndex].description}
          </p>
        </div>
        <div className="mt-6 flex space-x-4">
          {buttons}
        </div>
      </div>
      <div className="relative md:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-2xl">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-2000 ease-in-out ${
              index === currentIndex 
                ? 'opacity-100 scale-100' 
                : index === nextIndex
                ? 'opacity-0 scale-105'
                : 'opacity-0 scale-110'
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-white/10 to-red-900/30"></div>
          </div>
        ))}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600/50 via-white/50 to-red-600/50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-600/50 via-white/50 to-red-600/50"></div>
      </div>
    </div>
  )
}

