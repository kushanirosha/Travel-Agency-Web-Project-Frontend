import React from "react";

// Dummy responsive variables for demonstration. Replace with your own logic or hooks.
const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
const isSmallMobile = window.innerWidth <= 480;

const Lastsection: React.FC = () => {
  return (
    <div style={{ 
      backgroundImage: `
        linear-gradient(135deg, rgba(180, 180, 180, 0.28) 0%, rgba(180, 180, 180, 0.28) 100%),
        url('https://images.unsplash.com/photo-1643856555886-76dca68e5322?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "white",
      padding: isMobile ? "40px 15px" : isTablet ? "60px 20px" : "80px 20px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ position: "relative", zIndex: 2, maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ 
          fontSize: isSmallMobile ? "1.8rem" : isMobile ? "2.2rem" : "2.8rem", 
          fontWeight: "300", 
          marginBottom: "20px",
          lineHeight: "1.2",
          textShadow: "0 2px 4px rgba(0,0,0,0.5)"
        }}>
          Your Paradise Escape Awaits
        </h2>
        <h3 style={{ 
          fontSize: isSmallMobile ? "1.3rem" : isMobile ? "1.6rem" : "2rem", 
          fontWeight: "600", 
          marginBottom: "30px",
          textShadow: "0 2px 4px rgba(0,0,0,0.5)"
        }}>
          Book Your Experience Right Now
        </h3>
        <p style={{ 
          fontSize: "1.1rem", 
          opacity: "0.95", 
          marginBottom: "40px",
          lineHeight: "1.6",
          textShadow: "0 1px 3px rgba(0,0,0,0.5)"
        }}>
          Whether you're seeking a tranquil retreat or an active adventure, our team offers 
          an unmatched experience that will create memories to last a lifetime across Sri Lanka and the Maldives.
        </p>
        <button
          style={{
            background: "rgba(255,255,255,0.2)",
            color: "white",
            border: "2px solid white",
            padding: "15px 40px",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "#001279ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            e.currentTarget.style.color = "white";
          }}
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
};

export default Lastsection;