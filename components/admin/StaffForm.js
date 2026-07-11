'use client';
import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function StaffForm({ 
  initialData = null, 
  onSubmit, 
  onCancel,
  isLoading = false 
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    officeLocation: '',
    jobTitle: '',
    departmentId: '',
    unitId: '',
    bio: '',
    qualifications: '',
    dateEmployed: '',
    isActive: true,
    isAdmin: false,
  });

  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDepartments();
    if (initialData) {
      setFormData({
        ...initialData,
        dateEmployed: initialData.dateEmployed?.split('T')[0] || ''
      });
    }
  }, [initialData]);

  const fetchDepartments = async () => {
    try {
      const res = await fetch('/api/departments');
      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      toast.error('Failed to load departments');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.departmentId) newErrors.departmentId = 'Department is required';
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          error={errors.firstName}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          error={errors.lastName}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          error={errors.email}
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          helper="Enter a valid phone number"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className={`
              w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-poly-blue
              ${errors.departmentId ? 'border-red-500' : 'border-gray-300'}
            `}
            required
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name} ({dept.code})
              </option>
            ))}
          </select>
          {errors.departmentId && (
            <p className="text-sm text-red-600 mt-1">{errors.departmentId}</p>
          )}
        </div>
        <Input
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
          error={errors.jobTitle}
          placeholder="e.g., Senior Lecturer"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Office Location"
          name="officeLocation"
          value={formData.officeLocation}
          onChange={handleChange}
          placeholder="e.g., Block A, Room 201"
        />
        <Input
          label="Date Employed"
          name="dateEmployed"
          type="date"
          value={formData.dateEmployed}
          onChange={handleChange}
        />
      </div>

      <div>
        <Input
          label="Qualifications"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          placeholder="e.g., PhD, MSc, BSc"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Biography
        </label>
        <textarea
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-poly-blue"
          placeholder="Brief biography of the staff member"
        />
      </div>

      <div className="flex items-center space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4 text-poly-blue focus:ring-poly-blue"
          />
          <span className="text-sm text-gray-700">Active</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
            className="w-4 h-4 text-poly-blue focus:ring-poly-blue"
          />
          <span className="text-sm text-gray-700">Admin Access</span>
        </label>
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Staff' : 'Add Staff'}
        </Button>
      </div>
    </form>
  );
}