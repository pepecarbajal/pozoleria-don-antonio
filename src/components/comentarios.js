import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function Comentarios({ user, initialComments }) {
  console.log("User prop in Comentarios:", user);
  console.log("User is truthy:", !!user);
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (user && newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        name: user.nombreCompleto,
        text: newComment,
        date: new Date()
      }
      setComments([...comments, newCommentObj])
      setNewComment('')
      toast.success('Comentario agregado exitosamente')
    } else if (!user) {
      toast.error('Debes iniciar sesión para comentar')
    } else {
      toast.error('Por favor, ingrese un comentario válido')
    }
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
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-900 rounded-lg p-4">
                <p className="font-semibold text-red-400 mb-1">{comment.name}</p>
                <p className="text-gray-300 mb-2">{comment.text}</p>
                <p className="text-xs text-gray-500">{comment.date.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

