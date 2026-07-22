import { useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";

const toggleOptions = [
  { key: "emailReservations", label: "Email me about reservation updates" },
  { key: "emailPromos", label: "Email me about promotions & offers" },
  { key: "smsReminders", label: "SMS reminders before my reservation" },
  { key: "pushNotifications", label: "Push notifications" },
];

export function CustomerSettings() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    emailReservations: true,
    emailPromos: false,
    smsReminders: true,
    pushNotifications: true,
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Settings</h1>
      <p className="mt-1 text-text-muted">Manage your notification and account preferences.</p>

      <div className="mt-6 rounded-2xl border border-border bg-surface-raised p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-semibold text-text">Notification Preferences</h2>
        <div className="space-y-3">
          {toggleOptions.map((opt) => (
            <label key={opt.key} className="flex cursor-pointer items-center justify-between rounded-xl border border-border px-4 py-3">
              <span className="text-sm text-text-muted">{opt.label}</span>
              <input
                type="checkbox"
                checked={prefs[opt.key]}
                onChange={(e) => setPrefs((p) => ({ ...p, [opt.key]: e.target.checked }))}
                className="h-4 w-4 rounded border-border-strong text-primary focus:ring-primary/30"
              />
            </label>
          ))}
        </div>
        <Button className="mt-5" onClick={() => toast.success("Preferences saved")}>
          Save Preferences
        </Button>
      </div>

      <div className="mt-6 rounded-2xl border border-red-100 bg-red-50/50 p-6 shadow-sm sm:p-8">
        <h2 className="mb-1 font-semibold text-red-600">Danger Zone</h2>
        <p className="mb-4 text-sm text-text-muted">Permanently delete your account and all associated data.</p>
        <Button variant="danger" icon={<FiTrash2 size={15} />} onClick={() => setDeleteModalOpen(true)}>
          Delete Account
        </Button>
      </div>

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Account">
        <p className="text-sm text-text-muted">
          Are you sure you want to delete your account? This action cannot be undone and all your reservations, reviews, and
          favorites will be permanently removed.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setDeleteModalOpen(false);
              toast.success("Account deletion requested (UI only)");
            }}
          >
            Yes, Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
