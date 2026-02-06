import React, { useState, useEffect, useRef } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "./firebase";
import Logor from '../assets/authassets/Logor.png'
import location from '../assets/authassets/location.png'
import Ellipse from '../assets/authassets/Ellipse1.png'
import GoogleIcon from '../assets/authassets/gooogle.png'
import FacebookIcon from '../assets/authassets/facebook (1).png'
import ImageCarousel from '../Components/ImageCarousel'

export default function Signup({ onSuccess, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);
      alert("Verification email sent! Please check inbox.");
      setEmail("");
      setPassword("");
      onSuccess && onSuccess(userCred.user)
    } catch (err) {
      console.error(err);
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const slides = [
    { id: 1, title: 'Discover Land', subtitle: 'Browse verified properties nearby', img: location },
    { id: 2, title: 'Trusted Listings', subtitle: 'Owners & agents you can rely on', img: Logor },
    { id: 3, title: 'Manage Easily', subtitle: 'Save favorites and contact owners', img: Logor }
  ]
  const [slideIndex, setSlideIndex] = useState(0)
  const intervalRef = useRef(null)
  useEffect(() => {
    intervalRef.current = setInterval(() => setSlideIndex(i => (i + 1) % slides.length), 3000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div style={{minHeight: '80vh', display: 'flex', borderRadius: 8, overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.06)'}}>
      <div style={{flex: 1, position: 'relative', background: '#1C4532', overflow: 'hidden', minHeight: 360}}>
        <img src={Ellipse} alt="ellipse" style={{position: 'absolute', right: -120, top: -120, width: 640, opacity: 0.22, filter: 'brightness(1.03) saturate(1.25)', mixBlendMode: 'screen'}} />
        <ImageCarousel />
        {/* See <attachments> above for file contents. You may not need to search or read the file again. */}
        <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 24, textAlign: 'center', color: '#fff'}}>
          <h3 style={{margin: 0, fontSize: 18, fontWeight: 700}}>Discover & Invest in Land with LandRo</h3>
        </div>
      </div>

      <div style={{flex: 1, background: '#F6FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48}}>
        <div style={{background: '#ffffff', padding: 32, borderRadius: 12, width: 420, boxShadow: '0 8px 30px rgba(20,20,20,0.06)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8}}>
            <img src={Logor} alt="Logo" style={{height: 28}} />
          </div>
          <h2 style={{marginTop: 8, marginBottom: 6, fontSize: 28, fontWeight: 700}}>Sign up</h2>

          <form onSubmit={handleRegister}>
            <div style={{marginBottom: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
              <label style={{margin: 0, fontSize: 13, marginBottom: 6, color: '#2d2f31'}}>E-mail</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={{width: '100%', boxSizing: 'border-box', padding: 10, paddingLeft: 12, borderRadius: 8, border: '1px solid #e6e9ed', textAlign: 'left', fontSize: 15}} />
            </div>
            <div style={{marginBottom: 12, display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
              <label style={{margin: 0, fontSize: 13, marginBottom: 6, color: '#2d2f31'}}>Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required style={{width: '100%', boxSizing: 'border-box', padding: 10, paddingLeft: 12, borderRadius: 8, border: '1px solid #e6e9ed', textAlign: 'left', fontSize: 15}} />
            </div>

            <button type="submit" disabled={loading} style={{width: '100%', padding: 12, borderRadius: 10, background: '#1C4532', color: '#fff', border: 'none', fontWeight: 600}}>{loading ? 'Registering...' : 'Create account'}</button>
            <p style={{color: '#6b6f76', marginTop: 12, fontSize: 14, textAlign: 'center'}}>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin && onSwitchToLogin(); }} style={{color: '#1C4532'}}>Log in</a></p>
          </form>

          <div style={{textAlign: 'center', marginTop: 16, color: '#9aa0a6'}}>or</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12}}>
            <button aria-label="Sign up with Google" style={{height: 44, width: '100%', borderRadius: 8, border: '1px solid #e6e9ed', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>
              <img src={GoogleIcon} alt="Google" style={{width: 20, height: 20}} />
              <span style={{fontSize: 14, fontWeight: 600, color: '#222'}}>Continue with Google</span>
            </button>
            <button aria-label="Sign up with Facebook" style={{height: 44, width: '100%', borderRadius: 8, border: '1px solid #e6e9ed', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>
              <img src={FacebookIcon} alt="Facebook" style={{width: 20, height: 20}} />
              <span style={{fontSize: 14, fontWeight: 600, color: '#222'}}>Continue with Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
