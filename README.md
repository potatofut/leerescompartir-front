# 📚 Leer es compartir - Frontend

![Slogan](https://img.shields.io/badge/Slogan-Comparte_tus_libros_favoritos-blue)

Frontend de la aplicación web **"Leer es compartir"**, una plataforma pensada para conectar lectores a través del intercambio de libros. Este proyecto implementa la interfaz de usuario del sistema, que se comunica con el [backend del proyecto](https://github.com/potatofut/leer-es-compartir).

---

## 📖 Descripción

**"Leer es compartir"** es una comunidad digital donde los usuarios pueden:

- Compartir los libros que ya han leído  
- Descubrir nuevas historias recomendadas por otros lectores  
- Prestar y reservar libros de forma colaborativa  
- Explorar el catálogo por temáticas y ubicaciones  

> **Slogan:** _Comparte tus libros favoritos. Únete a nuestra comunidad de lectores, descubre nuevas historias y permite que otros disfruten de tus lecturas._

---

## 🛠️ Tecnologías utilizadas

- ⚛️ **Next.js 15.2.4** – Framework para React
- 🧩 **React 19** – Biblioteca para la construcción de interfaces
- 💨 **Tailwind CSS** – Framework de estilos utilitarios
- ♿ **Radix UI** – Componentes accesibles y personalizables
- 🔗 **Axios** – Cliente HTTP para APIs REST
- 📝 **React Hook Form** + **Zod** – Manejo y validación de formularios
- 🌗 **Next Themes** – Soporte para modo claro/oscuro
- 🔔 **Sonner** – Sistema de notificaciones

---

## 📂 Estructura del proyecto

```plaintext
.
├── app/
│   ├── buscar/              # Página de búsqueda
│   ├── components/          # Header, Footer y otros componentes compartidos
│   ├── context/             # Contextos de React (estado global)
│   ├── libros/              # Listado y detalle de libros
│   ├── login/               # Página de inicio de sesión
│   ├── panel/               # Panel de usuario (perfil, libros, préstamos)
│   ├── registro/            # Página de registro
├── components/
│   ├── ui/                  # Componentes UI personalizados
│   └── theme-provider.tsx   # Gestión de tema (claro/oscuro)
├── lib/
│   ├── api.ts               # Configuración y llamadas a la API
│   ├── auth.ts              # Lógica de autenticación
│   ├── libros.ts            # Funciones relacionadas con libros
│   └── regions.ts           # Servicios relacionados con regiones
├── public/                  # Recursos estáticos (imágenes, íconos, etc.)
└── styles/                  # Estilos globales
```

---

## ✨ Funcionalidades principales

- ✅ **Autenticación de usuarios**: Registro, login y edición de perfil
- 📚 **Gestión de libros**: Añadir, editar, eliminar tus libros
- 🔄 **Sistema de préstamos**: Reservar libros de otros y gestionar devoluciones
- 🔍 **Búsqueda avanzada**: Filtros por título, autor, temática o ubicación
- 📱 **Diseño responsive**: Optimizado para móviles, tablets y PC

---

## 🚀 Instalación y ejecución local

### 🧾 Requisitos

- Node.js 18 o superior
- npm, pnpm o yarn

### 🔧 Pasos para ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/potatofut/biblioteca-prestamos.git
cd biblioteca-prestamos
```

2. Instala las dependencias:

```bash
npm install
# o
pnpm install
# o
yarn install
```

3. Configura las variables de entorno:

Crea el archivo `.env.local` y define la URL del backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

4. Ejecuta la aplicación:

```bash
npm run dev
# o
pnpm dev
# o
yarn dev
```

👉 Accede en tu navegador a `http://localhost:3000`.

---

## 🌐 Despliegue en producción

La aplicación está disponible públicamente en:

🔗 **https://www.leerescompartir.com**

Puedes explorar, buscar y compartir libros directamente desde la plataforma.

---

## 🧪 Pruebas

Para ejecutar las pruebas automatizadas:

```bash
npm test
# o
pnpm test
# o
yarn test
```

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras errores o tienes ideas para mejorar la app:

- Abre un [Issue](https://github.com/potatofut/biblioteca-prestamos/issues)
- O envía un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

---

> **"Comparte tus libros favoritos"** – Conectando lectores a través de las páginas.
