import React, { useState } from "react";
import ApiService from "../services/ApiService";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
const Contact = () => {
  const { t } = useTranslation();
  const [type, setType] = useState("General");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phonenumber: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const handleCaptcha = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setError("Please complete the CAPTCHA.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const contactData = {
        ...values,
        captcha: captchaToken,
      };
      const response = await ApiService.contact(contactData);
      setSuccess(response.message);
      setTimeout(() => setSuccess(""), 5000);
      //   navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "80vh", padding: "40px 0" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "32px",
        }}
      >
        <div
          style={{ flex: "1 1 420px", minWidth: "320px", padding: "24px 0" }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "2.4rem",
              marginBottom: "12px",
              color: "#000a91ff",
            }}
          >
            Not sure where to go?
            <br />
            <p style={{ fontSize: "1rem", color: "#666" }}>
              Get some inspiration from our travel themes.
            </p>
          </h2>
          <div
            style={{
              color: "#666",
              fontSize: "1.08rem",
              marginBottom: "32px",
              maxWidth: "420px",
            }}
          >
            Our website is designed to help you find what you need to book a
            great trip. If you can't find what you're looking for, let us know.
          </div>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <div>
              <div
                style={{ fontWeight: 600, marginBottom: "6px", color: "#222" }}
              >
                Location
              </div>
              <div style={{ color: "#444", fontSize: "0.98rem" }}>
                Colombo, Sri Lanka
                <br />
                Addu, Maldives
                <br />
              </div>
            </div>
            <div>
              <div
                style={{ fontWeight: 600, marginBottom: "6px", color: "#222" }}
              >
                Social Media
              </div>
              <div style={{ color: "#444", fontSize: "0.98rem" }}>
                Instagram
                <br />
                Facebook
                <br />
              </div>
            </div>
          </div>
          <div
            style={{ marginTop: "24px", color: "#444", fontSize: "0.98rem" }}
          >
            <div>
              <span style={{ fontWeight: 600 }}>Email</span>
              <br />
              colombodivers@gmail.com
            </div>
            <div style={{ marginTop: "10px" }}>
              <span style={{ fontWeight: 600 }}>Contact</span>
              <br />
              +00 9478 5623 023
            </div>
          </div>
        </div>

        <div
          style={{
            flex: "1 1 480px",
            minWidth: "340px",
            background: "#fafbfc",
            boxShadow: "0 2px 24px rgba(0,0,0,0.08)",
            padding: "32px 32px 24px 32px",
            maxWidth: "480px",
          }}
        >
          <h3
            style={{
              fontWeight: 700,
              fontSize: "1.35rem",
              marginBottom: "8px",
              color: "#222",
            }}
          >
            {error && (
              <p className="text-red-600 font-semibold mb-2">{error}</p>
            )}
            {success && (
              <p className="text-green-600 font-semibold mb-2">{success}</p>
            )}
            Tell Us What You Need
          </h3>
          <div
            style={{ color: "#666", fontSize: "1rem", marginBottom: "18px" }}
          >
            Our team is ready to assist you with every detail, big or small.
          </div>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            onSubmit={handleSubmit}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <input
                type="text"
                placeholder="Name"
                style={inputStyle}
                required
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <input
                type="text"
                placeholder="Phone Number"
                style={inputStyle}
                required
                onChange={(e) =>
                  setValues({ ...values, phonenumber: e.target.value })
                }
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              style={{ ...inputStyle, width: "100%" }}
              required
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />

            <textarea
              placeholder="Message"
              rows={4}
              style={{ ...inputStyle, resize: "vertical", width: "100%" }}
              onChange={(e) =>
                setValues({ ...values, message: e.target.value })
              }
              required
            />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                id="offers"
                style={{ accentColor: "#2176ff" }}
              />
              <label
                htmlFor="offers"
                style={{ color: "#444", fontSize: "0.98rem" }}
              >
                I'd like to receive exclusive offers and updates
              </label>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <ReCAPTCHA
                sitekey="6LdOddgrAAAAABkF1ofe5TSUTK5RkMM-t7dH5Dhn"
                onChange={handleCaptcha}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#95a5a6" : "#00137eff",
                color: "#fff",
                padding: "12px 0",
                fontWeight: "bold",
                fontSize: "1.08rem",
                marginTop: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                width: "100%",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending..." : "Submit"}
              {/* Submit */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px 16px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  background: "#fff",
  width: "100%",
  outline: "none",
};

export default Contact;
