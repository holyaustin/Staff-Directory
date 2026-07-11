'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTie, FaCalendar, FaGraduationCap, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { formatDate } from '@/lib/utils';

export default function StaffProfile() {
  const params = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, [params.id]);

  const fetchStaff = async () => {
    try {
      const res = await fetch(`/api/staff/${params.id}`);
      if (!res.ok) throw new Error('Staff not found');
      const data = await res.json();
      setStaff(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Staff not found</h3>
        <p className="text-gray-500">{error}</p>
        <Link href="/" className="mt-4 inline-block text-poly-blue hover:underline">
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-poly-blue hover:underline mb-6">
        <FaArrowLeft className="mr-2" />
        Back to Directory
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-poly-blue to-blue-700 p-8 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white/20 flex items-center justify-center text-5xl font-bold text-white flex-shrink-0 overflow-hidden">
              {staff.profilePic && staff.profilePic !== '/images/profiles/default.jpg' ? (
                <Image
                  src={staff.profilePic}
                  alt={`${staff.firstName} ${staff.lastName}`}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              ) : (
                <span>{staff.firstName?.[0]}{staff.lastName?.[0]}</span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{staff.firstName} {staff.lastName}</h1>
              <p className="text-blue-100 text-lg">{staff.jobTitle}</p>
              <p className="text-blue-200">{staff.departmentName}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="space-y-3">
                {staff.email && (
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="mr-3 text-poly-blue" />
                    <a href={`mailto:${staff.email}`} className="hover:text-poly-blue">{staff.email}</a>
                  </div>
                )}
                {staff.phone && (
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="mr-3 text-poly-blue" />
                    <a href={`tel:${staff.phone}`} className="hover:text-poly-blue">{staff.phone}</a>
                  </div>
                )}
                {staff.officeLocation && (
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-3 text-poly-blue" />
                    <span>{staff.officeLocation}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Details</h3>
              <div className="space-y-3">
                {staff.jobTitle && (
                  <div className="flex items-center text-gray-600">
                    <FaUserTie className="mr-3 text-poly-blue" />
                    <span>{staff.jobTitle}</span>
                  </div>
                )}
                {staff.departmentName && (
                  <div className="flex items-center text-gray-600">
                    <FaGraduationCap className="mr-3 text-poly-blue" />
                    <span>{staff.departmentName}</span>
                  </div>
                )}
                {staff.dateEmployed && (
                  <div className="flex items-center text-gray-600">
                    <FaCalendar className="mr-3 text-poly-blue" />
                    <span>Employed: {formatDate(staff.dateEmployed)}</span>
                  </div>
                )}
                {staff.qualifications && (
                  <div className="flex items-start text-gray-600">
                    <FaGraduationCap className="mr-3 text-poly-blue mt-1" />
                    <span>{staff.qualifications}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          {staff.bio && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Biography</h3>
              <p className="text-gray-600 leading-relaxed">{staff.bio}</p>
            </div>
          )}

          {/* Social Links */}
          {staff.socialLinks && Object.keys(staff.socialLinks).length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Connect</h3>
              <div className="flex space-x-4">
                {staff.socialLinks.linkedin && (
                  <a
                    href={staff.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-poly-blue hover:text-blue-700 transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
                {staff.socialLinks.twitter && (
                  <a
                    href={staff.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-poly-blue hover:text-blue-700 transition-colors"
                  >
                    <FaTwitter size={24} />
                  </a>
                )}
                {staff.socialLinks.googleScholar && (
                  <a
                    href={staff.socialLinks.googleScholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-poly-blue hover:text-blue-700 transition-colors"
                  >
                    <FaGlobe size={24} />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Admin Actions */}
          {staff.isAdmin && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href={`/admin/staff/${staff.id}/edit`}
                className="inline-flex items-center bg-poly-gold text-poly-blue px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
              >
                Edit Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}