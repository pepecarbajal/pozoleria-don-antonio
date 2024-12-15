// src/components/Usuario/UserReservations.js
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { format } from "date-fns"
import { es } from 'date-fns/locale'

export default function UserReservations({ user }) {
  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [reservationToCancel, setReservationToCancel] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user || !user.nombreCompleto) return;

      try {
        const response = await fetch('https://serverreservaciones.onrender.com/reservaciones/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre: user.nombreCompleto }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch reservations')
        }
        const data = await response.json()
        console.log('Reservaciones cargadas:', data);
        setReservations(data)
      } catch (error) {
        console.error('Error fetching reservations:', error)
        toast.error("No se pudieron cargar las reservaciones. Por favor, intente de nuevo más tarde.");
      } finally {
        setIsLoading(false)
      }
    }

    fetchReservations()
  }, [user?.nombreCompleto])

  const handleCancelReservation = async () => {
    if (!reservationToCancel) return;

    try {
      console.log('Intentando cancelar reservación:', reservationToCancel._id);
      const response = await fetch(`https://serverreservaciones.onrender.com/reservaciones/${reservationToCancel._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cancelar la reservación');
      }

      console.log('Reservación cancelada exitosamente');
      setReservations(prevReservations => prevReservations.filter(res => res._id !== reservationToCancel._id));
      toast.success("Su reservación ha sido cancelada exitosamente.");
    } catch (error) {
      console.error('Error al cancelar la reservación:', error);
      toast.error(error.message || "No se pudo cancelar la reservación. Por favor, intente de nuevo más tarde.");
    } finally {
      setReservationToCancel(null);
      setIsDialogOpen(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Cargando reservaciones...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mis Reservaciones</h1>
      {reservations.length === 0 ? (
        <p>No tienes reservaciones activas.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">Mesa {reservation.numeroMesa}</h2>
                <p className="text-gray-900"><strong>Fecha:</strong> {format(new Date(reservation.fecha), "PPP", { locale: es })}</p>
                <p className="text-gray-900"><strong>Hora:</strong> {reservation.hora}</p>
                <button 
                  onClick={() => {
                    setReservationToCancel(reservation);
                    setIsDialogOpen(true);
                  }}
                  className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Cancelar Reservación
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">¿Estás seguro de que deseas cancelar esta reservación?</h3>
            <p className="mb-6">
              {reservationToCancel && (
                <>
                  Esta acción no se puede deshacer. Se cancelará tu reservación para la Mesa {reservationToCancel.numeroMesa} el día {format(new Date(reservationToCancel.fecha), "PPP", { locale: es })} a las {reservationToCancel.hora}.
                </>
              )}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleCancelReservation}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Confirmar Cancelación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

