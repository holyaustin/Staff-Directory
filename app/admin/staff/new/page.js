'use client';
import { useRouter } from 'next/navigation';
import StaffForm from '@/components/admin/StaffForm';
import toast from 'react-hot-toast';

export default function NewStaffPage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Failed to create staff');

      toast.success('Staff created successfully!');
      router.push('/admin/staff');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Staff</h1>
        <p className="text-gray-500">Add a new staff member to the directory</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <StaffForm onSubmit={handleSubmit} onCancel={() => router.push('/admin/staff')} />
      </div>
    </div>
  );
}