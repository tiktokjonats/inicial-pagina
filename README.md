# Inicial - Página de Registro

Proyecto Next.js simple con una página de registro basada en el contenido enviado por el usuario (DNI, Nombre completo, Tipo, Admin, etc).

## Qué incluye
- Página principal con formulario (DNI, Nombres completos, selector de organización, checkbox Admin).
- Área que muestra "NOMBRE DEL ASESOR DEBE APARECER AQUI".
- Instrucciones para desplegar en Vercel y subir a GitHub.

## Cómo probar localmente
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Ejecuta en modo desarrollo:
   ```bash
   npm run dev
   ```
3. Abre `http://localhost:3000`

## Subir a GitHub y desplegar en Vercel
1. Crea un nuevo repo en GitHub (por ejemplo `inicial-pagina`).
2. Desde tu máquina, inicializa git y sube:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - formulario de registro"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<inicial-pagina>.git
   git push -u origin main
   ```
3. Ve a https://vercel.com, crea cuenta o inicia sesión, elige "Import Project" -> GitHub -> selecciona el repo -> Deploy.

Eso es todo — Vercel detectará Next.js y desplegará el sitio automáticamente.