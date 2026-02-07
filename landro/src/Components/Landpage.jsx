
import React from 'react'
// ImageCarousel removed from landing page to disable animation

export default function Landpage({ onLogin, onSignup }) {
	return (
		<div style={{minHeight: 420, display: 'flex', borderRadius: 8, overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.06)'}}>
			<div style={{flex: 1, position: 'relative', background: '#1C4532', overflow: 'hidden', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24}}>
				<div style={{textAlign: 'center'}}>
					<h3 style={{margin: 0, fontSize: 24}}>Discover Land</h3>
					<p style={{marginTop: 8, opacity: 0.9}}>Browse verified properties nearby</p>
				</div>
			</div>

			<div style={{flex: 1, padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12}}>
				<h2 style={{margin: 0}}>Welcome to LandRo</h2>
				<p>This is the landing page. You can log in or sign up to continue.</p>
				<div style={{display:'flex',gap:12,marginTop:12}}>
					<button onClick={() => { console.log('Landpage: Login clicked'); onLogin && onLogin(); }}>Login</button>
					<button onClick={() => { console.log('Landpage: Signup clicked'); onSignup && onSignup(); }}>Sign up</button>
				</div>
			</div>
		</div>
	)
}

