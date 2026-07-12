"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const emptyForm = {
  firstName: "",
  lastName: "",
  gender: "Male",
  email: "",
  phone: "",
  departmentId: "",
  facultyId: "",
  designationId: "",
  qualification: "",
  officeLocation: "",
  status: "Active",
  bio: "",
};

export default function StaffForm({ mode = "create", initialData, departments, faculties, designations }) {
  const router = useRouter();
  const [form, setForm] = useState({ ...emptyForm, ...initialData });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "departmentId") {
        const dep = departments.find((d) => d.id === value);
        next.facultyId = dep ? dep.facultyId : prev.facultyId;
      }
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const url = mode === "create" ? "/api/staff" : `/api/staff/${initialData.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please check the form and try again.");
      }
      const saved = await res.json();
      router.push(`/staff/${saved.id}`);
      router.refresh();
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  const filteredDepartments = form.facultyId
    ? departments.filter((d) => d.facultyId === form.facultyId)
    : departments;

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8 space-y-6">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <p className="eyebrow text-royal-600">Personal Information</p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="field-label" htmlFor="firstName">First name</label>
            <input id="firstName" name="firstName" required value={form.firstName} onChange={handleChange} className="input-base" />
          </div>
          <div>
            <label className="field-label" htmlFor="lastName">Last name</label>
            <input id="lastName" name="lastName" required value={form.lastName} onChange={handleChange} className="input-base" />
          </div>
          <div>
            <label className="field-label" htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={form.gender} onChange={handleChange} className="input-base">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="status">Employment status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange} className="input-base">
              <option>Active</option>
              <option>On Leave</option>
              <option>Retired</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <p className="eyebrow text-royal-600">Contact Details</p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="field-label" htmlFor="email">Email address</label>
            <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} className="input-base" />
          </div>
          <div>
            <label className="field-label" htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" required value={form.phone} onChange={handleChange} className="input-base" />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label" htmlFor="officeLocation">Office location</label>
            <input id="officeLocation" name="officeLocation" value={form.officeLocation} onChange={handleChange} className="input-base" />
          </div>
        </div>
      </div>

      <div>
        <p className="eyebrow text-royal-600">Appointment</p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="field-label" htmlFor="facultyId">School</label>
            <select id="facultyId" name="facultyId" required value={form.facultyId} onChange={handleChange} className="input-base">
              <option value="">Select school</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="departmentId">Department</label>
            <select id="departmentId" name="departmentId" required value={form.departmentId} onChange={handleChange} className="input-base">
              <option value="">Select department</option>
              {filteredDepartments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="designationId">Designation</label>
            <select id="designationId" name="designationId" required value={form.designationId} onChange={handleChange} className="input-base">
              <option value="">Select designation</option>
              {designations.map((d) => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="qualification">Highest qualification</label>
            <input id="qualification" name="qualification" value={form.qualification} onChange={handleChange} className="input-base" />
          </div>
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="bio">Short bio</label>
        <textarea id="bio" name="bio" rows={3} value={form.bio} onChange={handleChange} className="input-base" />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? "Saving…" : mode === "create" ? "Add Staff Member" : "Save Changes"}
        </button>
        <button type="button" className="btn-secondary" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </form>
  );
}
