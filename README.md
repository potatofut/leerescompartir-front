
Leer es compartir - Frontend
Slogan

Frontend de la aplicación web "Leer es compartir", una plataforma para compartir libros entre lectores. Este proyecto proporciona la interfaz de usuario para interactuar con el backend.

📖 Descripción
"Leer es compartir" es una comunidad donde los usuarios pueden:

Compartir los libros que ya han leído
Descubrir nuevas historias
Prestar y reservar libros de otros usuarios
Explorar libros por temáticas y ubicaciones
Slogan: Comparte tus libros favoritos. Únete a nuestra comunidad de lectores y comparte los libros que ya has leído. Descubre nuevas historias y permite que otros disfruten de tus lecturas favoritas.

🛠️ Tecnologías
Next.js 15.2.4 (Framework React)
React 19 (Biblioteca UI)
Tailwind CSS (Estilos)
Radix UI (Componentes accesibles)
Axios (Cliente HTTP)
React Hook Form + Zod (Formularios y validación)
Next Themes (Soporte para modo oscuro/claro)
Sonner (Notificaciones)
📂 Estructura del proyecto
.
├── app/
│   ├── buscar/                  # Página de búsqueda de libros
│   ├── components/              # Componentes compartidos (Header, Footer, etc.)
│   ├── context/                 # Contextos de React
│   ├── libros/                  # Página de listado de libros
│   ├── login/                   # Página de inicio de sesión
│   ├── panel/                   # Panel de usuario
│   │   ├── datos-usuario/       # Edición de perfil
│   │   ├── mis-libros/          # Gestión de libros del usuario
│   │   └── prestamos/           # Gestión de préstamos
│   ├── registro/                # Página de registro
│   └── ...                      # Otras páginas
├── components/
│   ├── ui/                      # Componentes UI personalizados
│   └── theme-provider.tsx       # Proveedor de temas
├── lib/
│   ├── api.ts                   # Configuración de API
│   ├── auth.ts                  # Lógica de autenticación
│   ├── libros.ts                # Servicios de libros
│   └── regions.ts               # Servicios de regiones
├── public/                      # Assets estáticos
└── styles/                      # Estilos globales
✨ Características principales
Autenticación de usuarios: Registro, inicio de sesión y gestión de perfiles
Gestión de libros: Añadir, editar y eliminar libros
Sistema de préstamos: Reservar y devolver libros
Búsqueda avanzada: Filtrado por título, autor, temática y ubicación
Diseño responsive: Adaptable a diferentes dispositivos
🚀 Instalación y ejecución
Requisitos previos
Node.js 18+
npm/pnpm/yarn
1. Configuración local
Clonar el repositorio:

git clone https://github.com/potatofut/biblioteca-prestamos.git
cd biblioteca-prestamos
Instalar dependencias:

npm install
# o
pnpm install
# o
yarn install
Configurar variables de entorno: Crear un archivo .env.local basado en .env.example con la URL del backend:

NEXT_PUBLIC_API_URL=http://localhost:8080/api
Ejecutar la aplicación:

npm run dev
# o
pnpm dev
# o
yarn dev
La aplicación estará disponible en http://localhost:3000.


🌐 Despliegue

Esta aplicación está desplegada públicamente en:

🔗 https://www.leerescompartir.com

Puedes acceder directamente para explorar, buscar y compartir libros con la comunidad de lectores.

🧪 Pruebas
Ejecutar las pruebas con:

npm test
# o
pnpm test
# o
yarn test
🤝 Contribución
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

📄 Licencia
Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

"Comparte tus libros favoritos" - Conectando lectores a través de las páginas.

