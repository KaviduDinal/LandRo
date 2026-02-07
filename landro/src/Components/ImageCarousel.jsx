import React, { useEffect, useRef, useState } from 'react'
import p1 from '../assets/authassets/prices.jpg'
import p2 from '../assets/authassets/droneview.jpeg'
import p3 from '../assets/authassets/buylandfam.jpg'
import p4 from '../assets/authassets/devideland.png'

const slides = [
  { id: 1, img: p1, title: 'Affordable Prices' },
  { id: 2, img: p2, title: 'Aerial Views' },
  { id: 3, img: p3, title: 'Family Plots' },
  { id: 4, img: p4, title: 'Verified Listings' }
]

export default function ImageCarousel({ autoMs = 3500 }) {
  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % slides.length)
    }, autoMs)
    return () => clearInterval(intervalRef.current)
  }, [autoMs])

  return (
    <div style={{height: '100%', width: '100%', position: 'relative', boxSizing: 'border-box', padding: 24}}>
      <div style={{height: '100%', overflow: 'hidden', borderRadius: 14}}>
        <div
          style={{
            display: 'flex',
            width: `${slides.length * 100}%`,
            transform: `translateX(-${index * (100 / slides.length)}%)`,
            transition: 'transform 600ms ease'
          }}
        >
          {slides.map(s => (
            <div key={s.id} style={{flex: `0 0 ${100 / slides.length}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12}}>
              <div style={{width: '92%', borderRadius: 12, overflow: 'hidden', background: '#ffffff'}}>
                <img src={s.img} alt={s.title} style={{width: '100%', height: 220, objectFit: 'cover', display: 'block'}} />
                <div style={{padding: 12}}>
                  <div style={{fontSize: 16, fontWeight: 700, color: '#0b422f'}}>{s.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 12, display: 'flex', gap: 8}}>
        {slides.map((_, i) => (
          <div key={i} style={{width: 9, height: 9, borderRadius: 99, background: i === index ? '#fff' : 'rgba(255,255,255,0.35)'}} />
        ))}
      </div>
    </div>
  )
}
