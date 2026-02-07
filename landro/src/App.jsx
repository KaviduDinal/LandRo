import { useState, useRef } from 'react'
import './App.css'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Landpage from './Components/Landpage'

function App() {
  const [view, setView] = useState(null) // null | 'login' | 'signup'
  const [user, setUser] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animClass, setAnimClass] = useState('')
  const pendingView = useRef(null)

  const startTransition = (target) => {
    if (isAnimating) return
    pendingView.current = target
    // choose direction: if going from login->signup use forward, else back
    const forward = (view === 'login' && target === 'signup') || (view === null && target === 'login')
    setAnimClass(forward ? 'flip-forward' : 'flip-back')
    setIsAnimating(true)
    // at half animation swap view (300ms)
    setTimeout(() => {
      setView(pendingView.current)
    }, 300)
    // clear at end
    setTimeout(() => {
      setIsAnimating(false)
      setAnimClass('')
      pendingView.current = null
    }, 600)
  }

  return (
    <div style={{padding:20}}>
      <header style={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap:12, marginBottom:20, width: '100%', position: 'sticky', top: 0, zIndex: 9999, background: '#fff', padding: '12px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}>
        <h1 style={{margin:0}}>LandRo</h1>
        <nav style={{marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center'}}>
          <button onClick={() => setView('login')} style={{padding: '10px 20px', fontSize: 16, borderRadius: 8, border: '1px solid transparent', background: 'transparent', color: '#1C4532', fontWeight: 700, cursor: 'pointer'}}>Login</button>
          <button onClick={() => setView('signup')} style={{padding: '10px 22px', fontSize: 16, borderRadius: 8, border: 'none', background: '#1C4532', color: '#fff', fontWeight: 700, cursor: 'pointer'}}>Sign up</button>
          <button onClick={() => { setView(null); setUser(null); }} style={{padding: '10px 20px', fontSize: 16, borderRadius: 8, border: '1px solid transparent', background: 'transparent', color: '#1C4532', fontWeight: 700, cursor: 'pointer'}}>Home</button>
        </nav>
      </header>

      <main>
        {user ? (
          <div>
            <h2>Welcome, {user.email}</h2>
          </div>
        ) : (
          <div className={`auth-flip-wrapper`}>
            <div className={`auth-flip-card ${animClass}`}>
              <div className="auth-view">
                {view === null && <Landpage onLogin={() => startTransition('login')} onSignup={() => startTransition('signup')} />}
                {view === 'login' && <Login onSuccess={(u) => setUser(u)} onSwitchToSignup={() => startTransition('signup')} />}
                {view === 'signup' && <Signup onSuccess={(u) => setUser(u)} onSwitchToLogin={() => startTransition('login')} />}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
