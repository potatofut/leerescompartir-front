"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "../../lib/auth"
import { toast } from "react-hot-toast"

export default function VerificacionPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("Verificando tu email...")

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search)
                const token = urlParams.get('token')
                
                if (!token) {
                    throw new Error("No se encontró el token de verificación")
                }

                const result = await AuthService.verifyEmail(token)
                setMessage(result)
                toast.success(result)
                
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push("/login")
                }, 3000)
            } catch (error: any) {
                setMessage(error.message || "Error al verificar el email")
                toast.error(error.message || "Error al verificar el email")
            } finally {
                setLoading(false)
            }
        }

        verifyToken()
    }, [router])

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-orange-200 text-center">
                <h1 className="text-2xl font-semibold mb-4 text-orange-700">Verificación de Email</h1>
                <p className="text-gray-700 mb-6">
                    {loading ? (
                        <span className="inline-block animate-pulse">⏳ {message}</span>
                    ) : (
                        message
                    )}
                </p>
                {!loading && (
                    <button
                        onClick={() => router.push("/login")}
                        className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
                    >
                        Ir a Iniciar Sesión
                    </button>
                )}
            </div>
        </div>
    )
}