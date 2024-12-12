import React from 'react'

export default function UserAccount({ user, onClose, onLogout }) {
  return (
    <div className="w-full max-w-md mx-auto bg-black text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Cuenta de Usuario</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-400">Nombre Completo</label>
          <input
            id="nombreCompleto"
            type="text"
            value={user.nombreCompleto}
            disabled
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="correo" className="block text-sm font-medium text-gray-400">Correo Electrónico</label>
          <input
            id="correo"
            type="email"
            value={user.correo}
            disabled
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-400">Teléfono</label>
          <input
            id="telefono"
            type="tel"
            value={user.telefono}
            disabled
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="flex justify-between pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Cerrar
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}

