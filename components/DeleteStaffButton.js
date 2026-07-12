"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ConfirmModal";

export default function DeleteStaffButton({ staffId, staffName }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/staff/${staffId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete staff record.");
      router.push("/staff");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" className="btn-danger" onClick={() => setOpen(true)}>
        Delete Record
      </button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      <ConfirmModal
        open={open}
        title={`Delete ${staffName}?`}
        message="This will permanently remove the staff record from the directory. This action cannot be undone."
        confirmLabel="Delete"
        loading={loading}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
