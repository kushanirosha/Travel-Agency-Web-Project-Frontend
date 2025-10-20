import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { errorToastMsg, successMsg } from "../helpers/utils";
import { useTranslation } from "react-i18next";
function ContactUs() {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive breakpoints
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1024;
  const isSmallMobile = windowWidth <= 480;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      errorToastMsg("Please complete the CAPTCHA.");
      return;
    }

    setLoading(true);

    try {
      const contactData = {
        name: form.firstName,
        email: form.email,
        phone: form.phoneNumber,
        message: form.message,
        captcha: captchaToken,
      };

      const response = await ApiService.contact(contactData);
      if (response.success) {
        successMsg(response.message || "Message sent successfully!");
        setForm({
          firstName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
        setCaptchaToken(null);
      } else {
        errorToastMsg(response.message || "Failed to send message.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        errorToastMsg(err.response?.data?.message || "Something went wrong.");
      } else if (err instanceof Error) {
        errorToastMsg(err.message);
      } else {
        errorToastMsg("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const faqData = [
    {
      question: t("isAirportShuttleAvailable"),
      answer: t("airportShuttleAnswer"),
    },
    {
      question: t("retreatDistanceQuestion"),
      answer: t("retreatDistanceAnswer"),
    },
    { question: t("fitnessQuestion"), answer: t("fitnessAnswer") },
    { question: t("bookingQuestion"), answer: t("bookingAnswer") },
    { question: t("parkingQuestion"), answer: t("parkingAnswer") },
    { question: t("checkinQuestion"), answer: t("checkinAnswer") },
    { question: t("yachtQuestion"), answer: t("yachtAnswer") },
    { question: t("spaQuestion"), answer: t("spaAnswer") },
    { question: t("diningQuestion"), answer: t("diningAnswer") },
    { question: t("honeymoonQuestion"), answer: t("honeymoonAnswer") },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <Layout>
      <div
        style={{
          background: "#f8f9fa",
          minHeight: "100vh",
          paddingBottom: "0",
        }}
      >
        {/* Hero Contact Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              minHeight: isMobile ? "auto" : "135vh",
              maxWidth: "1600px",
              margin: "0 auto",
              alignItems: "center",
              gap: isMobile ? "0" : "0",
            }}
          >
            {/* Left Panel */}
            <div
              style={{
                flex: isMobile ? "none" : "1",
                width: isMobile ? "100%" : "auto",
                minHeight: isMobile ? "60vh" : "100vh",
                padding: isMobile
                  ? "40px 20px"
                  : isTablet
                  ? "40px 30px"
                  : "60px 40px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundImage: `
                linear-gradient(135deg, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.38) 100%),
                url('https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
              `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
              {/* Content wrapper */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <h1
                  style={{
                    fontSize: isSmallMobile
                      ? "2rem"
                      : isMobile
                      ? "2.5rem"
                      : isTablet
                      ? "3rem"
                      : "3.5rem",
                    fontWeight: "300",
                    marginBottom: isMobile ? "15px" : "20px",
                    lineHeight: "1.2",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  {t("YouHaveQuestions")},<br />
                  <span style={{ fontWeight: "600" }}>
                    {" "}
                    {t("YouHaveQuestions")}
                  </span>
                </h1>

                <p
                  style={{
                    fontSize: isSmallMobile ? "0.95rem" : "1.1rem",
                    opacity: "0.9",
                    marginBottom: isMobile ? "30px" : "40px",
                    lineHeight: "1.6",
                    maxWidth: isMobile ? "100%" : "500px",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  {t("DiscoverOpportunities")}
                </p>

                {/* Contact Info */}
                <div style={{ marginBottom: "40px" }}>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "600",
                      marginBottom: "20px",
                      color: "white",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {t("Location")}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: "500",
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                          }}
                        >
                          ABC Resort
                        </div>
                        <div
                          style={{
                            opacity: "0.8",
                            fontSize: "0.95rem",
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                          }}
                        >
                          123 Seaside Bay Road
                        </div>
                        <div
                          style={{
                            opacity: "0.8",
                            fontSize: "0.95rem",
                            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                          }}
                        >
                          Colombo, Sri Lanka 10230
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "25px",
                      fontSize: "0.95rem",
                      opacity: "0.8",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {t("OpeningHours")}
                    <br />
                    {t("SriLankaTime")}
                  </div>
                </div>

                {/* Social Media & Contact */}
                <div>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "600",
                      marginBottom: "20px",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {t("SocialMedia")}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      marginBottom: "25px",
                      justifyContent: isMobile ? "center" : "flex-start",
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        color: "white",
                        opacity: "0.8",
                        fontSize: "1.2rem",
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                      }}
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="#"
                      style={{
                        color: "white",
                        opacity: "0.8",
                        fontSize: "1.2rem",
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                      }}
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="#"
                      style={{
                        color: "white",
                        opacity: "0.8",
                        fontSize: "1.2rem",
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                      }}
                    >
                      <FaTwitter />
                    </a>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? "20px" : "40px",
                      fontSize: "1.1rem",
                    }}
                  >
                    <div style={{ flex: "1" }}>
                      <div
                        style={{
                          fontWeight: "600",
                          marginBottom: "8px",
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        }}
                      >
                        {" "}
                        {t("Email")}{" "}
                      </div>
                      <div
                        style={{
                          opacity: "0.9",
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        }}
                      >
                        info@paradisepeaktravels.com
                      </div>
                    </div>

                    <div style={{ flex: "1" }}>
                      <div
                        style={{
                          fontWeight: "600",
                          marginBottom: "8px",
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        }}
                      >
                        {t("contact")}
                      </div>
                      <div
                        style={{
                          opacity: "0.9",
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        }}
                      >
                        +94 11 7835 456
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div
              style={{
                flex: isMobile ? "none" : "1",
                width: isMobile ? "100%" : "auto",
                background: "white",
                minHeight: isMobile ? "auto" : "100vh",
                padding: isMobile
                  ? "40px 20px"
                  : isTablet
                  ? "40px 30px"
                  : "60px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ marginBottom: "30px" }}>
                <h2
                  style={{
                    fontSize: isSmallMobile ? "1.3rem" : "1.5rem",
                    fontWeight: "600",
                    color: "#2c3e50",
                    marginBottom: "8px",
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  {t("TellUsWhatYouNeed")}
                </h2>
                <p
                  style={{
                    color: "#666",
                    fontSize: "0.95rem",
                  }}
                >
                  {t("TeamAssistance")}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Name Field */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: "500",
                      color: "#2c3e50",
                      fontSize: "0.9rem",
                    }}
                  >
                    {t("Name")}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 15px",
                      border: "1px solid #e1e5e9",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                      background: "#f8f9fa",
                    }}
                    placeholder={t("YourName")}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: "500",
                      color: "#2c3e50",
                      fontSize: "0.9rem",
                    }}
                  >
                    {t("PhoneNumber")}
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 15px",
                      border: "1px solid #e1e5e9",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                      background: "#f8f9fa",
                    }}
                    placeholder={t("PhoneNumber")}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: "500",
                      color: "#2c3e50",
                      fontSize: "0.9rem",
                    }}
                  >
                    {t("EmailAddress")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 15px",
                      border: "1px solid #e1e5e9",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                      background: "#f8f9fa",
                    }}
                    placeholder={t("EmailAddress")}
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: "500",
                      color: "#2c3e50",
                      fontSize: "0.9rem",
                    }}
                  >
                    {t("Message")}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "12px 15px",
                      border: "1px solid #e1e5e9",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                      background: "#f8f9fa",
                      minHeight: "120px",
                      resize: "vertical",
                    }}
                    placeholder={t("TellUsMore")}
                    required
                  />
                </div>

                {/* CAPTCHA */}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? "#95a5a6" : "#0b006dff",
                    color: "white",
                    border: "none",
                    padding: "15px 30px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                    marginTop: "10px",
                  }}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          style={{
            background: "#ffffffff",
            padding: isMobile
              ? "40px 15px"
              : isTablet
              ? "60px 20px"
              : "80px 20px",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isSmallMobile
                  ? "1.8rem"
                  : isMobile
                  ? "2rem"
                  : "2.5rem",
                fontWeight: "600",
                color: "#03025fff",
                textAlign: "center",
                marginBottom: isMobile ? "30px" : "50px",
              }}
            >
              {t("FAQ")}
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  style={{
                    background: "white",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    style={{
                      width: "100%",
                      padding: isMobile ? "15px 20px" : "20px 25px",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: isSmallMobile ? "0.95rem" : "1.1rem",
                      fontWeight: "500",
                      color: "#2c3e50",
                    }}
                  >
                    <span>
                      {String(index + 1).padStart(2, "0")} &nbsp;&nbsp;{" "}
                      {faq.question}
                    </span>
                    {expandedFAQ === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>

                  {expandedFAQ === index && (
                    <div
                      style={{
                        padding: isMobile
                          ? "0 20px 20px 20px"
                          : "0 25px 25px 25px",
                        color: "#666",
                        lineHeight: "1.6",
                        borderTop: "1px solid #f1f3f4",
                      }}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundImage: `
            linear-gradient(135deg, rgba(180, 180, 180, 0.28) 0%, rgba(180, 180, 180, 0.28) 100%),
            url('https://images.unsplash.com/photo-1673253082952-4ba1b404e5ee?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
          `,

            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "white",
            padding: isMobile
              ? "40px 15px"
              : isTablet
              ? "60px 20px"
              : "80px 20px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontSize: isSmallMobile
                  ? "1.8rem"
                  : isMobile
                  ? "2.2rem"
                  : "2.8rem",
                fontWeight: "300",
                marginBottom: "20px",
                lineHeight: "1.2",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {t("YourParadiseEscapeAwaits")}
            </h2>
            <h3
              style={{
                fontSize: isSmallMobile
                  ? "1.3rem"
                  : isMobile
                  ? "1.6rem"
                  : "2rem",
                fontWeight: "600",
                marginBottom: "30px",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {t("BookYourExperienceRightNow")}
            </h3>
            <p
              style={{
                fontSize: "1.1rem",
                opacity: "0.95",
                marginBottom: "40px",
                lineHeight: "1.6",
                textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              {t("ExperienceDescription")}
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
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#001279ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "#001279ff";
              }}
            >
              {t("BOOK_NOW")}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
