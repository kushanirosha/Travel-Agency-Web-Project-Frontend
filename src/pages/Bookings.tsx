import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BookingConfirmation from "../components/BookingConfirmation"
import { FaUser, FaEnvelope, FaPhone, FaUsers, FaCalendarAlt, FaRegCommentDots } from "react-icons/fa";

import ApiService from "../services/ApiService";


interface BookingsFormData {
  package: string;
  fullName: string;
  email: string;
  phone: string;
  travelers: string;
  departureDate: string;
  returnDate: string;
  specialRequests: string;
}

interface Package {
  _id: string;
  title: string;
  price: number;
}

interface BookingConfirmationData {
  packageId: string;
  packageName: string;
  name: string;
  email: string;
  phone: string;
  travelersCount: number;
  dateFrom: string;
  dateTo: string;
  specialRequests: string;
}

const Bookings: React.FC = () => {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingsFormData>({
    package: "",
    fullName: "",
    email: "",
    phone: "",
    travelers: "",
    departureDate: "",
    returnDate: "",
    specialRequests: "",
  });
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [bookingConfirmationData, setBookingConfirmationData] = useState<BookingConfirmationData | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await ApiService.getPackages();
        // console.log(res,);
        setPackages(res);
      } catch (err) {
        console.error("Error fetching packages", err);
      }
    };
    fetchPackages();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
    if (name === "package") {
      const selectedPackage = packages.find(pkg => pkg._id === value);
      if (selectedPackage) {
        setSelectedPackageId(selectedPackage._id);
        setFormData((prev) => ({ ...prev, [name]: selectedPackage.title }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try{
      const bookingData = {
        packageId: selectedPackageId,
        packageName: formData.package,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        travelersCount: parseInt(formData.travelers),
        dateFrom: formData.departureDate,
        dateTo: formData.returnDate,
        specialRequests: formData.specialRequests
      };
      
      console.log("Booking data:", bookingData);
      
      // Send data to backend API
      const response = await ApiService.createBooking(bookingData);
      
      console.log("Booking successful:", response.data);
      
      // Store the booking data for confirmation component
      setBookingConfirmationData(bookingData);
      setBookingSuccess(true);
      
    } catch(error){
      console.error("Booking failed:", error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <Layout>
      <div>
        <div className="w-full h-[75vh] relative">
          <img
          src="https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?cs=srgb&dl=pexels-asadphoto-457878.jpg&fm=jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
          <div className="absolute inset-0 flex flex-col text-white px-4 mt-90 ml-15">
            <h1 className="text-5xl font-bold font-serif drop-shadow-[0_0_1px_black]">
              Book Your Dream Journey</h1>
            <h3 className="mt-2 text-2xl font-serif drop-shadow-[0_0_1px_black]">
              Complete your booking in just a few simple steps and
              <br />
              get ready for an unforgettable adventure
            </h3>
          </div>
        </div>
      </div>
      
      {bookingSuccess ? (
        <BookingConfirmation bookingData={bookingConfirmationData} />
      ) : (
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 p-4">
          <div className="bg-white max-w-lg mx-auto p-6 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-2">Complete Your Booking</h1>
            <h3 className="text-gray-400">
              fill in your de below to reserve your perfact getaway
            </h3>
                
            <form onSubmit={handleBookingSubmit} className="space-y-5 mt-4"> 
              
              <div>
                <label className="block mb-1 font-medium">Select Package</label>
                <select
                  name="package"
                  value={selectedPackageId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose your travel package</option>
                  {packages.map((pkg) => (
                    <option key={pkg._id} value={pkg._id}>
                      {pkg.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Two-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium">
                    <FaUser /> Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium">
                    <FaEnvelope /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium">
                    <FaPhone /> Phone/Whatsapp
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium">
                    <FaUsers /> Number of Travelers
                  </label>
                  <input
                    type="number"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter travelers count"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium">
                    <FaCalendarAlt /> Departure Date
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 font-medium">
                    <FaCalendarAlt /> Return Date
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="flex items-center gap-2 mb-1 font-medium">
                  <FaRegCommentDots /> Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Any dietary requirements"
                  rows={3}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
                >
                  Complete booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Bookings;