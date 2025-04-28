"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "../context/UserContext"
import { AuthService } from "../../lib/auth";
import { toast } from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
          setLoading(true);
          const response = await AuthService.login({ email, password });
          
          // Store token in localStorage
          if (response) {
            // Handle the token from the response
            localStorage.setItem('auth_token', btoa(email + ':' + password));
            
            // Update user context
            login(response);
            
            // Redirect to dashboard
            router.push("/panel");
          }
        } catch (error) {
          console.error("Login error:", error);
          toast.error("Error al iniciar sesión. Por favor, verifica tus credenciales.");
        } finally {
          setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-orange-200">
            <h2 className="text-3xl font-semibold mb-6 text-orange-700 text-center">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-orange-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-lg font-medium text-orange-900 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition duration-300"
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>
          </div>
        </div>
    );
}
