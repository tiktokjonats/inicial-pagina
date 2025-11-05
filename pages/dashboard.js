import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'

export default function Dashboard() {
  const router = useRouter()
  const [auth, setAuth] = useState(null)
  const [userData, setUserData] = useState(null)
  const [phone, setPhone] = useState('948101462 - Efectivo')
  const [contactType, setContactType] = useState('')
  const [callResult, setCallResult] = useState('')
  const [obs, setObs] = useState('')
  const [accounts, setAccounts] = useState([
    { campaign: 'CS HIGH POTENCIAL AGOSTO 2025', product: 'Préstamo Personal', d_total: 9626, m_capital: 6976, m_campana: 3837, dias_mora: 1952, discount: '45%' }
  ])

  useEffect(()=>{
    const s = localStorage.getItem('auth')
    if (!s) return router.push('/')
    const parsed = JSON.parse(s)
    setAuth(parsed)
    // if it's a user, fetch user details from Supabase
    if (parsed.role === 'user' && parsed.user) {
      supabase.from('users').select('*').eq('dni', parsed.user).maybeSingle().then(res=>{
        if (res.data) setUserData(res.data)
      })
    }
  },[])

  if (!auth) return null

  return (
    <main className="page">
      <h1>Panel de Cobranza</h1>
      <div className="grid">
        <section className="card left">
          <div className="header"><h2>Ficha de Información</h2></div>
          <label>Tipo de Cliente
            <input value={userData?.org || 'Banco'} readOnly />
          </label>
          <label>Razón Social
            <input value={userData?.full_name?.toUpperCase() || 'GARCIA PEREZ RICHARD EMERSON'} readOnly />
          </label>
          <label>Documento
            <input value={userData?.dni || '08992480'} readOnly />
          </label>
          <label>Dirección
            <input value={'JR. WASHINGTON 1208 DPT 710'} readOnly />
          </label>
          <label>Edad
            <input value={'52 (Generación X)'} readOnly />
          </label>
          <label>Salario
            <input value={'1130'} readOnly />
          </label>
          <div className="chips">
            <span className="chip">Simulador de voz listo</span>
            <span className="chip">Esperando...</span>
          </div>
        </section>

        <section className="card right">
          <h2>Gestión de Contacto</h2>
          <label>Teléfonos
            <select value={phone} onChange={e=>setPhone(e.target.value)}>
              <option>948101462 - Efectivo</option>
              <option>987654321 - Tarjeta</option>
            </select>
          </label>
          <div className="row2">
            <label>Tipo de Contacto
              <select value={contactType} onChange={e=>setContactType(e.target.value)}>
                <option>-- Seleccionar --</option>
                <option>Llamada</option><option>WhatsApp</option>
              </select>
            </label>
            <label>Resultado de la Llamada
              <select value={callResult} onChange={e=>setCallResult(e.target.value)}>
                <option>-- Seleccionar Resultado --</option>
                <option>Pendiente</option><option>Contactado</option><option>No contesta</option>
              </select>
            </label>
          </div>
          <label>Observación
            <textarea value={obs} onChange={e=>setObs(e.target.value)} placeholder="Escribe tus observaciones..." />
          </label>
          <div className="buttons">
            <button className="btn ghost" onClick={()=>{ setPhone(''); setContactType(''); setCallResult(''); setObs('') }}>Limpiar</button>
            <button className="btn primary" onClick={()=>alert('Nueva llamada creada (simulado)')}>Nueva Llamada</button>
            <button className="btn" onClick={()=>alert('Ver Conversación (simulado)')}>Ver Conversación</button>
            <button className="btn purple" onClick={()=>alert('Ver Feedback (simulado)')}>Ver Feedback</button>
          </div>
        </section>
      </div>

      <section className="accounts">
        <h3>Detalle de la Cuenta</h3>
        <table>
          <thead>
            <tr>
              <th>Campaña</th><th>Producto</th><th>D. Total</th><th>M. Capital</th><th>M. Campaña</th><th>Días Mora</th><th>% Descuento</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((a,i)=>(
              <tr key={i}>
                <td>{a.campaign}</td>
                <td>{a.product}</td>
                <td>{a.d_total}</td>
                <td>{a.m_capital}</td>
                <td>{a.m_campana}</td>
                <td>{a.dias_mora}</td>
                <td>{a.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <style jsx>{`
        .page{ padding:28px 48px; font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto; background:#f7f7fb; min-height:100vh }
        h1{ font-size:24px; margin-bottom:14px }
        .grid{ display:flex; gap:20px }
        .card{ background:white; border-radius:10px; padding:18px; box-shadow:0 6px 18px rgba(12,12,12,0.04); flex:1 }
        .left{ max-width:520px; border-top:8px solid #9f7aea; }
        .header h2{ margin:0; color:white; background:linear-gradient(90deg,#7c3aed,#c084fc); padding:10px; border-radius:8px; margin:-18px -18px 12px -18px }
        label{ display:block; margin-bottom:10px; font-size:13px }
        input{ width:100%; padding:10px; border-radius:8px; border:1px solid #ececec; margin-top:6px }
        .chips{ display:flex; gap:10px; margin-top:8px }
        .chip{ background:#f3e8ff; padding:8px 12px; border-radius:999px; font-size:13px }
        .right h2{ margin-top:0 }
        .row2{ display:flex; gap:12px }
        select, textarea{ width:100%; padding:10px; border-radius:8px; border:1px solid #ececec; margin-top:6px }
        textarea{ min-height:100px; resize:vertical }
        .buttons{ display:flex; gap:12px; margin-top:12px }
        .btn{ padding:10px 14px; border-radius:8px; border:0; cursor:pointer; background:#eef2ff }
        .btn.ghost{ background:#f3f4f6 }
        .btn.primary{ background:#f59e0b; color:white }
        .btn.purple{ background:#7c3aed; color:white }
        .accounts{ margin-top:24px }
        table{ width:100%; border-collapse:separate; border-spacing:0 10px; background:linear-gradient(180deg,#fff,#fff); }
        th{ text-align:left; padding:10px 14px; font-weight:700; background:#f5f3ff; border-radius:8px 8px 0 0 }
        td{ background:white; padding:12px 14px; border:1px solid #efe7ff; border-left:4px solid #7c3aed }
      `}</style>
    </main>
  )
}