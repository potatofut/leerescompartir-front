"use client"

import Link from "next/link"
import UserMenu from "./UserMenu"
import { useUser } from "../context/UserContext"

export default function Header() {
  const { isLoggedIn } = useUser()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-orange-700 hover:text-orange-600 transition duration-300">
          Leer es compartir
        </Link>
        <nav className="flex items-center">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link href="/" className="text-orange-900 hover:text-orange-700 transition duration-300">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/libros" className="text-orange-900 hover:text-orange-700 transition duration-300">
                Libros
              </Link>
            </li>
            <li>
              <Link href="/buscar" className="text-orange-900 hover:text-orange-700 transition duration-300">
                Buscar Libros
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li>
                  <Link href="/login" className="text-orange-900 hover:text-orange-700 transition duration-300">
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link
                    href="/registro"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <UserMenu />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}