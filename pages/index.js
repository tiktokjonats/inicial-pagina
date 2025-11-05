import { useState } from 'react'

export default function Home() {
  const [dni, setDni] = useState('')
  const [fullName, setFullName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [org, setOrg] = useState('BANCO')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // Aquí podrías enviar datos a una API. Por ahora solo mostramos un mensaje.
    setMessage(`Usuario registrado: ${fullName} (DNI: ${dni}) — Organización: ${org} — Admin: ${isAdmin ? 'Sí' : 'No'}`)
  }

  return (
    <main className="container">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit} className="card">
        <label>
          DNI
          <input value={dni} onChange={e => setDni(e.target.value)} placeholder="12345678" />
        </label>

        <label>
          Nombres completos
          <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Jonatan Santiago" />
        </label>

        <label className="row">
          <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
          Admin
        </label>

        <label>
          Seleccionar si es BANCO, NATURA, DUPRE, AUNA
          <select value={org} onChange={e => setOrg(e.target.value)}>
            <option>BANCO</option>
            <option>NATURA</option>
            <option>DUPRE</option>
            <option>AUNA</option>
          </select>
        </label>

        <div className="actions">
          <button type="submit">Registrarse</button>
        </div>
      </form>

      <section className="advisor">
        <h2>Registro</h2>
        <p>DNI: <strong>{dni || '—'}</strong></p>
        <p>Nombre completo: <strong>{fullName || '—'}</strong></p>
        <p>Nombre del asesor debe aparecer aqui</p>
      </section>

      {message && <div className="toast">{message}</div>}

      <style jsx>{`
        .container{
          max-width:900px;
          margin:40px auto;
          padding:20px;
          font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
        }
        h1{ font-size:28px; margin-bottom:16px}
        .card{
          display:grid;
          gap:12px;
          padding:18px;
          border:1px solid #e6e6e6;
          border-radius:12px;
          background: white;
        }
        label{ display:flex; flex-direction:column; font-size:14px; }
        input[type="text"], input[type="email"], input[type="password"], input[type="number"], input{
          padding:10px; border:1px solid #ccc; border-radius:8px; margin-top:6px;
        }
        select{ padding:10px; border:1px solid #ccc; border-radius:8px; margin-top:6px; }
        .row{ flex-direction:row; align-items:center; gap:8px }
        .actions{ display:flex; justify-content:flex-end; }
        button{ padding:10px 16px; border-radius:8px; border:0; background:#111827; color:white; cursor:pointer; }
        .advisor{ margin-top:20px; padding:16px; border-radius:10px; background:#f8fafc; border:1px dashed #e2e8f0 }
        .toast{ margin-top:18px; padding:12px; border-radius:8px; background:#eef2ff; border:1px solid #c7d2fe }
      `}</style>
    </main>
  )
}