import React from 'react'

export default function FloatingPhotos({ images = [] }) {
  const defaultImages = [
    '/Gemini_Generated_Image_k52qmck52qmck52q.png',
    '/couverture.png',
    '/logo.png',
    '/Gemini_Generated_Image_k52qmck52qmck52q.png',
    '/couverture.png',
  ]
  const imgs = images.length ? images : defaultImages

  return (
    <div className="floating-photos pointer-events-none" aria-hidden>
      {imgs.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`floating-photo fp-${(i % 6) + 1}`}
          style={{ animationDelay: `${i * 800}ms` }}
        />
      ))}
    </div>
  )
}
