import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ApiService from "../services/ApiService";
import Index from "./Index";

const VerifySubscriber: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<string>("Checking...");
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const token = searchParams.get("token");
  const hasRun = useRef(false);

  useEffect(() => {
    const unsubscribeUser = async () => {
      if (!token) {
        setStatus("Invalid Subscribe link.");
        setLoading(false);
        setIsOpen(true);
        return;
      }

      try {
        const res = await ApiService.verifySubscribe(token);
        if (res) {
          setStatus(res.message || "You have been Subscribed successfully.");
        }
      } catch (err: any) {
        console.error("Error verifying:", err);
        const message =
          err.response?.data?.message ||
          "Something went wrong. Please try again.";
        setStatus(message);
      } finally {
        setLoading(false);
        setIsOpen(true);
      }
    };

    if (!hasRun.current) {
      unsubscribeUser();
      hasRun.current = true;
    }
  }, [token]);

  return (
    <>
      <Index />
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Subscribe</h2>
            <p className="text-gray-700 mb-6">
              {loading ? "Processing your request..." : status}
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-[#0D1164] text-white rounded hover:bg-[#0B0E50]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifySubscriber;
