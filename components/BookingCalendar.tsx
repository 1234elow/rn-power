"use client";

import { useState } from "react";

interface BookingCalendarProps {
  onSelectSlot: (date: Date, time: string) => void;
  selectedDate: Date | null;
  selectedTime: string | null;
}

export default function BookingCalendar({
  onSelectSlot,
  selectedDate,
  selectedTime,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAllTimes, setShowAllTimes] = useState(false);

  // Mock available time slots
  const allTimeSlots = [
    "9:00 am", "9:30 am", "10:00 am", "10:30 am",
    "11:00 am", "11:30 am", "12:00 pm", "12:30 pm",
    "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm",
    "3:00 pm", "3:30 pm", "4:00 pm", "4:30 pm",
  ];

  const visibleTimeSlots = showAllTimes ? allTimeSlots : allTimeSlots.slice(0, 6);

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getCalendarDays();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Check if date has availability (mock: weekdays have availability, weekends don't)
  const hasAvailability = (date: Date | null) => {
    if (!date) return false;
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day !== 0 && day !== 6 && date >= today; // Weekdays only, not in past
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isPast = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date: Date) => {
    if (isPast(date)) return;
    onSelectSlot(date, "");
  };

  const handleTimeClick = (time: string) => {
    if (selectedDate) {
      onSelectSlot(selectedDate, time);
    }
  };

  const findNextAvailability = () => {
    if (!selectedDate) return;

    let nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);

    // Find next weekday
    while (nextDate.getDay() === 0 || nextDate.getDay() === 6) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    // Update month if necessary
    if (nextDate.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(new Date(nextDate.getFullYear(), nextDate.getMonth()));
    }

    onSelectSlot(nextDate, "");
  };

  const getAvailabilityText = () => {
    if (!selectedDate) return "";

    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long' });
    const date = selectedDate.getDate();

    if (hasAvailability(selectedDate)) {
      return `Availability for ${dayName}, ${monthName} ${date}`;
    } else {
      return `Availability for ${dayName}, ${monthName} ${date}\nNo availability`;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calendar Section */}
      <div className="glass-card rounded-3xl p-8">
        <h3 className="text-2xl font-serif text-gray-900 mb-4">
          Select a Date and Time
        </h3>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-primary-100 rounded-full transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-lg font-medium">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>

          <button
            onClick={nextMonth}
            className="p-2 hover:bg-primary-100 rounded-full transition-colors"
            aria-label="Next month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => (
            <button
              key={index}
              onClick={() => date && handleDateClick(date)}
              disabled={!date || isPast(date)}
              className={`
                aspect-square p-2 rounded-lg text-sm font-medium transition-all
                ${!date ? 'invisible' : ''}
                ${isPast(date) ? 'text-gray-300 cursor-not-allowed' : ''}
                ${isSelected(date) ? 'bg-primary-500 text-white scale-105' : ''}
                ${date && !isPast(date) && !isSelected(date) ? 'hover:bg-primary-100 text-gray-700' : ''}
              `}
            >
              {date?.getDate()}
            </button>
          ))}
        </div>

        {/* Availability Text */}
        {selectedDate && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {getAvailabilityText()}
            </p>
          </div>
        )}

        {/* No Availability Button */}
        {selectedDate && !hasAvailability(selectedDate) && (
          <button
            onClick={findNextAvailability}
            className="w-full mt-4 glass-dark rounded-full px-6 py-3 text-primary-700 font-medium hover:bg-primary-100 transition-colors"
          >
            Check Next Availability
          </button>
        )}
      </div>

      {/* Time Slots Section */}
      <div className="glass-card rounded-3xl p-8">
        <h3 className="text-2xl font-serif text-gray-900 mb-4">Available Times</h3>

        {selectedDate && hasAvailability(selectedDate) ? (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {visibleTimeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeClick(time)}
                  className={`
                    py-3 px-4 rounded-lg font-medium transition-all
                    ${selectedTime === time
                      ? 'bg-primary-500 text-white scale-105'
                      : 'glass-dark hover:bg-primary-100 text-gray-700'
                    }
                  `}
                >
                  {time}
                </button>
              ))}
            </div>

            {!showAllTimes && (
              <button
                onClick={() => setShowAllTimes(true)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium underline"
              >
                Show all sessions
              </button>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center py-8">
            {selectedDate
              ? "No times available for this date"
              : "Please select a date to see available times"}
          </p>
        )}
      </div>
    </div>
  );
}
