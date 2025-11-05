import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()
  const { dni: qdni } = router.query
  const [dni, setDni] = useState(qdni || '')
  const [fullName, setFullName] = useState('')
  const [org, setOrg] = useState('BANCO')
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(()=>{
    if (qdni) setDni(qdni)
  },[qdni])

  async function handleRegister(e) {
    e.preventDefault()
    setError(''); setSuccess('')
    if (!dni || !fullName) { setError('DNI y nombre son obligatorios'); return }

    const { data: existing } = await supabase.from('users').select('id').eq('dni', dni).maybeSingle()
    if (existing) { setError('Usuario ya registrado. Por favor inicia sesión.'); return }

    const { error } = await supabase.from('users').insert([{ dni, full_name: fullName, org, is_admin: isAdmin, password: 'Geincos25*' }])
    if (error) { setError('Error al crear usuario'); console.error(error); return }
    setSuccess('Registro exitoso. Ahora puedes iniciar sesión.')
    setTimeout(()=>router.push('/'), 1200)
  }

  return (
    <main className="wrap">
      <div className="card reg">
        <h1>Registro de Usuario</h1>
        <form onSubmit={handleRegister}>
          <label>DNI
            <input value={dni} onChange={e=>setDni(e.target.value)} />
          </label>
          <label>Nombres completos
            <input value={fullName} onChange={e=>setFullName(e.target.value)} />
          </label>
          <label>Seleccionar (BANCO/NATURA/DUPRE/AUNA)
            <select value={org} onChange={e=>setOrg(e.target.value)}>
              <option>BANCO</option><option>NATURA</option><option>DUPRE</option><option>AUNA</option>
            </select>
          </label>
          <label className="row"><input type="checkbox" checked={isAdmin} onChange={e=>setIsAdmin(e.target.checked)} /> Marcar como Admin</label>
          <div className="actions"><button type="submit">Registrar</button></div>
        </form>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>

      <style jsx>{`
        .wrap{ min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f3f4f6; padding:40px }
        .card.reg{ width:520px; padding:24px; border-radius:12px; background:white; box-shadow:0 6px 18px rgba(12,12,12,0.06) }
        h1{ margin:0 0 12px 0; font-size:22px }
        label{ display:block; margin-bottom:10px; font-size:14px }
        input, select{ width:100%; padding:10px; border:1px solid #d1d5db; border-radius:8px; margin-top:6px }
        .row{ display:flex; align-items:center; gap:8px }
        .actions{ display:flex; justify-content:flex-end; margin-top:8px }
        button[type="submit"]{ background:#111827; color:white; padding:10px 14px; border-radius:8px; border:0; cursor:pointer }
        .error{ margin-top:10px; color:#b91c1c; font-weight:600 }
        .success{ margin-top:10px; color:#065f46; font-weight:600 }
      `}</style>
    </main>
  )
}