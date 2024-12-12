'use client'

import { useState, useEffect } from 'react'

export default function HeroCarousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(timer)
  }, [items.length])

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{item.name}</h2>
            <p className="text-white text-sm sm:text-base md:text-lg">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

