import React, { useRef, useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import AddReview from "./AddReview";

type ReviewItem = {
  _id: string;
  review: string;
  rating: number;
  userName: string;
  email: string;
  createdAt?: string;
  status?: string;
};

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [testimonials, setTestimonials] = useState<ReviewItem[]>([]);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("https://backend.paradisepeaktravels.com/api/v1/reviews");
      if (!res.ok) return;
      const data: ReviewItem[] = await res.json();
      const approved = data.filter((r) => r.status === "Approved");
      setTestimonials(approved);
    } catch (err) {
      console.error("Error fetching testimonials", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    const interval = setInterval(fetchTestimonials, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let scrollAmount = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const minScroll = 0;
    const interval = setInterval(() => {
      if (!scrollContainer) return;
      scrollAmount -= 1.5;
      if (scrollAmount <= minScroll) {
        scrollAmount = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        scrollContainer.scrollTo({ left: scrollAmount, behavior: "auto" });
      } else {
        scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }, 30);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div style={{ background: "#ffffffff", padding: "40px 0", marginBottom: "1px" }}>
      <div style={{ textAlign: "center", marginBottom: "18px" }}>
        <h2 style={{ fontWeight: "700", fontSize: "2.3rem", marginBottom: "6px", color: "#0011adff" }}>
          Testimonials
        </h2>
        <p style={{ color: "#555", fontSize: "1.05rem", marginTop: "8px", marginBottom: "28px" }}>
          Don't take our word for it — hear from our partners.
        </p>
      </div>

      <div
        ref={scrollRef}
        style={{display: "flex",gap: 20,alignItems: "stretch",maxWidth: "1320px",margin: "0 auto",padding: "20px 12px",overflowX: "auto",scrollbarWidth: "none",}}
      >
        {testimonials.length === 0 && (
          <div style={{ color: "#6b7280", padding: 16 }}>No testimonials yet.</div>
        )}
        {testimonials.map((t, idx) => (
          <section
            key={t._id}
            aria-label={`Testimonial from ${t.userName}`}
            style={{
              minWidth: 300,
              maxWidth: 340,
              background: "#ffffff",
              boxShadow: "0 6px 20px rgba(2,6,23,0.08)",
              padding: 17,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              border: "1px solid rgba(11,17,34,0.04)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                height: 36,
                width: 6,
                borderRadius: 6,
                background:
                  idx % 2 === 0
                    ? "linear-gradient(180deg,#23a6d5,#1B409F)"
                    : "linear-gradient(180deg,#f39c12,#f56565)",
              }}
            />

            <div style={{ display: "flex", gap: 12, alignItems: "center", marginLeft: 20 }}>
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.userName)}&background=0D5EFF&color=fff&size=128`}
                alt={t.userName}
                style={{width: 45,height: 45,borderRadius: 5,objectFit: "cover",boxShadow: "0 4px 14px rgba(2,6,23,0.08)",border: "2px solid rgba(0,0,0,0.04)",}}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: "#0b1220" }}>{t.userName}</span>
                <span style={{ color: "#6b7280", fontSize: 12 }}>{t.email}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 20 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[...Array(5)].map((_, i) =>
                  i < t.rating ? (
                    <FaStar key={i} size={14} color="#f7b731" />
                  ) : (
                    <FaRegStar key={i} size={14} color="#d1d5db" />
                  )
                )}
              </div>
              <span style={{ color: "#6b7280", fontSize: 12 }}>{t.rating}.0</span>
            </div>

            <blockquote
              style={{marginLeft: 20,color: "#374151",fontSize: 14,lineHeight: 1.35,flex: 1,display: "-webkit-box",WebkitLineClamp: 3, WebkitBoxOrient: "vertical",overflow: "hidden",textOverflow: "ellipsis",}}
            >
              {t.review}
            </blockquote>
          </section>
        ))}
      </div>

      <div
        style={{maxWidth: "1320px",margin: "16px auto 0",display: "flex",justifyContent: "flex-end",paddingRight: 12,}}
      >
        <button
          onClick={() => setShowAddReview(true)}
          style={{background: "#000d83ff",color: "#fff",fontWeight: 600,border: "none",padding: "7px 9px",fontSize: "0.95rem",cursor: "pointer",}}
          aria-label="Write a review"
        >
          Write a review
        </button>
      </div>

      {showAddReview && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            padding: 20,
          }}
          onClick={() => setShowAddReview(false)}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 650, width: "100%", borderRadius: 8 }}>
            <AddReview onClose={() => setShowAddReview(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
