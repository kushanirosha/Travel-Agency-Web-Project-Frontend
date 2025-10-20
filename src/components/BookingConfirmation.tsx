import React from "react";
import { FaCheckCircle, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { MdOutlineTravelExplore, MdGroup, MdDateRange } from "react-icons/md";
import { FiFileText } from "react-icons/fi";

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

interface BookingConfirmationProps {
  bookingData?: BookingConfirmationData | null;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ bookingData }) => {
  // If no booking data is passed, show a generic confirmation
  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl max-w-xl w-full overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <FaCheckCircle className="text-green-500 text-3xl" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>
              <p className="text-gray-600 text-center mt-2">
                Your travel reservation has been successfully processed
              </p>
            </div>
          </div>
          <div className="p-6 text-center">
            <p className="text-gray-600">Thank you for your booking!</p>
          </div>
        </div>
      </div>
    );
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate duration in days
  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const duration = calculateDuration(bookingData.dateFrom, bookingData.dateTo);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-xl w-full overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <FaCheckCircle className="text-green-500 text-3xl" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>
            <p className="text-gray-600 text-center mt-2">
              Your travel reservation has been successfully processed
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* Booking Summary */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
            <h3 className="font-semibold text-gray-800">Booking Summary</h3>
            <p className="text-sm text-gray-600 mt-1">
              Please save this confirmation for your records
            </p>
          </div>

          {/* Package Details + Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center mb-2">
                <MdOutlineTravelExplore className="text-xl text-blue-600 mr-2" />
                <p className="font-semibold text-gray-800">Package Details</p>
              </div>
              <p className="text-sm font-medium text-gray-700 mt-2">
                {bookingData.packageName}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {duration} {duration === 1 ? 'Day' : 'Days'} Trip
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center mb-2">
                <MdDateRange className="text-xl text-blue-600 mr-2" />
                <p className="font-semibold text-gray-800">Travel Dates</p>
              </div>
              <p className="text-sm text-gray-700 mt-2">Departure: {formatDate(bookingData.dateFrom)}</p>
              <p className="text-sm text-gray-700">Return: {formatDate(bookingData.dateTo)}</p>
            </div>
          </div>

          {/* Contact Information + Group Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center mb-2">
                <FaUser className="text-xl text-blue-600 mr-2" />
                <p className="font-semibold text-gray-800">Contact Information</p>
              </div>
              <p className="text-sm text-gray-800 font-medium mt-2">{bookingData.name} (Primary Contact)</p>
              <div className="flex items-center text-sm text-blue-600 mt-1">
                <FaEnvelope className="mr-2" /> {bookingData.email}
              </div>
              <div className="flex items-center text-sm text-gray-700 mt-1">
                <FaPhone className="mr-2" /> {bookingData.phone}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center mb-2">
                <MdGroup className="text-xl text-blue-600 mr-2" />
                <p className="font-semibold text-gray-800">Group Details</p>
              </div>
              <div className="bg-blue-100 rounded-md px-3 py-2 inline-block mt-2 border border-blue-200">
                <span className="text-sm font-medium text-blue-800">
                  {bookingData.travelersCount} {bookingData.travelersCount === 1 ? 'Traveler' : 'Travelers'}
                </span>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {bookingData.specialRequests && (
            <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-200">
              <div className="flex items-center mb-2">
                <FiFileText className="text-xl text-blue-600 mr-2" />
                <p className="font-semibold text-gray-800">Special Requests</p>
              </div>
              <div className="bg-white rounded-md p-3 text-sm text-gray-700 mt-2 border border-gray-300">
                {bookingData.specialRequests}
              </div>
            </div>
          )}

          {/* What's Next */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <p className="font-semibold text-gray-800 mb-2">What's Next?</p>
            <div className="flex items-start mt-2">
              <span className="text-green-500 mr-2">✔</span>
              <p className="text-sm text-gray-700">You'll receive a confirmation email within 24 hours</p>
            </div>
            <div className="flex items-start mt-2">
              <span className="text-green-500 mr-2">✔</span>
              <p className="text-sm text-gray-700">Our team will contact you to finalize the details</p>
            </div>
            <div className="flex items-start mt-2">
              <span className="text-green-500 mr-2">✔</span>
              <p className="text-sm text-gray-700">You can modify your booking within 48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;