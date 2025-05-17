import type React from "react"
import "./globals.css"
import { Poppins } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { UserProvider } from "./context/UserContext"

// Configuración de la fuente Poppins con diferentes pesos y optimización de carga
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

// Metadatos de la aplicación para SEO
export const metadata = {
  title: "Leer es compartir",
  description: "Plataforma de préstamos de libros ya leídos",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="flex flex-col min-h-screen bg-orange-50 text-orange-900 font-poppins antialiased">
        {/* Proveedor del contexto de usuario que envuelve toda la aplicación */}
        <UserProvider>
          {/* Encabezado de la aplicación */}
          <Header />
          {/* Contenido principal con flex-grow para ocupar el espacio disponible */}
          <main className="flex-grow">{children}</main>
          {/* Pie de página */}
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}