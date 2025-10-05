import React, { useState, useEffect } from 'react'

const Hero = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      style={ {
        
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9f9f9",
        padding: "20px 20px",
        boxSizing: "border-box",
        overflowX: "hidden",
      } }
    >
      <div
        style={ {
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          width: "100%",
          textAlign: isMobile ? "center" : "left",
        } }
      >
        <div style={ { flex: 1, padding: "20px" } }>
          <div
            style={ {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: isMobile ? "center" : "flex-start",
            } }
          >
            <div style={ { width: "30px", height: "2px", background: "#414141" } }></div>
            <p style={ { fontSize: "14px", fontWeight: "500", color: "#414141" } }>
              OUR BESTSELLERS
            </p>
          </div>

          <h1
            style={ {
              fontSize: isMobile ? "32px" : "48px",
              margin: "20px 0",
              lineHeight: "1.3",
              color: "#222",
            } }
          >
            Latest Arrivals
          </h1>

          <div
            style={ {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: isMobile ? "center" : "flex-start",
            } }
          >
            <button
              style={ {
                background: "#414141",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              } }
            >
              SHOP NOW
            </button>
            { !isMobile && <div style={ { width: "30px", height: "1px", background: "#414141" } }></div> }
          </div>
        </div>

        <div
          style={ {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          } }
        >
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20210911/pngtree-happy-girl-on-a-shopping-spree-image_860818.jpg"
            alt="Hero"
            style={ {
              width: "100%",
              maxWidth: "450px",
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              objectFit: "cover",
            } }
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
