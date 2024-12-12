import React, { useState } from 'react'

export default function MenuTabs({ setActiveTab }) {
  const [activeTabState, setActiveTabState] = useState('todos')

  const tabs = [
    { id: 'todos', label: 'Todos' },
    { id: 'pozoles', label: 'Pozoles' },
    { id: 'antojitos', label: 'Antojitos' },
    { id: 'bebidas', label: 'Bebidas' },
    { id: 'complementos', label: 'Complementos' },
  ]

  const handleTabClick = (tabId) => {
    setActiveTabState(tabId)
    setActiveTab(tabId)
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 overflow-x-auto pb-2 mb-6 sm:mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors hover:bg-red-500/20 ${
            activeTabState === tab.id
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

