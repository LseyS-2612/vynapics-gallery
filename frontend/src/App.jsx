import { useState, useEffect } from 'react'
import axios from 'axios'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import './App.css'

// --- ALT BİLEŞEN: FOTOĞRAF KARTI ---
const PhotoCard = ({ photo, index, onOpenLightbox, onRate }) => {
  const [hoverStar, setHoverStar] = useState(0);

  return (
    <div className="photo-card">
      {/* Resim Alanı */}
      <div 
        className="image-container" 
        onClick={() => onOpenLightbox(index)}
      >
        <img src={photo.image} alt={photo.title} />
      </div>
      
      <div className="card-info">
        <h3>{photo.title}</h3>
        
        {/* Puanlama Alanı */}
        <div className="rating-area">
          <div className="buttons" onMouseLeave={() => setHoverStar(0)}>
            {[1, 2, 3, 4, 5].map(score => (
              <button 
                key={score} 
                onClick={(e) => {
                  e.stopPropagation(); 
                  onRate(photo.id, score);
                }}
                onMouseEnter={() => setHoverStar(score)}
                className={`rate-btn ${score <= hoverStar ? 'active-star' : ''}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

// --- ANA BİLEŞEN ---
function App() {
  const [photos, setPhotos] = useState([])
  const [index, setIndex] = useState(-1); // Lightbox kontrolü
  
  // YENİ: Arkaplan görseli için sayaç
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    fetchPhotos();
  }, [])

  // YENİ: Fotoğraflar yüklendikten sonra arkaplanı döndüren zamanlayıcı
  useEffect(() => {
    if (photos.length > 0) {
      const interval = setInterval(() => {
        // Bir sonrakine geç, sona geldiyse başa dön (modülo % işlemi)
        setBgIndex((prevIndex) => (prevIndex + 1) % photos.length);
      }, 8000); // Her 8 saniyede bir değiştir

      return () => clearInterval(interval); // Temizlik
    }
  }, [photos]); // photos değiştiğinde bu useEffect tekrar çalışsın

  const fetchPhotos = () => {
    axios.get('http://localhost:8000/api/photos/')
      .then(response => setPhotos(response.data))
      .catch(error => console.error("Hata:", error))
  }

  const handleRate = (photoId, score) => {
    axios.post('http://localhost:8000/api/rate/', {
      photo: photoId,
      score: score
    })
    .then(() => { 
      // Puan verdikten sonra belki bir bildirim gösterilebilir
      // Şimdilik sessizce kaydediyoruz.
    })
    .catch(() => alert("Hata oluştu."))
  }

  // Şu anki arkaplan görselini belirle (Yoksa boş string)
  const currentBgImage = photos.length > 0 ? photos[bgIndex].image : '';

  return (
    <>
      {/* --- YENİ: DİNAMİK ARKAPLAN KATMANLARI --- */}
      
      {/* Katman 1: Değişen Fotoğraf (En altta) */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: -2, // En arkaya gönder
        backgroundImage: `url(${currentBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out' // Yumuşak geçiş efekti
      }}></div>

      {/* Katman 2: Bulanıklık ve Karartma (GÜNCELLENDİ) */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: -1, 
        
        /* Karartmayı %70'ten %60'a çektim, resim biraz daha parlasın */
        background: 'rgba(0, 0, 0, 0.6)', 
        
        /* Bulanıklığı 25px'ten 8px'e düşürdüm. */
        backdropFilter: 'blur(8px)', 
        WebkitBackdropFilter: 'blur(8px)'
      }}></div>
      
      {/* --- ANA İÇERİK --- */}
      <div className="app-wrapper">
        {/* GÜNCELLENMİŞ HEADER */}
      <header className="glass-header">
        <div className="header-content">
          <h1>Vynapics Gallery</h1> 
          <p>Through My Lens</p> 

          {/* YENİ: Sosyal Medya İkonları */}
          <div className="social-links">
            {/* Instagram Butonu */}
            <a 
              href="https://www.instagram.com/vynapics" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn instagram"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Pinterest Butonu */}
            <a 
              href="https://tr.pinterest.com/vynapics" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn pinterest"
              aria-label="Pinterest"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
              </svg>
            </a>
          </div>

        </div>
      </header>

        <div className="container">
          <div className="gallery-grid">
            {photos.map((photo, i) => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                index={i} 
                onOpenLightbox={setIndex}
                onRate={handleRate}
              />
            ))}
          </div>

          <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={photos.map(p => ({ src: p.image }))}
          />

          {photos.length === 0 && <p className="loading-text">Sanat yükleniyor...</p>}
        </div>
        
        <footer>
          <p>© 2025 Vynapics. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}

export default App