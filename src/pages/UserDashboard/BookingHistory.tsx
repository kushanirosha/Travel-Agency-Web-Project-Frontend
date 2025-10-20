import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import axios from "axios";
import ApiService from "../../services/ApiService";

type Booking = {
  _id: string;
  packageId: string;
  packageName: string;
  name: string;
  email: string;
  phone: string;
  travelersCount: number;
  dateFrom: string;
  dateTo: string;
  specialRequests?: string;
  status: "New" | "Confirmed" | "Completed";
  bookedOn: string;
  createdAt: string;
};

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [UserData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [modifiedTravelersCount, setModifiedTravelersCount] = useState(1);
  const [modifiedDateFrom, setModifiedDateFrom] = useState("");
  const [modifiedDateTo, setModifiedDateTo] = useState("");
  const [modifiedSpecialRequests, setModifiedSpecialRequests] = useState("");

  useEffect(() => {
    ApiService.getUserDataById()
      .then((res) => setUserData(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!UserData?.email) return;

    const fetchBookings = async () => {
      try {
        const data = await ApiService.getBookingsByEmail(UserData.email);
        setBookings(data);
        setFilteredBookings(data);
      } catch (err) {
        console.error("Error fetching bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [UserData?.email]);

  // Filter bookings by package name
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter((booking) =>
        booking.packageName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
  }, [searchTerm, bookings]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleModifyClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setModifiedTravelersCount(booking.travelersCount);
    setModifiedDateFrom(booking.dateFrom.split("T")[0]);
    setModifiedDateTo(booking.dateTo.split("T")[0]);
    setModifiedSpecialRequests(booking.specialRequests || "");
    setIsModifyModalOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedBooking) return;

    try {
      // Update the booking with modified data
      const updatedBooking = {
        ...selectedBooking,
        travelersCount: modifiedTravelersCount,
        dateFrom: modifiedDateFrom,
        dateTo: modifiedDateTo,
        specialRequests: modifiedSpecialRequests,
      };

      // Call API to update booking
      await ApiService.updateBooking(selectedBooking._id, updatedBooking);

      // Update local state
      const updatedBookings = bookings.map((booking) =>
        booking._id === selectedBooking._id ? updatedBooking : booking
      );

      setBookings(updatedBookings);
      setFilteredBookings(updatedBookings);
      setIsModifyModalOpen(false);
      setSelectedBooking(null);
    }catch (err: any) {
  console.error("Error updating booking", err);

  const message =
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong while updating the booking.";

  alert(message);
}


  };

  const handleCancelModify = () => {
    setIsModifyModalOpen(false);
    setSelectedBooking(null);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 flex justify-center items-center min-h-[200px]">
          <div className="text-lg text-gray-600">
            Loading booking history...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking History</h1>
          <p className="text-gray-600 mt-2">
            View all your past and upcoming travel sessions
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by package name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {searchTerm && (
            <p className="text-sm text-gray-500 mt-2">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
          )}
        </div>

        {/* Bookings grid - 2 columns */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms"
                : "You don't have any bookings yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow h-full flex flex-col"
              >
                {/* Header with package name and status */}
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 pr-4">
                    {booking.packageName}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ${
                      booking.status === "New"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* Dates with calendar icon */}
                <div className="flex items-center text-gray-600 mb-4">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {formatDate(booking.dateFrom)} -{" "}
                    {formatDate(booking.dateTo)}
                  </span>
                </div>

                {/* Travelers and special requests */}
                <div className="space-y-2 mb-6 flex-grow">
                  {/* Travelers with person icon */}
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      {booking.travelersCount} Traveler
                      {booking.travelersCount !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Special requests with message icon */}
                  {booking.specialRequests && (
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      <span className="text-gray-600">
                        {booking.specialRequests}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer with booked date and modify button */}
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-gray-500 text-sm">
                    Booked on {formatDate(booking.createdAt)}
                  </span>
                  <button
                    onClick={() => handleModifyClick(booking)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors whitespace-nowrap"
                  >
                    Modify
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modify Booking Modal */}
        {isModifyModalOpen && selectedBooking && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-sm">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  Modify Booking
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {selectedBooking.packageName}
                </p>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Number of Travelers */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={modifiedTravelersCount}
                    onChange={(e) =>
                      setModifiedTravelersCount(parseInt(e.target.value))
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                <div className="border-t border-gray-200 my-3"></div>

                {/* Dates */}
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From date
                    </label>
                    <input
                      type="date"
                      value={modifiedDateFrom}
                      onChange={(e) => setModifiedDateFrom(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To date
                    </label>
                    <input
                      type="date"
                      value={modifiedDateTo}
                      onChange={(e) => setModifiedDateTo(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 my-3"></div>

                {/* Special Requests */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={modifiedSpecialRequests}
                    onChange={(e) => setModifiedSpecialRequests(e.target.value)}
                    placeholder="Any special request"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                    rows={2}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 flex justify-between">
                <button
                  onClick={handleCancelModify}
                  className="px-4 py-2 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookingHistory;