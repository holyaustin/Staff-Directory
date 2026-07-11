'use client';
import Link from 'next/link';
import { FaEdit, FaTrash, FaEye, FaCheck, FaTimes } from 'react-icons/fa';

export default function StaffTable({ staff, onDelete, loading = false }) {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  if (!staff || staff.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-700">No staff found</h3>
        <p className="text-gray-500 mt-2">Start by adding your first staff member</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Department
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-poly-blue to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      {member.firstName?.[0]}{member.lastName?.[0]}
                    </div>
                    <Link 
                      href={`/staff/${member.id}`}
                      className="text-sm font-medium text-poly-blue hover:underline"
                    >
                      {member.firstName} {member.lastName}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {member.departmentName || 'N/A'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {member.jobTitle || 'N/A'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                  {member.email}
                </td>
                <td className="px-4 py-3">
                  <span className={`
                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                    ${member.isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                    }
                  `}>
                    {member.isActive ? (
                      <FaCheck className="mr-1" size={10} />
                    ) : (
                      <FaTimes className="mr-1" size={10} />
                    )}
                    {member.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/staff/${member.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Profile"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      href={`/admin/staff/${member.id}/edit`}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => onDelete(member.id, `${member.firstName} ${member.lastName}`)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}