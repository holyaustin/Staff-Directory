'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaUsers, 
  FaPlus, 
  FaHome, 
  FaCog, 
  FaSignOutAlt,
  FaChartBar,
  FaList,
  FaBuilding
} from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and is admin
    const token = document.cookie.includes('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-poly-blue text-white flex flex-col">
        <div className="p-6 border-b border-blue-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-blue-300">Staff Directory</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition-colors">
                <FaChartBar />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/staff" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition-colors">
                <FaUsers />
                <span>Staff Management</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/staff/new" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition-colors">
                <FaPlus />
                <span>Add Staff</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/departments" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition-colors">
                <FaBuilding />
                <span>Departments</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/audit" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition-colors">
                <FaList />
                <span>Audit Log</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700 transition-colors">
                <FaCog />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}