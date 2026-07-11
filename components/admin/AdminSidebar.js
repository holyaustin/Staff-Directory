'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaChartBar, 
  FaUsers, 
  FaPlus, 
  FaBuilding, 
  FaList, 
  FaCog, 
  FaSignOutAlt,
  FaUserCog
} from 'react-icons/fa';

export default function AdminSidebar({ onLogout }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: FaChartBar },
    { href: '/admin/staff', label: 'Staff Management', icon: FaUsers },
    { href: '/admin/staff/new', label: 'Add Staff', icon: FaPlus },
    { href: '/admin/departments', label: 'Departments', icon: FaBuilding },
    { href: '/admin/audit', label: 'Audit Log', icon: FaList },
    { href: '/admin/settings', label: 'Settings', icon: FaCog },
  ];

  return (
    <div className="w-64 bg-poly-blue text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-blue-700">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-sm text-blue-300">Staff Directory</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'hover:bg-blue-700'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-blue-700">
        <div className="flex items-center space-x-3 mb-3 p-2 rounded-lg bg-blue-800">
          <div className="w-8 h-8 rounded-full bg-poly-gold flex items-center justify-center text-poly-blue font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-blue-300 truncate">admin@polyunwana.edu.ng</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-blue-700 transition-colors text-left"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}