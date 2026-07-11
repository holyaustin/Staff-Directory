'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';

export default function StaffCard({ staff }) {
  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    officeLocation,
    jobTitle,
    departmentName,
    profilePic,
    bio
  } = staff;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-poly-blue to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {profilePic && profilePic !== '/images/profiles/default.jpg' ? (
                <Image
                  src={profilePic}
                  alt={`${firstName} ${lastName}`}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              ) : (
                <span>{firstName?.[0]}{lastName?.[0]}</span>
              )}
            </div>
          </div>

          {/* Staff Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/staff/${id}`}>
              <h3 className="text-lg font-semibold text-gray-800 hover:text-poly-blue transition-colors group-hover:text-poly-blue">
                {firstName} {lastName}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <FaUserTie className="mr-1 text-poly-gold" size={12} />
              <span>{jobTitle || 'Staff'}</span>
            </div>
            <div className="text-sm text-poly-blue font-medium mt-0.5">
              {departmentName || 'Department'}
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
          {email && (
            <div className="flex items-center text-sm text-gray-600 hover:text-poly-blue transition-colors">
              <FaEnvelope className="mr-2 text-gray-400 flex-shrink-0" size={14} />
              <a href={`mailto:${email}`} className="truncate">{email}</a>
            </div>
          )}
          {phone && (
            <div className="flex items-center text-sm text-gray-600 hover:text-poly-blue transition-colors">
              <FaPhone className="mr-2 text-gray-400 flex-shrink-0" size={14} />
              <a href={`tel:${phone}`}>{phone}</a>
            </div>
          )}
          {officeLocation && (
            <div className="flex items-center text-sm text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0" size={14} />
              <span className="truncate">{officeLocation}</span>
            </div>
          )}
        </div>

        {/* Bio Preview */}
        {bio && (
          <p className="mt-3 text-sm text-gray-500 line-clamp-2">
            {bio}
          </p>
        )}

        {/* View Profile Button */}
        <Link
          href={`/staff/${id}`}
          className="mt-4 w-full block text-center bg-poly-blue hover:bg-blue-800 text-white py-2 rounded-lg transition-colors text-sm font-medium"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}