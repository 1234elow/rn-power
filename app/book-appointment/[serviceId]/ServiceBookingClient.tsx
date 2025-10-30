"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import BookingCalendar from "@/components/BookingCalendar";
import BookingForm, { FormData } from "@/components/BookingForm";
import StripeCheckout from "@/components/checkout/StripeCheckout";

const services = {
  "virtual-therapy": {
    id: "virtual-therapy",
    name: "Virtual Therapy",
    description: "Therapy at your fingertips, from anywhere.",
    duration: "45 min",
    price: 90,
  },
  "individual-therapy": {
    id: "individual-therapy",
    name: "Individual Therapy",
    description: "Guiding you to a healthier tomorrow.",
    duration: "1 hr",
    price: 100,
  },
  "group-therapy": {
    id: "group-therapy",
    name: "Group Therapy",
    description: "Together we heal and grow.",
    duration: "1 hr",
    price: 75,
  },
  "family-therapy": {
    id: "family-therapy",
    name: "Family Therapy",
    description: "Healing together as a family unit.",
    duration: "1 hr",
    price: 80,
  },
};

export default function ServiceBookingClient() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.serviceId as string;
  const service = services[serviceId as keyof typeof services];

  const [step, setStep] = useState<"calendar" | "form" | "payment" | "confirmation">("calendar");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<FormData | null>(null);
  const [showCalendarDetails, setShowCalendarDetails] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900 mb-4">Service Not Found</h1>
          <Link
            href="/book-appointment"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            Return to booking page
          </Link>
        </div>
      </div>
    );
  }

  const handleSelectSlot = (date: Date, time: string) => {
    setSelectedDate(date);
    if (time) {
      setSelectedTime(time);
    }
  };

  const handleNextFromCalendar = () => {
    if (selectedDate && selectedTime) {
      setStep("form");
    }
  };

  const handleFormSubmit = (formData: FormData) => {
    setBookingData(formData);
    setStep("payment");
  };

  const handlePaymentSuccess = () => {
    setStep("confirmation");
  };

  const handleBackToServices = () => {
    router.push("/book-appointment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50">
      <div className="container-custom py-12">
        {/* Back Button */}
        {step !== "confirmation" && (
          <button
            onClick={() => {
              if (step === "calendar") {
                handleBackToServices();
              } else if (step === "form") {
                setStep("calendar");
              } else if (step === "payment") {
                setStep("form");
              }
            }}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}

        {/* Calendar Step */}
        {step === "calendar" && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-serif text-gradient mb-2">
                Schedule your service
              </h1>
              <p className="text-gray-600">
                Check out our availability and book the date and time that works for you
              </p>
            </div>

            <BookingCalendar
              onSelectSlot={handleSelectSlot}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />

            {/* Service Details Sidebar */}
            <div className="mt-8">
              <div className="glass-card rounded-3xl p-8 max-w-md">
                <h3 className="text-xl font-serif text-gray-900 mb-4">Service Details</h3>
                <p className="text-gray-700 mb-4">{service.name}</p>

                <button
                  onClick={() => setShowCalendarDetails(!showCalendarDetails)}
                  className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 mb-4"
                >
                  More details
                  <svg
                    className={`w-4 h-4 transition-transform ${showCalendarDetails ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showCalendarDetails && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="text-gray-900 font-medium">{service.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="text-gray-900 font-medium">{service.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-gray-900 font-medium">${service.price}</span>
                    </div>
                    <div className="pt-2 border-t border-blue-100">
                      <p className="text-gray-600">{service.description}</p>
                      <p className="text-gray-600 mt-1">Virtual session via secure video conference</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNextFromCalendar}
                  disabled={!selectedDate || !selectedTime}
                  className={`w-full rounded-full px-6 py-3 font-medium transition-all ${
                    selectedDate && selectedTime
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {/* Form Step */}
        {step === "form" && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-serif text-gradient mb-2">
                Booking Form
              </h1>
            </div>

            <BookingForm
              serviceName={service.name}
              servicePrice={service.price}
              serviceDuration={service.duration}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSubmit={handleFormSubmit}
            />
          </>
        )}

        {/* Payment Step */}
        {step === "payment" && bookingData && selectedDate && selectedTime && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-serif text-gradient mb-2">
                Checkout
              </h1>
              <p className="text-gray-600">Complete your payment to confirm your booking</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="lg:col-span-2">
                <div className="glass-card rounded-3xl p-8">
                  <h3 className="text-2xl font-serif text-gray-900 mb-6">Express Checkout</h3>
                  <StripeCheckout
                    amount={service.price}
                    bookingData={{
                      serviceId: service.id,
                      serviceName: service.name,
                      servicePrice: service.price,
                      serviceDuration: service.duration,
                      firstName: bookingData.firstName,
                      lastName: bookingData.lastName,
                      email: bookingData.email,
                      phone: bookingData.phone,
                      message: bookingData.message,
                      appointmentDate: selectedDate.toISOString().split('T')[0],
                      appointmentTime: selectedTime,
                    }}
                    onSuccess={handlePaymentSuccess}
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-card rounded-3xl p-8 sticky top-8">
                  <h3 className="text-xl font-serif text-gray-900 mb-4">Order Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Service</p>
                      <p className="font-medium text-gray-900">{service.name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Date & Time</p>
                      <p className="font-medium text-gray-900">
                        {selectedDate.toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-600">{selectedTime}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium text-gray-900">{service.duration}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Client</p>
                      <p className="font-medium text-gray-900">
                        {bookingData.firstName} {bookingData.lastName}
                      </p>
                      <p className="text-sm text-gray-600">{bookingData.email}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">${service.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Sales Tax</span>
                      <span className="text-gray-900">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-gray-200">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${service.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-4">
                    <p className="mb-2">🔒 Secure Checkout</p>
                    <p>Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Confirmation Step */}
        {step === "confirmation" && bookingData && (
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-3xl p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-3xl font-serif text-gray-900 mb-4">
                Payment Successful!
              </h2>

              <p className="text-gray-600 mb-8">
                Thank you, {bookingData.firstName}! Your payment has been processed and your appointment is confirmed.
              </p>

              <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">Appointment Details:</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Service:</strong> {service.name}</p>
                  <p>
                    <strong>Date & Time:</strong>{" "}
                    {selectedDate?.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}{" "}
                    at {selectedTime}
                  </p>
                  <p><strong>Duration:</strong> {service.duration}</p>
                  <p><strong>Price:</strong> ${service.price}</p>
                  <p><strong>Email:</strong> {bookingData.email}</p>
                  <p><strong>Phone:</strong> {bookingData.phone}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                A confirmation email has been sent to {bookingData.email} with all the details
                and a video conference link for your virtual session.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="glass-dark rounded-full px-8 py-3 text-primary-700 font-medium hover:bg-primary-100 transition-colors"
                >
                  Return Home
                </Link>
                <Link
                  href="/book-appointment"
                  className="bg-primary-500 text-white rounded-full px-8 py-3 font-medium hover:bg-primary-600 transition-colors"
                >
                  Book Another
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
