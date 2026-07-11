'use client';
import { useState, useEffect } from 'react';
import { FaUsers, FaBuilding, FaUserTie, FaUserPlus } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentStaff, setRecentStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, staffRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/staff')
      ]);
      
      const statsData = await statsRes.json();
      const staffData = await staffRes.json();
      
      setStats(statsData);
      setRecentStaff(staffData.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome to the Staff Directory Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Staff</p>
              <p className="text-2xl font-bold text-poly-blue">{stats?.totalStaff || 0}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUsers className="text-poly-blue text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Staff</p>
              <p className="text-2xl font-bold text-green-600">{stats?.activeStaff || 0}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaUserTie className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Departments</p>
              <p className="text-2xl font-bold text-purple-600">{stats?.totalDepartments || 0}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FaBuilding className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Admin Users</p>
              <p className="text-2xl font-bold text-orange-600">{stats?.totalUsers || 0}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <FaUserPlus className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Staff */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Staff</h2>
          <Link href="/admin/staff" className="text-poly-blue hover:underline text-sm">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Department</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <Link href={`/staff/${staff.id}`} className="text-poly-blue hover:underline">
                      {staff.firstName} {staff.lastName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{staff.departmentName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{staff.jobTitle}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{staff.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}