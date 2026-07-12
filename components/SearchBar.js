"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchBar({ departments = [], faculties = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(searchParams.get("q") || "");

  function updateParams(next) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateParams({ q });
  }

  function handleReset() {
    setQ("");
    startTransition(() => {
      router.push(pathname);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-4 sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="q">Search by name or staff ID</label>
          <input
            id="q"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. Nwafor or AIFPU/SET/CPE/001"
            className="input-base"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="departmentId">Department</label>
          <select
            id="departmentId"
            className="input-base"
            defaultValue={searchParams.get("departmentId") || ""}
            onChange={(e) => updateParams({ departmentId: e.target.value })}
          >
            <option value="">All departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="facultyId">School</label>
          <select
            id="facultyId"
            className="input-base"
            defaultValue={searchParams.get("facultyId") || ""}
            onChange={(e) => updateParams({ facultyId: e.target.value })}
          >
            <option value="">All schools</option>
            {faculties.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button type="submit" className="btn-primary">
          {isPending ? "Searching…" : "Search"}
        </button>
        <button type="button" onClick={handleReset} className="btn-secondary">
          Reset filters
        </button>
      </div>
    </form>
  );
}
