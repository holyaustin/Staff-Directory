'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import StaffForm from '@/components/admin/StaffForm';
import toast from 'react-hot-toast';

export default function EditStaffPage() {
  const router = useRouter();
  const params = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch(`/api/staff/${params.id}`);
      if (!res.ok) throw new Error('Staff not found');
      const data = await res.json();
      setStaff(data);
    } catch (error) {
      toast.error(error.message);
      router.push('/admin/staff');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      const res = await fetch(`/api/staff/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Failed to update staff');

      toast.success('Staff updated successfully!');
      router.push('/admin/staff');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Staff</h1>
        <p className="text-gray-500">Update staff member information</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <StaffForm 
          initialData={staff} 
          onSubmit={handleSubmit} 
          onCancel={() => router.push('/admin/staff')} 
        />
      </div>
    </div>
  );
}