'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/ui/SearchBar';
import StaffCard from '@/components/ui/StaffCard';
import { FaUsers, FaBuilding, FaUserTie } from 'react-icons/fa';

// Create a separate component that uses useSearchParams
function HomeContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStaff();
    fetchStats();
  }, []);

  useEffect(() => {
    if (initialSearch) {
      handleSearch(initialSearch);
    }
  }, [initialSearch]);

  const fetchStaff = async (query = '') => {
    setLoading(true);
    try {
      const url = query 
        ? `/api/staff/search?q=${encodeURIComponent(query)}`
        : '/api/staff';
      const res = await fetch(url);
      const data = await res.json();
      setStaff(data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSearch = (query) => {
    fetchStaff(query);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-poly-blue to-blue-700 text-white rounded-2xl p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Staff Directory
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Akanu Ibiam Federal Polytechnic, Unwana
          </p>
          <SearchBar initialValue={initialSearch} onSearch={handleSearch} />
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUsers className="text-poly-blue text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Staff</p>
              <p className="text-2xl font-bold text-poly-blue">{stats.totalStaff}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FaBuilding className="text-green-600 text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Departments</p>
              <p className="text-2xl font-bold text-green-600">{stats.totalDepartments}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaUserTie className="text-purple-600 text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Staff</p>
              <p className="text-2xl font-bold text-purple-600">{stats.activeStaff}</p>
            </div>
          </div>
        </div>
      )}

      {/* Staff Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : staff.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <StaffCard key={member.id} staff={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No staff found</h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}

// Main page component with Suspense
export default function Home() {
  return (
    <Suspense fallback={
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-poly-blue mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}