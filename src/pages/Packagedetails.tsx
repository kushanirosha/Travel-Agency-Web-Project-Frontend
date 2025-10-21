import React, { useState, useEffect } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { packageService, Package } from "../services/packageService";
import "../App.css";

const PackageDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [participants, setParticipants] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (slug) {
      loadPackage();
    }
  }, [slug]);

  const loadPackage = async () => {
    try {
      setLoading(true);
      const data = await packageService.getPackageBySlug(slug!);
      setPackageData(data);
      setError(null);
    } catch (err: any) {
      setError(err?.error || 'Package not found');
    } finally {
      setLoading(false);
    }
  };

  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    
    return {
      monthName: monthNames[currentMonth],
      year: currentYear,
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1)
    };
  };

  const formatPrice = (pkg: Package) => {
    const symbol = pkg.currency === 'USD' ? 'US$' : 'Rs.';
    return `${symbol}${pkg.price.toFixed(2)}`;
  };

  const getImageUrl = (imagePath?: string) => {
    if (imagePath) {
      return `https://backend.paradisepeaktravels.com${imagePath}`;
    }
    // Return null if no image path - let components handle no image case
    return null;
  };

  const getAllImages = () => {
    if (!packageData) return [];
    
    const images = [];
    
    // Add main image first
    if (packageData.mainImage) {
      const imageUrl = getImageUrl(packageData.mainImage);
      if (imageUrl) {
        images.push({
          url: imageUrl,
          alt: `${packageData.title} - Main Image`
        });
      }
    }
    
    // Add additional images from the images array
    if (packageData.images && packageData.images.length > 0) {
      packageData.images.forEach((img, index) => {
        if (img.url !== packageData.mainImage) { // Avoid duplicates
          const imageUrl = getImageUrl(img.url);
          if (imageUrl) {
            images.push({
              url: imageUrl,
              alt: img.alt || `${packageData.title} - Image ${index + 1}`
            });
          }
        }
      });
    }
    
    return images; // Return only valid uploaded images
  };

  if (loading) {
    return (
      <React.Fragment>
        <Navbar />
        <div style={{ maxWidth: 1200, margin: "120px auto", padding: 32, textAlign: "center" }}>
          <h1>Loading package details...</h1>
        </div>
        <Footer />
      </React.Fragment>
    );
  }

  if (error || !packageData) {
    return (
      <React.Fragment>
        <Navbar />
        <div style={{ maxWidth: 1200, margin: "120px auto", padding: 32, textAlign: "center" }}>
          <h1 style={{ color: "#ef4444" }}>Package Not Found</h1>
          <p style={{ color: "#666", margin: "16px 0" }}>
            {error || "The package you're looking for doesn't exist or has been removed."}
          </p>
          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate("/packages");
              }
            }}
            style={{ 
              background: "#000769ff", 
              color: "#fff", 
              border: "none", 
              padding: "10px 20px",
              cursor: "pointer" 
            }}
          >
            Back to Packages
          </button>
        </div>
        <Footer />
      </React.Fragment>
    );
  }

  const calendar = generateCalendarDays();
  const maxPeople = packageData.maxPeople || 10;

  return (
    <React.Fragment>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: "120px auto", background: "#fff", boxShadow: "0 2px 8px #eee", padding: 32 }}>
        
        <button
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/packages");
            }
          }}
          style={{ marginBottom: 20, padding: "8px 18px", background: "#eee", border: "none", cursor: "pointer", fontWeight: 500 }}
        >
          ← Back to Packages
        </button>
        
        {getAllImages().length > 0 ? (
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 24 }}>
            
            {/* Main image */}
            <div>
              <img 
                src={getAllImages()[0]?.url} 
                alt={getAllImages()[0]?.alt} 
                style={{ width: 550, height: 300, objectFit: "cover", boxShadow: "0 2px 8px #eee", cursor: "pointer" }} 
                onClick={() => setSelectedImageIndex(0)}
              />
            </div>
            
            {/* Additional images */}
            {getAllImages().length > 1 && (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(2, 250px)", 
                gridTemplateRows: `repeat(${Math.ceil((getAllImages().length - 1) / 2)}, 140px)`, 
                gap: 8 
              }}>
                {getAllImages().slice(1).map((image, index) => (
                  <img 
                    key={index}
                    src={image.url} 
                    alt={image.alt} 
                    style={{ width: 250, height: 140, objectFit: "cover", cursor: "pointer" }} 
                    onClick={() => setSelectedImageIndex(index + 1)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0", marginBottom: 24, color: "#666" }}>
            <p>No images available for this package</p>
          </div>
        )}
        
        <div style={{ color: "#888", fontSize: 14, marginBottom: 16 }}>{packageData.type}</div>
        
        <h2 style={{ fontWeight: 600, fontSize: 20, margin: "12px 0 8px 0", borderBottom: "3px solid #1a237e", display: "inline-block", paddingBottom: 2 }}>
          {packageData.title}
        </h2>
        
        <div style={{ display: "flex", gap: 32 }}>

          <div style={{ flex: 2 }}>
            {packageData.description && (
              <div style={{ marginBottom: 12 }}>
                <b>Description</b>
                <p style={{ marginTop: 6, lineHeight: 1.6 }}>{packageData.description}</p>
              </div>
            )}
            
            {packageData.highlights && packageData.highlights.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <b>KEY HIGHLIGHTS:</b>
                <ul style={{ marginTop: 6 }}>
                  {packageData.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {packageData.inclusions && packageData.inclusions.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <b>What's included?</b>
                <ul style={{ marginTop: 6 }}>
                  {packageData.inclusions.map((inclusion, index) => (
                    <li key={index}>{inclusion}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {packageData.exclusions && packageData.exclusions.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <b>What's excluded?</b>
                <ul style={{ marginTop: 6 }}>
                  {packageData.exclusions.map((exclusion, index) => (
                    <li key={index}>{exclusion}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div style={{ marginBottom: 12 }}>
              <b>Package Details</b>
              <ul style={{ marginTop: 6 }}>
                <li>Duration: {packageData.duration}</li>
                {packageData.maxPeople && <li>Maximum participants: {packageData.maxPeople} people</li>}
                {packageData.difficulty && <li>Difficulty level: {packageData.difficulty}</li>}
                {packageData.location && <li>Location: {packageData.location}</li>}
                <li>Category: {packageData.category}</li>
              </ul>
            </div>
            
            <div style={{ marginBottom: 12 }}>
              <b>Cancellation policy</b>
              <p style={{ marginTop: 6, color: "#666" }}>
                Please contact us for cancellation policy details. Terms and conditions apply.
              </p>
            </div>
          </div>
          
          <div style={{ flex: 1, background: "#fafbfc", padding: 20, boxShadow: "0 1px 4px #eee", height: "fit-content" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#000769ff", marginBottom: 16, textAlign: "center" }}>
              {formatPrice(packageData)}
              <span style={{ fontSize: 14, fontWeight: 400, color: "#666", display: "block" }}>
                {packageData.pricePerText || "per person"}
              </span>
            </div>
            
            <div style={{ fontWeight: 500, marginBottom: 12 }}>Participants</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <button 
                onClick={() => setParticipants(Math.max(1, participants - 1))} 
                style={{ padding: "6px 12px", background: "#eee", border: "none", cursor: "pointer" }}
              >
                -
              </button>
              <span style={{ minWidth: 100, textAlign: "center" }}>Adult: {participants}</span>
              <button 
                onClick={() => setParticipants(Math.min(maxPeople, participants + 1))} 
                style={{ padding: "6px 12px", background: "#eee", border: "none", cursor: "pointer" }}
              >
                +
              </button>
            </div>
            
            <div style={{ fontWeight: 500, marginBottom: 8 }}>Choose a date</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, marginBottom: 8, fontWeight: 500 }}>{calendar.monthName} {calendar.year}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                {calendar.days.map((day) => {
                  const dateString = `${calendar.year}-${String(calendar.monthName).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const isSelected = selectedDate === dateString;
                  return (
                    <button
                      key={day}
                      style={{
                        padding: "8px 4px",
                        background: isSelected ? "#003879ff" : "#fff",
                        color: isSelected ? "#fff" : "#333",
                        border: "1px solid #eee",
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                      onClick={() => setSelectedDate(dateString)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div style={{ marginBottom: 16, padding: 12, background: "#f0f8ff", borderRadius: 6, border: "1px solid #e0e8ff" }}>
              <div style={{ fontWeight: 500, marginBottom: 4 }}>Total Cost</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#000769ff" }}>
                {packageData.currency === 'USD' ? 'US$' : 'Rs.'}{(packageData.price * participants).toFixed(2)}
              </div>
              <div style={{ fontSize: 12, color: "#666" }}>
                {participants} × {formatPrice(packageData)}
              </div>
            </div>
            
            <button 
              style={{ 
                width: "100%", 
                background: "#01024dff", 
                color: "#fff", 
                padding: "12px 0", 
                border: "none", 
                fontWeight: 500, 
                fontSize: 16, 
                cursor: "pointer" 
              }}
              onClick={() => {
            
                alert(`Booking ${participants} participants for ${packageData.title} on ${selectedDate || 'selected date'}`);
              }}
            >
              Book Now
            </button>
            
            <div style={{ fontSize: 12, color: "#666", marginTop: 8, textAlign: "center" }}>
              Secure booking • No hidden fees
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {selectedImageIndex !== null && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setSelectedImageIndex(null)}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getAllImages()[selectedImageIndex]?.url}
              alt={getAllImages()[selectedImageIndex]?.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                maxWidth: '80vw',
                maxHeight: '80vh'
              }}
            />
            <button
              onClick={() => setSelectedImageIndex(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            
            {/* Navigation arrows */}
            {selectedImageIndex > 0 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                ‹
              </button>
            )}
            
            {selectedImageIndex < getAllImages().length - 1 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
      
      <Footer />
    </React.Fragment>
  );
};

export default PackageDetails;