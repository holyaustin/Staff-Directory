"use client";

export default function ConfirmModal({ open, title, message, confirmLabel = "Confirm", onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-ink/50" onClick={onCancel} aria-hidden="true" />
      <div className="relative card-surface w-full max-w-sm p-6">
        <p className="eyebrow text-royal-600">Confirm action</p>
        <h3 className="mt-2 font-display text-lg text-navy-800">{title}</h3>
        {message && <p className="mt-2 text-sm text-steel-600">{message}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className="btn-secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
