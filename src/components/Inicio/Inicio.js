import React, { useState, useEffect } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import FloatingParticles from "./floating-particles"
import MenuTabs from "./menu-tabs"
import LocationMap from "./location-map"
import HeroCarousel from "./hero-carousel"
import Comentarios from "../comentarios"
 
const menuItems = [
  {
    name: "Pozole Rojo Tradicional",
    price: "180",
    description: "Maíz cacahuazintle, carne de cerdo, chile guajillo, lechuga, rábano, cebolla",
    image: "https://peopleenespanol.com/thmb/vxx6_l3dlR75mS6OvBwFSTapwtg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/pozole-blanco-de-puerco-2000-cc5fd5d86ae4408abecc2bb1d57422e0.jpg",
    category: "pozoles"
  },
  {
    name: "Pozole Verde Guerrerense",
    price: "180",
    description: "Maíz cacahuazintle, carne de cerdo, pepitas, espinacas, tomatillos, epazote",
    image: "https://acapulco.pro/wp-content/uploads/2022/02/pozole-guerrero-.jpg",
    category: "pozoles"
  },
  {
    name: "Pozole Blanco Especial",
    price: "190",
    description: "Maíz cacahuazintle, carne de cerdo y pollo, cebolla, lechuga, orégano",
    image: "https://elsouvenir.com/wp-content/uploads/2020/11/Como-es-el-pozolo-de-Guerrero-1.jpg",
    category: "pozoles"
  },
  {
    name: "Pozole de Camarón",
    price: "220",
    description: "Maíz cacahuazintle, camarones, chile guajillo, verduras frescas",
    image: "https://demo.clevercloudapp.com/repo/public/pozole_verde_estilo_guerrero_en_cdmx_pozoleria_el_pozole_de_moctezuma_blog_680713ab91bf21733d9473bd06694db5.webp",
    category: "pozoles"
  },
  {
    name: "Tacos Dorados",
    price: "85",
    description: "Orden de 4 tacos dorados de pollo o res, servidos con lechuga, crema, queso y salsa",
    image: "https://familiakitchen.com/wp-content/uploads/2022/04/iStock-984246484-1-Tacos-dorados-2-e1649942350901.jpg",
    category: "antojitos"
  },
  {
    name: "Tostadas",
    price: "90",
    description: "Orden de 3 tostadas con frijoles, tu elección de carne, lechuga, crema y queso",
    image: "https://www.mylatinatable.com/wp-content/uploads/2018/09/foto-h-500x500.jpg",
    category: "antojitos"
  },
  {
    name: "Quesadillas",
    price: "85",
    description: "Orden de 3 quesadillas de maíz o harina con tu elección de queso y carne, servidas con guacamole y salsa",
    image: "https://i.ytimg.com/vi/Yx9P_ykIUQI/maxresdefault.jpg",
    category: "antojitos"
  },
  {
    name: "Agua de Horchata",
    price: "35",
    description: "Refrescante bebida de arroz con canela y vainilla, servida con hielo",
    image: "https://cdn7.kiwilimon.com/recetaimagen/31780/640x640/36562.jpg.webp",
    category: "bebidas"
  },
  {
    name: "Agua de Jamaica",
    price: "35",
    description: "Deliciosa infusión de flor de jamaica, endulzada al gusto",
    image: "https://cdn7.kiwilimon.com/recetaimagen/31783/640x640/36556.jpg.webp",
    category: "bebidas"
  },
  {
    name: "Cerveza Artesanal",
    price: "60",
    description: "Selección de cervezas artesanales locales, pregunte por nuestras variedades",
    image: "https://www.eluniversal.com.mx/resizer/v2/M6TGZXB3DBAKJNCTW7PML43SAQ.jpg?auth=6f1f5e4f79fe02e39ad7817c30f95aab94aa312b7ff79a6b7ae8ca4b2b009ef1&smart=true&width=1100&height=666",
    category: "bebidas"
  },
  {
    name: "Patas de Cerdo",
    price: "45",
    description: "Deliciosas patas de cerdo cocidas y sazonadas, perfectas para acompañar tu pozole",
    image: "https://www.recetas-guatemala.com/base/stock/Recipe/350-image/350-image_web.jpg.webp",
    category: "complementos"
  },
  {
    name: "Chiles Capones",
    price: "60",
    description: "Chiles rellenos de queso, capeados y fritos, servidos con salsa",
    image: "https://tb-static.uber.com/prod/image-proc/processed_images/86bc388154d7f91b35cb42f38215cce9/4218ca1d09174218364162cd0b1a8cc1.jpeg",
    category: "complementos"
  }
]

export default function Inicio({ user }) {
  const [activeTab, setActiveTab] = useState('todos')
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('https://serverreservaciones.onrender.com/comentarios/comentarios')
        if (!response.ok) {
          throw new Error('Failed to fetch comments')
        }
        const data = await response.json()
        setComments(data || [])
      } catch (error) {
        console.error('Error fetching comments:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingParticles />

      {/* Hero Section */}
      <div className="relative pt-10 sm:pt-20 pb-16 sm:pb-32">
        <div className="container mx-auto px-4">
          <HeroCarousel 
            items={menuItems} 
            buttons={
              <>
                <a href="#menu" className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors">
                  Ver Menú
                </a>
                <a href="#ubicacion" className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors border border-white">
                  Información
                </a>
              </>
            }
          />
        </div>
      </div>

      {/* Menu Section */}
      <section id="menu" className="bg-black/50 backdrop-blur-sm py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">MENÚ</h2>

          <MenuTabs setActiveTab={setActiveTab} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems
              .filter(item => activeTab === 'todos' || item.category === activeTab)
              .map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors group"
                >
                  <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm sm:text-base">{item.name}</h3>
                    <span className="text-red-600 font-bold text-sm sm:text-base">${item.price}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="ubicacion" className="py-12 sm:py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Nuestra Ubicación</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <LocationMap />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Restaurante Don Antonio</h3>
              <p className="text-gray-400 mb-4">
                Av. 5 de febrero N°27 barrio de San Antonio,<br />
                39069 Chilpancingo de los Bravo, Gro.
              </p>
              <div className="space-y-2">
                <p className="text-gray-400 flex items-center gap-2">
                  <Phone size={18} />
                  <strong>Teléfono:</strong> (747) 210-3016
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                  <MessageCircle size={18} />
                  <strong>WhatsApp:</strong> (747) 210-3016
                </p>
              </div>
              <p className="text-gray-400 mt-4">
                <strong>Horario:</strong><br />
                Lunes a Sabado: 09:00 AM - 11:00 PM
              </p>
              <p className="text-gray-400">
                Domingo: 09:00 AM - 09:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <Comentarios user={user} comments={comments} isLoading={isLoading} />
    </main>
  )
}

