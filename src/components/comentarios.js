import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function Comentarios({ user, comments = [], isLoading }) {
  const [newComment, setNewComment] = useState('')

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (user && newComment.trim()) {
      try {
        const response = await fetch('https://serverreservaciones.onrender.com/comentarios/comentar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.nombreCompleto,
            text: newComment,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to submit comment')
        }

        toast.success('Comentario agregado exitosamente')
        setNewComment('')
        // Aquí deberías actualizar la lista de comentarios
        // Podrías hacerlo recargando todos los comentarios o añadiendo el nuevo comentario a la lista existente
      } catch (error) {
        console.error('Error submitting comment:', error)
        toast.error('No se pudo agregar el comentario. Por favor, intente de nuevo más tarde.')
      }
    } else if (!user) {
      toast.error('Debes iniciar sesión para comentar')
    } else {
      toast.error('Por favor, ingrese un comentario válido')
    }
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
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 text-black rounded-md mb-4"
                rows="4"
                placeholder="Escribe tu comentario aquí..."
                required
              ></textarea>
              <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
                Enviar comentario
              </button>
            </form>
          )}
          <div className="space-y-4">
            {comments && comments.length > 0 ? (
              console.log(comments),
              comments.map((comment) => (
                <div key={comment._id} className="bg-gray-900 rounded-lg p-4">
                  <p className="font-semibold text-red-400 mb-1">{comment.nombre}</p>
                  <p className="text-gray-300 mb-2">{comment.comentario}</p>
                  <p className="text-xs text-gray-500">{new Date(comment.fecha).toLocaleString()}</p>
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

