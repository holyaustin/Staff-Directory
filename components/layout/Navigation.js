'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUsers, FaBuilding, FaCalendar, FaEnvelope, FaBook } from 'react-icons/fa';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: FaHome },
    { href: '/staff', label: 'Directory', icon: FaUsers },
    { href: '/departments', label: 'Departments', icon: FaBuilding },
    { href: '/academic-calendar', label: 'Calendar', icon: FaCalendar },
    { href: '/contact', label: 'Contact', icon: FaEnvelope },
    { href: '/library', label: 'Library', icon: FaBook },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`
              flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${isActive 
                ? 'bg-poly-gold text-poly-blue' 
                : 'text-white hover:bg-blue-700'
              }
            `}
          >
            <Icon size={16} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}