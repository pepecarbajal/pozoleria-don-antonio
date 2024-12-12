import React, { useState, useEffect } from 'react'
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import { toast } from 'react-toastify'

export default function Reservar({ user }) {
  const [date, setDate] = useState(null)
  const [time, setTime] = useState("09:00")
  const [selectedTable, setSelectedTable] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mesasDisponibles, setMesasDisponibles] = useState([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    if (user) {
      setIsInitialLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      toast.error("Debe iniciar sesión para hacer una reserva.")
    }
  }, [user])

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 21; hour += 2) {
      options.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return options;
  };

  const obtenerMesasDisponibles = async (fecha, hora) => {
    if (!fecha || !hora) return;
    
    try {
      const fechaFormateada = format(fecha, "yyyy-MM-dd");
      const horaFormateada = format(parse(hora, "HH:mm", new Date()), "HH:mm");
      console.log('Enviando solicitud con fecha:', fechaFormateada, 'y hora:', horaFormateada);
      const url = `https://serverreservaciones.onrender.com/reservaciones?fecha=${fechaFormateada}&hora=${horaFormateada}`;
      console.log('URL completa de la API:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error del servidor: ${response.status}`);
      }

      const data = await response.json()
      console.log('Respuesta del servidor:', data);
      if (Array.isArray(data.mesasDisponibles)) {
        setMesasDisponibles(data.mesasDisponibles)
      } else {
        console.error('Formato de respuesta inesperado:', data);
        throw new Error('Formato de respuesta inesperado del servidor');
      }
    } catch (error) {
      console.error('Error al obtener mesas disponibles:', error)
      let errorMessage = "No se pudieron obtener las mesas disponibles. ";
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += "Error desconocido.";
      }
      toast.error(errorMessage)
    }
  }

  useEffect(() => {
    if (date && time) {
      obtenerMesasDisponibles(date, time);
    }
  }, [date, time])

  const handleReserve = async () => {
    if (!user) {
      toast.error("Debe iniciar sesión para hacer una reserva.")
      return
    }

    if (!date || !time || selectedTable === null) {
      toast.error("Por favor, complete todos los campos.")
      return
    }

    if (!mesasDisponibles.includes(selectedTable + 1)) {
      toast.error("La mesa seleccionada no está disponible.")
      return
    }

    setIsLoading(true)

    const fechaFormateada = format(date, "yyyy-MM-dd");

    const reservationData = {
      numeroMesa: selectedTable + 1,
      reservadoPor: user.nombreCompleto,
      fecha: fechaFormateada,
      hora: time,
      estaReservada: true
    }

    try {
      const response = await fetch('https://serverreservaciones.onrender.com/reservaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error del servidor: ${response.status}`);
      }

      const result = await response.json()

      toast.success(
        <div>
          <p>Su reserva ha sido confirmada con los siguientes detalles:</p>
          <p><strong>Mesa:</strong> {result.numeroMesa}</p>
          <p><strong>Fecha:</strong> {format(date, "PPP", { locale: es })}</p>
          <p><strong>Hora:</strong> {time}</p>
        </div>
      )
      // Reset form
      setSelectedTable(null)
      setDate(null)
      setTime("09:00")
      // Actualizar mesas disponibles
      obtenerMesasDisponibles(fechaFormateada, time)
    } catch (error) {
      console.error('Error al realizar la reserva:', error)
      let errorMessage = "Hubo un problema al realizar la reserva. ";
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += "Error desconocido.";
      }
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (isInitialLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Cargando...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Acceso Denegado</h1>
        <p>Debe iniciar sesión para hacer una reserva.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Reservar Mesa</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label htmlFor="date" className="block mb-2">Fecha</label>
          <input
            type="date"
            id="date"
            value={date ? format(date, "yyyy-MM-dd") : ''}
            onChange={(e) => setDate(new Date(e.target.value))}
            min={format(new Date(), "yyyy-MM-dd")}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>

        <div>
          <label htmlFor="time" className="block mb-2">Hora</label>
          <div className="relative">
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md appearance-none text-black"
            >
              {generateTimeOptions().map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {date && time && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Selecciona una mesa</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
            {[...Array(12)].map((_, index) => {
              const seats = index % 3 === 0 ? 6 : index % 3 === 1 ? 4 : 2;
              const isAvailable = mesasDisponibles.includes(index + 1);
              return (
                <div
                  key={index}
                  className={`cursor-pointer p-4 rounded-lg transition-colors h-[140px] ${
                    selectedTable === index
                      ? 'bg-red-600 text-white'
                      : isAvailable
                        ? 'bg-gray-200 hover:bg-gray-300 text-black'
                        : 'bg-gray-600 cursor-not-allowed text-gray-300'
                  }`}
                  onClick={() => isAvailable && setSelectedTable(index)}
                >
                  <div className="flex flex-col items-center h-full justify-between">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2095/2095479.png"
                      alt={`Mesa ${index + 1}`}
                      width={40}
                      height={40}
                    />
                    <span className="text-center">Mesa {index + 1}</span>
                    <div className="h-6 flex items-center justify-center">
                      {selectedTable === index && (
                        <div className="flex items-center text-xs">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{seats} asientos</span>
                        </div>
                      )}
                      {!isAvailable && (
                        <span className="text-xs text-red-500">No disponible</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={handleReserve}
              disabled={isLoading}
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Reservando...' : 'Reservar'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

