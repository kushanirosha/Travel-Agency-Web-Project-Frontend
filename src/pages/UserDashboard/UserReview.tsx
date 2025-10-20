import React, { useState, useEffect } from "react";
import { FaStar, FaCheckCircle, FaExclamationCircle, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import DashboardLayout from "./DashboardLayout";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

type Review = {
  _id?: string;
  userName: string;
  review: string;
  rating: number;
  createdAt?: string;
  status?: string;
};

const UserReviews: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    review: "",
    userName: "",
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    userName: "",
    review: "",
    rating: "",
  });
  const [success, setSuccess] = useState<boolean | null>(null);
  const [editReviewId, setEditReviewId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ review: "", rating: 0 });

  const navigate = useNavigate();

  const userId = localStorage.getItem("userid") || "";


  useEffect(() => {
    if (!userId) {
      setError("You must be logged in to view your reviews.");
      setTimeout(() => navigate("/login"), 2000);

    }
  }, [userId,navigate]);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    ApiService.getUserReviews(userId)
      .then((data: Review[]) => setReviews(data))
      .catch((err) => setError(err.message || "Failed to load your reviews."))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (value: number) => setRating(value);

  const validate = () => {
    let valid = true;
    let tempErrors = { userName: "", review: "", rating: "" };

    if (!formData.userName.trim()) {
      tempErrors.userName = "Please enter your name to personalize your review.";
      valid = false;
    }
    if (!formData.review.trim()) {
      tempErrors.review = "We'd love to hear your thoughts. Please write your review!";
      valid = false;
    }
    if (rating < 1 || rating > 5) {
      tempErrors.rating = "Please select a rating to share your experience.";
      valid = false;
    }
    setFieldErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userId) {
      setError("You must be logged in to submit a review.");
      return;
    }

    if (!validate()) return;

    try {
      setLoading(true);
      const reviewData = {
        ...formData,
        rating,
        userId,
      };
      const resp = await ApiService.createReview(reviewData);
      if (resp && resp.message && resp.review) {
        setFormData({ review: "", userName: "" });
        setRating(0);
        setFieldErrors({ userName: "", review: "", rating: "" });
        const data = await ApiService.getUserReviews(userId);
        setReviews(data);
        setSuccess(true);
      } else {
        setError(resp?.message || "Failed to submit review.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      setLoading(true);
      await ApiService.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err: any) {
      setError(err?.message || "Failed to delete review.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (review: Review) => {
    setEditReviewId(review._id || "");
    setEditForm({ review: review.review, rating: review.rating });
    setFieldErrors({ userName: "", review: "", rating: "" });
  };

  const cancelEdit = () => {
    setEditReviewId(null);
    setEditForm({ review: "", rating: 0 });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.review.trim()) {
      setFieldErrors((prev) => ({ ...prev, review: "Review cannot be empty." }));
      return;
    }
    if (editForm.rating < 1 || editForm.rating > 5) {
      setFieldErrors((prev) => ({ ...prev, rating: "Please select a rating." }));
      return;
    }
    try {
      setLoading(true);
      const resp = await ApiService.updateReview(editReviewId, {
        review: editForm.review,
        rating: editForm.rating,
        status: "Pending",
      });
      if (resp && resp.review) {
        setReviews((prev) =>
          prev.map((r) =>
            r._id === editReviewId
              ? { ...r, review: editForm.review, rating: editForm.rating, status: "Pending" }
              : r
          )
        );
        cancelEdit();
      } else {
        setError(resp?.message || "Failed to update review.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to update review.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <DashboardLayout>
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
                    setSuccess(null);
                  }}
                  style={{padding: "8px 19px",border: "none",background: "#1B409F",color: "#fff",cursor: "pointer",fontWeight: 600,}}
                  autoFocus
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-full mx-auto p-6 ">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-black">Your Reviews</h2>
            <p className="text-gray-500 mb-6 text-md">
              Share your experience from completed sessions
            </p>
          </div>
          
        </div>

        {error && (
          <div className="flex items-center justify-center bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md shadow-sm animate-fade-in mb-6">
            <FaExclamationCircle className="mr-2 text-xl text-red-500" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="border rounded-xl p-8 mb-10 bg-white shadow-md border-gray-200"
        >
          <div className="mb-6">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="userName">
              Name
            </label>
            <input
              id="userName"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full border rounded-lg p-3 border-gray-300 focus:ring-2 focus:ring-[#1B409F] outline-none"
              autoComplete="off"
            />
            {fieldErrors.userName && (
              <div className="flex items-center mt-1 text-red-500 text-sm animate-fade-in">
                <FaExclamationCircle className="mr-1" />
                {fieldErrors.userName}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 font-semibold mb-2">
              How would you rate your experience?
            </label>
            <div className="flex space-x-2 mb-1">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                  <FaStar
                    key={i}
                    className={`cursor-pointer text-2xl transition-colors duration-150 ${
                      starValue <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                    tabIndex={0}
                    aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
                  />
                );
              })}
            </div>
            {fieldErrors.rating && (
              <div className="flex items-center mt-1 text-red-500 text-sm animate-fade-in">
                <FaExclamationCircle className="mr-1" />
                {fieldErrors.rating}
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-gray-800 font-semibold mb-2" htmlFor="review">
              Your Review
            </label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full border rounded-lg p-3 border-gray-300 focus:ring-2 focus:ring-[#1B409F] outline-none resize-none"
            />
            {fieldErrors.review && (
              <div className="flex items-center mt-1 text-red-500 text-sm animate-fade-in">
                <FaExclamationCircle className="mr-1" />
                {fieldErrors.review}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#1B409F] text-white font-semibold rounded-lg hover:bg-blue-800 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        <h3 className="font-semibold text-lg mb-4 text-[#1B409F]">Your Reviews</h3>
        {loading && <div>Loading...</div>}
        <div className="space-y-4">
          {reviews.length === 0 && !loading && (
            <div className="text-gray-500">No reviews yet.</div>
          )}
          {reviews.map((r) =>
            editReviewId === r._id ? (
              <form
                key={r._id}
                onSubmit={handleEditSubmit}
                className="relative border rounded-lg p-5 bg-white shadow-sm border-blue-200 mb-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[#1B409F]">{r.userName}</span>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-red-500"
                    onClick={cancelEdit}
                    title="Cancel"
                    style={{ marginLeft: 8 }}
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="flex space-x-2 mb-2">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <FaStar
                        key={i}
                        className={`cursor-pointer text-2xl ${
                          starValue <= editForm.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setEditForm((f) => ({ ...f, rating: starValue }))}
                      />
                    );
                  })}
                </div>
                {fieldErrors.rating && (
                  <div className="flex items-center mt-1 text-red-500 text-sm animate-fade-in">
                    <FaExclamationCircle className="mr-1" />
                    {fieldErrors.rating}
                  </div>
                )}
                <textarea
                  value={editForm.review}
                  onChange={(e) => setEditForm((f) => ({ ...f, review: e.target.value }))}
                  rows={3}
                  className="w-full border rounded-md p-3 border-gray-300 mt-2"
                />
                {fieldErrors.review && (
                  <div className="flex items-center mt-1 text-red-500 text-sm animate-fade-in">
                    <FaExclamationCircle className="mr-1" />
                    {fieldErrors.review}
                  </div>
                )}
                <div className="flex justify-end space-x-2 mt-3">
                  <button
                    type="submit"
                    className="px-4 py-1 bg-[#1B409F] text-white font-medium rounded hover:bg-blue-800"
                    disabled={loading}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="px-4 py-1 bg-gray-200 text-gray-700 font-medium rounded hover:bg-gray-300"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <FaExclamationCircle className="inline mr-1" />
                  After editing, your review will be sent for admin approval.
                </div>
              </form>
            ) : (
              <div
                key={r._id}
                className="relative border rounded-lg p-5 bg-white shadow-sm border-gray-200 hover:shadow-md transition"
                style={{ paddingRight: 64 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-[#1B409F]">{r.userName}</p>
                    <span className="text-xs text-gray-500 block mt-1">
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <div className="flex space-x-2 ml-2 absolute top-5 right-5">
                    {r.status !== "Approved" && (
                      <button
                        className="text-blue-600 hover:text-blue-900 transition"
                        title="Edit"
                        onClick={() => startEdit(r)}
                        style={{background: "none",border: "none",padding: 0,cursor: "pointer",fontSize: 18,display: "flex",alignItems: "center",}}
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete"
                      onClick={() => handleDelete(r._id!)}
                      style={{background: "none",border: "none",padding: 0,cursor: "pointer",fontSize: 18,display: "flex",alignItems: "center",}}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="flex items-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <FaStar
                      key={j}
                      className={j < r.rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-1">{r.review}</p>
                {r.status && (
                  <span className="text-xs text-gray-500">
                    Status: {r.status}
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserReviews;
