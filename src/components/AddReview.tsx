import React, { useState } from "react";
import { FaStar, FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import ApiService from "../services/ApiService";

type Props = {
  onClose?: () => void;
};

const AddReview: React.FC<Props> = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    review: string;
    userName: string;
  }>({
    review: "",
    userName: "",
  });

  const [errors, setErrors] = useState({
    review: "",
    userName: "",
    rating: "",
  });

  const [generalError, setGeneralError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "userName" && value.trim()) {
      setErrors((prev) => ({ ...prev, userName: "" }));
    }
    if (name === "review" && value.trim()) {
      setErrors((prev) => ({ ...prev, review: "" }));
    }
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    if (value > 0) {
      setErrors((prev) => ({ ...prev, rating: "" }));
    }
  };

  const validate = () => {
    let valid = true;
    let tempErrors = { review: "", userName: "", rating: "" };

    if (!formData.userName.trim()) {
      tempErrors.userName = "Please enter your name to personalize your review.";
      valid = false;
    }

    if (!formData.review.trim()) {
      tempErrors.review = "We'd love to hear your thoughts. Please write your review!";
      valid = false;
    }

    if (rating === 0) {
      tempErrors.rating = "Please select a rating to share your experience.";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    if (validate()) {
      try {
        const userId = localStorage.getItem("userid");

        if (!userId) {
          setGeneralError("You must be logged in to submit a review.");
          return;
        }
        const reviewData = {
          ...formData,
          rating,
          userId,
        };
        await ApiService.createReview(reviewData);
        setSuccess(true);
        setFormData({ review: "", userName: "" });
        setRating(0);
      } catch (error: any) {
        setGeneralError(error.message || "Something went wrong. Please try again.");
      }
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto" style={{ padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 30px rgba(2,6,23,0.2)" }}>
          <div style={{ padding: 28, textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 84, height: 84, borderRadius: 42, background: "linear-gradient(135deg,#1B409F33,#23a6d533)", margin: "0 auto 16px" }}>
              <FaCheckCircle size={44} color="#40cc5cff" />
            </div>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0b1220" }}>Thanks — Review submitted successfully!</h3>
            <p style={{ marginTop: 8, color: "#556074" }}>
              We appreciate your feedback. It helps others plan better journeys.
            </p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
              <button
                onClick={() => {
                  if (onClose) onClose();
                }}
                style={{
                  padding: "8px 19px",
                  border: "none",
                  background: "#1B409F",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-t-2xl p-6 border-b border-white/20">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Share Your Experience</h2>
            <p className="text-blue-100 mt-2">Let others know about your journey with us</p>
          </div>
          <button
            aria-label="Close"
            onClick={() => onClose && onClose()}
            className="text-white text-xl p-2 rounded hover:bg-white/10"
            title="Close"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-b-2xl shadow-xl p-8">
        {generalError && (
          <div className="flex items-center justify-center bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md shadow-sm mb-6 animate-fade-in">
            <FaExclamationCircle className="mr-2 text-xl text-red-500" />
            <span className="font-medium">{generalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-3">
              How would you rate your experience?
            </label>
            <div className="flex space-x-3 text-3xl">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                  <label
                    key={i}
                    className="cursor-pointer transform hover:scale-110 transition-transform"
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={starValue}
                      className="hidden"
                      onClick={() => handleRatingChange(starValue)}
                    />
                    <FaStar
                      className={`${
                        starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-200"
                      } transition-colors duration-200`}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>
            {errors.rating && (
              <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                <FaExclamationCircle className="mr-1" />
                {errors.rating}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Review:</label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              rows={4}
              placeholder="Share your thoughts..."
              className="w-full border-2 border-gray-100 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
            {errors.review && (
              <div className="flex items-center mt-2 text-red-500 text-sm animate-fade-in">
                <FaExclamationCircle className="mr-1" />
                {errors.review}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full border-2 border-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {errors.userName && (
              <div className="flex items-center mt-1 text-red-500 text-sm animate-fade-in">
                <FaExclamationCircle className="mr-1" />
                {errors.userName}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => onClose && onClose()}
              className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium rounded-lg transition-colors curosr-pointer hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-0.2 text-sm bg-[#1B409F] hover:bg-[#163577] text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;