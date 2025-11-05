# Inicial - Panel con Supabase

Este proyecto es una implementación del flujo que solicitaste:
- Login por DNI + contraseña (usuarios almacenados en Supabase)
- Admin fijo: usuario `formacion` / contraseña `geincos25*`
- Registro de usuarios (si no existe)
- Dashboard (pantalla 3) con el diseño que proporcionaste

## Requisitos
- Node 18+
- Cuenta en Supabase

## Cómo configurar Supabase (rápido)
1. Crea un proyecto en https://app.supabase.com
2. Ve a Table Editor y crea una tabla `users` con estos campos:
   - id (uuid) primary key default: gen_random_uuid()
   - dni (text) unique
   - full_name (text)
   - org (text)
   - is_admin (boolean) default false
   - password (text)  -- NOTA: en producción debes encriptar/usar Auth de Supabase
3. Copia URL y ANON KEY en `.env.local` (usa `.env.local.example` como referencia)

## Cómo ejecutar localmente
```bash
unzip inicial-pagina-supabase.zip
cd inicial-pagina-supabase
npm install
cp .env.local.example .env.local
# editar .env.local con tus credenciales de Supabase
npm run dev
# abrir http://localhost:3000
```

## Notas de seguridad
- Por simplicidad este ejemplo guarda contraseñas en texto en Supabase. Para producción:
  - Usa la autenticación nativa de Supabase (Auth) o
  - Hashea contraseñas con bcrypt y usa conexiones seguras.

## Deploy en Vercel
1. Subir repo a GitHub.
2. Conectar repo en Vercel y añadir las variables de entorno (NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY).
3. Deploy.