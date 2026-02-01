import { useState } from 'react'
import './App.css'
import Login from './assets/auth/Login'
import Signup from './assets/auth/Signup'

function App() {
  const [view, setView] = useState(null) // null | 'login' | 'signup'
  const [user, setUser] = useState(null)

  return (
    <div style={{padding:20}}>
      <header style={{display:'flex',gap:12,alignItems:'center',marginBottom:20}}>
        <h1>LandRo</h1>
        <nav>
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
        ) : view === 'login' ? (
          <Login onSuccess={(u) => setUser(u)} />
        ) : view === 'signup' ? (
          <Signup />
        ) : (
          <div>
            <p>Click Login or Sign up to open authentication UI.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
