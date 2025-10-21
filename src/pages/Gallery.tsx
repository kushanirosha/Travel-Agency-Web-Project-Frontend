import React, { useState, useEffect } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { FaEye } from "react-icons/fa";
import ApiService from "../services/ApiService";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // fetch gallery from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await ApiService.getGallery();
        if (data && data.data) {
          setGalleryItems(data.data);
        }
      } catch (err) {
        console.error("Failed to load gallery:", err);
      }
    };
    fetchGallery();
  }, []);

  // filter by tab
  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === "all") return true;
    return (
      (activeTab === "sri-lanka" &&
        item.country?.toLowerCase() === "sri lanka") ||
      (activeTab === "maldives" &&
        item.country?.toLowerCase() === "maldives")
    );
  });

  return (
    <>
      <Navbar />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "130px 0",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "sans-serif",
            color: "#01004bff",
            fontSize: 48,
            marginBottom: 20,
          }}
        >
          Explore Paradise in Pictures
        </h1>

        {/* Tabs */}
        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}
        >
          {["all", "sri-lanka", "maldives"].map((tab) => (
            <button
              key={tab}
              style={{
                background: activeTab === tab ? "#01004bff" : "#d9e2ff",
                color: activeTab === tab ? "#fff" : "#01004bff",
                border: "none",
                padding: "10px 32px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "all"
                ? "All"
                : tab === "sri-lanka"
                ? "Sri Lanka"
                : "Maldives"}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {filteredItems.map((item, idx) => {
            const imgSrc = item.image?.startsWith("http")
              ? item.image
              : `https://backend.paradisepeaktravels.com${item.image}`;

            return (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  border: "3px solid #e0e0e0",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={() => setHoveredItem(idx)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setSelectedImage(imgSrc)}
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src={imgSrc}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      borderBottom: "3px solid #e0e0e0",
                      transition: "transform 0.3s ease",
                      transform:
                        hoveredItem === idx ? "scale(1.05)" : "scale(1)",
                    }}
                  />

                  {/* Eye icon overlay */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        hoveredItem === idx
                          ? "rgba(1, 0, 75, 0.7)"
                          : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: hoveredItem === idx ? 1 : 0,
                      transition: "all 0.3s ease",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        background: "white",
                        padding: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      <FaEye color="#01004bff" size={24} />
                    </div>
                  </div>
                </div>

                <div style={{ padding: 16 }}>
                  <h3
                    style={{
                      margin: "0 0 8px",
                      fontWeight: "bold",
                      color: "#333",
                      fontSize: 18,
                    }}
                  >
                    {item.title}
                  </h3>
                  {item.location && (
                    <p style={{ margin: 0, color: "#666" }}>
                      Location: {item.location}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <img
            src={selectedImage}
            alt="enlarged"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              border: "5px solid white",
            }}
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Gallery;
