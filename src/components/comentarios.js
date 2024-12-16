import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Star } from 'lucide-react'

export default function Comentarios({ user, comments = [], isLoading, onCommentAdded }) {
  const [newComment, setNewComment] = useState('')
  const [rating, setRating] = useState(0)

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (user && newComment.trim() && rating > 0) {
      try {
        const response = await fetch('https://serverreservaciones.onrender.com/comentarios/comentar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre: user.nombreCompleto,
            comentario: newComment,
            estrellas: rating
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to submit comment')
        }

        toast.success('Comentario agregado exitosamente')
        setNewComment('')
        setRating(0)
        // Call onCommentAdded only if it's a function
        if (typeof onCommentAdded === 'function') {
          onCommentAdded()
        } else {
          console.warn('onCommentAdded is not a function')
        }
      } catch (error) {
        console.error('Error submitting comment:', error)
        toast.error('No se pudo agregar el comentario. Por favor, intente de nuevo más tarde.')
      }
    } else if (!user) {
      toast.error('Debes iniciar sesión para comentar')
    } else if (rating === 0) {
      toast.error('Por favor, selecciona una calificación')
    } else {
      toast.error('Por favor, ingrese un comentario válido')
    }
  }

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`cursor-pointer ${
              star <= value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
            }`}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <section id="comentarios" className="py-12 sm:py-20 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Comentarios de nuestros clientes</h2>
          <div className="max-w-2xl mx-auto text-center">
            Cargando comentarios...
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="comentarios" className="py-12 sm:py-20 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Comentarios de nuestros clientes</h2>
        <div className="max-w-2xl mx-auto">
          {user && (
            <form onSubmit={handleCommentSubmit} className="mb-8 bg-gray-900 p-6 rounded-lg">
              <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-400 mb-2">
                  Calificación
                </label>
                <StarRating value={rating} onChange={setRating} />
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-400 mb-2">
                  Tu comentario
                </label>
                <textarea
                  id="comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 text-black rounded-md"
                  rows="4"
                  placeholder="Escribe tu comentario aquí..."
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
              >
                Enviar comentario
              </button>
            </form>
          )}
          <div className="space-y-4">
            {comments && comments.length > 0 ? (
              [...comments].reverse().map((comment) => (
                <div key={comment._id} className="bg-gray-900 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-red-400">{comment.nombre}</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= comment.estrellas ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-2">{comment.comentario}</p>
                  <p className="text-xs text-gray-500">{new Date(comment.fecha).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No hay comentarios aún.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

