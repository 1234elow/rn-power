"use client";

import { useState } from "react";

interface BookingFormProps {
  serviceName: string;
  servicePrice: number;
  serviceDuration: string;
  selectedDate: Date | null;
  selectedTime: string | null;
  onSubmit: (formData: FormData) => void;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function BookingForm({
  serviceName,
  servicePrice,
  serviceDuration,
  selectedDate,
  selectedTime,
  onSubmit,
}: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showDetails, setShowDetails] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const formatDate = () => {
    if (!selectedDate || !selectedTime) return "";
    return `${selectedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })} at ${selectedTime}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section - Takes 2 columns */}
      <div className="lg:col-span-2">
        <div className="glass-card rounded-3xl p-8">
          <h3 className="text-2xl font-serif text-gray-900 mb-2">Client Details</h3>
          <p className="text-sm text-gray-600 mb-6">
            Have an account?{" "}
            <button className="text-primary-600 hover:text-primary-700 underline">
              Log in
            </button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-700 text-sm">
                    🇺🇸 +1
                  </span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`flex-1 px-4 py-3 rounded-r-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    placeholder="(555) 123-4567"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add your message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder="Any additional information..."
              />
            </div>
          </form>
        </div>
      </div>

      {/* Booking Summary - Takes 1 column */}
      <div className="lg:col-span-1">
        <div className="glass-card rounded-3xl p-8 sticky top-8">
          <h3 className="text-xl font-serif text-gray-900 mb-4">Booking Details</h3>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">{serviceName}</p>
              <p className="text-sm text-gray-700">{formatDate()}</p>
            </div>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
            >
              More details
              <svg
                className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDetails && (
              <div className="pt-4 border-t border-gray-200 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="text-gray-900 font-medium">{serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="text-gray-900 font-medium">{serviceDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="text-gray-900 font-medium">${servicePrice}</span>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-600">Virtual therapy session via secure video conference</p>
                  <p className="text-gray-600 mt-1">Link will be sent via email prior to appointment</p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total</span>
              <span className="text-2xl font-bold text-gray-900">${servicePrice}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime}
            className={`w-full rounded-full px-6 py-3 font-medium transition-all ${
              selectedDate && selectedTime
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
