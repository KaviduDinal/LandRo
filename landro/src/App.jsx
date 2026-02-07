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
      <header style={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap:12, marginBottom:20, width: '100%'}}>
        <h1 style={{margin:0}}>LandRo</h1>
        <nav style={{marginLeft: 'auto', display: 'flex', gap: 12}}>
          <button onClick={() => setView('login')}>Login</button>
          <button onClick={() => setView('signup')}>Sign up</button>
          <button onClick={() => { setView(null); setUser(null); }}>Home</button>
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
