"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      let query = supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(b => b.payment_status === filter);

  const stats = {
    all: bookings.length,
    pending: bookings.filter(b => b.payment_status === 'pending').length,
    completed: bookings.filter(b => b.payment_status === 'completed').length,
    failed: bookings.filter(b => b.payment_status === 'failed').length,
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-serif text-gray-900 mb-8">Bookings</h1>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({stats.all})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-amber-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Completed ({stats.completed})
          </button>
          <button
            onClick={() => setFilter('failed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'failed'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Failed ({stats.failed})
          </button>
        </div>

        {/* Bookings Table */}
        <div className="glass-card rounded-2xl p-8">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No bookings found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Client</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Service</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Appointment</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Booked</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {booking.first_name} {booking.last_name}
                          </p>
                          <p className="text-xs text-gray-500">{booking.email}</p>
                          <p className="text-xs text-gray-500">{booking.phone}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-900">{booking.service_name}</p>
                        <p className="text-xs text-gray-500">{booking.service_duration}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-900">
                          {formatDate(booking.appointment_date)}
                        </p>
                        <p className="text-xs text-gray-500">{booking.appointment_time}</p>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        ${parseFloat(booking.service_price).toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            booking.payment_status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : booking.payment_status === 'pending'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {booking.payment_status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-500">
                        {formatDate(booking.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Additional Info */}
        {filteredBookings.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
