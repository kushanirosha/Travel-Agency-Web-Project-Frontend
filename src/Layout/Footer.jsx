import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import ApiService from "../services/ApiService";
import axios from "axios";
import "../index.css";
const Footer = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubscriber = async (e) => {
    e.preventDefault();

    try {
      const subcriberData = await ApiService.createSubscriber(email);
      if (subcriberData) {
        setSuccess(subcriberData.message);
      } else {
        setError(subcriberData.message);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.message);
        // Axios error
        setError(err.response?.message || "Please verify your email first.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }

      setTimeout(() => setError(""), 5000);
    }
  };
  return (
    <footer className="bg-[#F5EFE6] border-t border-gray-200 pt-10 pb-4 px-4 md:px-16 text-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-3">
              Useful Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/packages" className="hover:underline">
                  Packages
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:underline">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-3">
              Contact Info
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Email: info@paradisepeak.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Phone: +1 (234) 567-890
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Address: Colombo, Sri Lanka Addu, Maldives
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Subscribe
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg text-blue-900 mb-3">Subscribe</h3>
            {error && (
              <p className="text-red-600 font-semibold mb-2">{error}</p>
            )}
            {success && (
              <p className="text-green-600 font-semibold mb-2">{success}</p>
            )}
            <p className="mb-2">Join our community to receive updates</p>
            <form className="flex mb-2" onSubmit={handleSubscriber}>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail({ email: e.target.value })}
                className=" px-4 py-2 border border-gray-300 focus:outline-none focus:ring-blue-400 w-full max-w-xs"
              />
              <button
                type="submit"
                className=" bg-blue-900 text-white px-6 py-2 font-semibold hover:bg-blue-800"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="mb-4 md:mb-0">
            <span className="text-3xl font-bold text-blue-900">
              Paradisepeak Travels.
            </span>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-blue-900 hover:text-blue-700 text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-blue-900 hover:text-blue-700 text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-blue-900 hover:text-blue-700 text-xl"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500">
          <div className="flex space-x-4 mb-2 md:mb-0">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Cookie Policy
            </a>
          </div>
          <div>&copy; 2025 Paradisepeak Travels. All rights reserved</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
