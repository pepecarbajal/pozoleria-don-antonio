import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function Register({ onSwitchToLogin }) {
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    try {
      const response = await fetch('https://serverreservaciones.onrender.com/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreCompleto,
          correo: email,
          contrasena: password,
          telefono,
        }),
      })
      if (response.ok) {
        toast.success('Registro exitoso')
        onSwitchToLogin()
      } else {
        const errorData = await response.json()
        toast.error(`Error en el registro: ${errorData.message || 'Ocurrió un error desconocido'}`)
      }
    } catch (error) {
      console.error('Error al registrar:', error)
      toast.error('Ocurrió un error al intentar registrarse')
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black">
      {/* Image section */}
      <div className="lg:w-2/3 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <img
          src="https://scontent.fcvj2-1.fna.fbcdn.net/v/t39.30808-6/331789825_1372905220222961_3007778894459459259_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGA2BddaNUvCmDdES9Qje-mPGITOhHtWNc8YhM6Ee1Y16Z7VO_uNh7nmKxUeykTGIgh5qcB8ZJYveON8UtQ4k4X&_nc_ohc=QVbMJWAHoWsQ7kNvgFNYoUz&_nc_zt=23&_nc_ht=scontent.fcvj2-1.fna&_nc_gid=A6FzOG6-H-mZRQu9OvoMELE&oh=00_AYCGMRoMFIIT94Q5qdtxpqQY2dFgiEqdigZ28DW54Udq3A&oe=675979CC"
          alt="Restaurant Food"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Register Form */}
      <div className="lg:w-1/3 flex items-center justify-center p-8 bg-black">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Crear Cuenta</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="nombreCompleto" className="block text-gray-200 text-lg">Nombre Completo</label>
              <input
                id="nombreCompleto"
                type="text"
                placeholder="Juan Pérez"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-200 text-lg">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="telefono" className="block text-gray-200 text-lg">Teléfono</label>
              <input
                id="telefono"
                type="tel"
                placeholder="123-456-7890"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-200 text-lg">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-gray-200 text-lg">Confirmar Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
              Registrarse
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">o continuar con</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button type="button" className="flex justify-center items-center bg-gray-800 hover:bg-gray-700 text-white rounded-md py-2 px-4 transition duration-300 ease-in-out">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
              <button type="button" className="flex justify-center items-center bg-gray-800 hover:bg-gray-700 text-white rounded-md py-2 px-4 transition duration-300 ease-in-out">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </button>
              <button type="button" className="flex justify-center items-center bg-gray-800 hover:bg-gray-700 text-white rounded-md py-2 px-4 transition duration-300 ease-in-out">
                <svg className="w-6 h-6" fill="#1877f2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>

            <div className="text-center text-lg">
              <span className="text-gray-400">¿Ya tienes cuenta?</span>{' '}
              <button 
                type="button"
                onClick={onSwitchToLogin} 
                className="text-red-400 hover:text-red-300 font-medium focus:outline-none"
              >
                Inicia sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

