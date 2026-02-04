
import React from 'react'

export default function Landpage({ onLogin, onSignup }) {
	return (
		<div style={{maxWidth:720}}>
			<h2>Welcome to LandRo</h2>
			<p>This is the landing page. You can log in or sign up to continue.</p>
			<div style={{display:'flex',gap:12,marginTop:12}}>
				<button onClick={() => { console.log('Landpage: Login clicked'); onLogin && onLogin(); }}>Login</button>
				<button onClick={() => { console.log('Landpage: Signup clicked'); onSignup && onSignup(); }}>Sign up</button>
			</div>
		</div>
	)
}

