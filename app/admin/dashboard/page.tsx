"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Stats {
  totalBookings: number;
  pendingPayments: number;
  completedPayments: number;
  totalRevenue: number;
  recentBookings: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pendingPayments: 0,
    completedPayments: 0,
    totalRevenue: 0,
    recentBookings: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch bookings
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Calculate stats
      const totalBookings = bookings?.length || 0;
      const pendingPayments = bookings?.filter(b => b.payment_status === 'pending').length || 0;
      const completedPayments = bookings?.filter(b => b.payment_status === 'completed').length || 0;
      const totalRevenue = bookings
        ?.filter(b => b.payment_status === 'completed')
        .reduce((sum, b) => sum + parseFloat(b.service_price), 0) || 0;
      const recentBookings = bookings?.slice(0, 5) || [];

      setStats({
        totalBookings,
        pendingPayments,
        completedPayments,
        totalRevenue,
        recentBookings,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
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

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-serif text-gray-900 mb-8">Dashboard</h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading stats...</div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Bookings */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📅</span>
                  </div>
                </div>
              </div>

              {/* Pending Payments */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pending Payments</p>
                    <p className="text-3xl font-bold text-amber-600">{stats.pendingPayments}</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>
              </div>

              {/* Completed Payments */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Completed</p>
                    <p className="text-3xl font-bold text-green-600">{stats.completedPayments}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-gray-900">Recent Bookings</h2>
                <Link
                  href="/admin/bookings"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View all →
                </Link>
              </div>

              {stats.recentBookings.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No bookings yet. Bookings will appear here once customers start scheduling appointments.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Client</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Service</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {booking.first_name} {booking.last_name}
                              </p>
                              <p className="text-xs text-gray-500">{booking.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-700">{booking.service_name}</td>
                          <td className="py-4 px-4 text-sm text-gray-700">
                            {formatDate(booking.appointment_date)}
                          </td>
                          <td className="py-4 px-4 text-sm font-medium text-gray-900">
                            ${booking.service_price}
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
