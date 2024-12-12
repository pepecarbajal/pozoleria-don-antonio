import React, { useState, useEffect, useCallback } from 'react'
import { format, parseISO, addMinutes, isBefore } from "date-fns"
import { es } from 'date-fns/locale'
import { toast } from 'react-toastify';

export default function Administrador() {
  const [date, setDate] = useState(new Date())
  const [reservations, setReservations] = useState([])

  const fetchReservations = useCallback(async () => {
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const url = `https://serverreservaciones.onrender.com/reservaciones/todas?fecha=${formattedDate}`;
      
      console.log('Fetching reservations with URL:', url);

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
      const data = await response.json();
      console.log('Received data:', data);
      setReservations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reservations:', error.message);
      toast.error(`No se pudieron cargar las reservaciones: ${error.message}. Por favor, intente de nuevo más tarde.`);
      setReservations([]);
    }
  }, [date]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleDateChange = (newDate) => {
    const selectedDate = new Date(newDate + 'T00:00:00');
    const timezoneOffset = selectedDate.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(selectedDate.getTime() + timezoneOffset);
    setDate(adjustedDate);
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      const response = await fetch(`https://serverreservaciones.onrender.com/reservaciones/${reservationId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`)
      }
      toast.success("Reservación cancelada");
      fetchReservations();
    } catch (error) {
      console.error('Error cancelling reservation:', error.message)
      toast.error(`No se pudo cancelar la reservación: ${error.message}. Por favor, intente de nuevo más tarde.`);
    }
  }

  const checkAndCancelOverdueReservations = useCallback(async () => {
    const currentDate = new Date();
    const updatedReservations = reservations.map(async (reservation) => {
      const reservationDateTime = parseISO(`${reservation.fecha}T${reservation.hora}`);
      const cancellationTime = addMinutes(reservationDateTime, 15);
      
      if (isBefore(cancellationTime, currentDate) && !reservation.cancelada) {
        try {
          const response = await fetch(`https://serverreservaciones.onrender.com/reservaciones/${reservation._id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            console.log(`Reservación ${reservation._id} cancelada automáticamente.`);
            return { ...reservation, cancelada: true };
          }
        } catch (error) {
          console.error('Error al cancelar la reservación:', error);
        }
      }
      return reservation;
    });

    const resolvedReservations = await Promise.all(updatedReservations);
    setReservations(resolvedReservations);
  }, [reservations]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkAndCancelOverdueReservations();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [checkAndCancelOverdueReservations]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Panel de Administrador</h1>

      <div className="mb-8">
        <label htmlFor="date" className="block mb-2 text-white">Fecha</label>
        <input
          type="date"
          id="date"
          value={format(date, "yyyy-MM-dd")}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-black"
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white">Reservaciones del {format(date, "d 'de' MMMM, yyyy", { locale: es })}</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 text-left">Mesa</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2 text-left">Hora</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <tr key={reservation._id} className="border-b border-gray-700">
                  <td className="p-2">{reservation.numeroMesa}</td>
                  <td className="p-2">{reservation.reservadoPor}</td>
                  <td className="p-2">{format(new Date(reservation.fecha), "dd/MM/yyyy")}</td>
                  <td className="p-2">{reservation.hora}</td>
                  <td className="p-2">
                    {reservation.cancelada ? (
                      <span className="text-red-500">Cancelada</span>
                    ) : (
                      <button 
                        onClick={() => handleCancelReservation(reservation._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4">No hay reservaciones para esta fecha.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

