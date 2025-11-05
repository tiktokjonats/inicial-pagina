import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

export default function Login() {
  const [mode, setMode] = useState('user') // 'user' or 'admin'
  const [dni, setDni] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')

    // admin fixed
    if (mode === 'admin') {
      if (dni === 'formacion' && password === 'geincos25*') {
        // create a simple admin session in localStorage
        localStorage.setItem('auth', JSON.stringify({ role: 'admin', user: 'formacion' }))
        router.push('/dashboard')
        return
      } else {
        setError('Credenciales de admin incorrectas')
        return
      }
    }

    // usuario: buscar en la tabla users por dni y password
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('dni', dni)
      .eq('password', password)
      .limit(1)
      .maybeSingle()

    if (error) {
      setError('Error al conectar con la base de datos')
      console.error(error)
      return
    }

    if (!data) {
      // usuario no existe -> redirigir a registro con dni prellenado
      router.push(`/register?dni=${encodeURIComponent(dni)}`)
      return
    }

    // login exitoso: guardar sesión simple en localStorage
    localStorage.setItem('auth', JSON.stringify({ role: data.is_admin ? 'admin' : 'user', user: data.dni, full_name: data.full_name }))
    router.push('/dashboard')
  }

  return (
    <main className="wrap">
      <div className="card login">
        <h1>Iniciar sesión</h1>
        <div className="toggle">
          <button className={mode==='user' ? 'active' : ''} onClick={() => setMode('user')}>Usuario</button>
          <button className={mode==='admin' ? 'active' : ''} onClick={() => setMode('admin')}>Admin</button>
        </div>
        <form onSubmit={handleLogin}>
          <label>
            {mode === 'admin' ? 'Usuario (formacion)' : 'DNI'}
            <input value={dni} onChange={e=>setDni(e.target.value)} placeholder={mode==='admin' ? 'formacion' : '12345678'} />
          </label>
          <label>
            Contraseña
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="geincos25*" />
          </label>
          <div className="actions">
            <button type="submit">Entrar</button>
          </div>
        </form>
        {error && <div className="error">{error}</div>}
        <p className="note">Si no estás registrado como usuario, escribe tu DNI y al intentar iniciar sesión serás redirigido al registro.</p>
      </div>

      <style jsx>{`
        .wrap{ min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f3f4f6; padding:40px }
        .card.login{ width:420px; padding:24px; border-radius:12px; background:white; box-shadow:0 6px 18px rgba(12,12,12,0.06) }
        h1{ margin:0 0 12px 0; font-size:22px }
        .toggle{ display:flex; gap:8px; margin-bottom:12px }
        .toggle button{ flex:1; padding:8px 10px; border-radius:8px; border:1px solid #e6e6e6; background:#f8fafc; cursor:pointer }
        .toggle .active{ background:#4f46e5; color:white; border-color:#4f46e5 }
        label{ display:block; margin-bottom:10px; font-size:14px }
        input{ width:100%; padding:10px; border:1px solid #d1d5db; border-radius:8px; margin-top:6px }
        .actions{ display:flex; justify-content:flex-end; margin-top:8px }
        button[type="submit"]{ background:#111827; color:white; padding:10px 14px; border-radius:8px; border:0; cursor:pointer }
        .note{ font-size:13px; color:#6b7280; margin-top:12px }
        .error{ margin-top:10px; color:#b91c1c; font-weight:600 }
      `}</style>
    </main>
  )
}