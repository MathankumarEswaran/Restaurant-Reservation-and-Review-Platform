import { useState } from "react";
import toast from "react-hot-toast";
import { FiMoon, FiSun, FiTrash2 } from "react-icons/fi";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { useTheme } from "../../context/ThemeContext";

const toggleOptions = [
  { key: "emailReservations", label: "Email me about reservation updates" },
  { key: "emailPromos", label: "Email me about promotions & offers" },
  { key: "smsReminders", label: "SMS reminders before my reservation" },
  { key: "pushNotifications", label: "Push notifications" },
];

export function CustomerSettings() {
  const { theme, toggleTheme } = useTheme();
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    emailReservations: true,
    emailPromos: false,
    smsReminders: true,
    pushNotifications: true,
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Settings</h1>
      <p className="mt-1 text-slate-500">Manage your notification and account preferences.</p>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-semibold text-secondary">Notification Preferences</h2>
        <div className="space-y-3">
          {toggleOptions.map((opt) => (
            <label key={opt.key} className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
              <span className="text-sm text-slate-600">{opt.label}</span>
              <input
                type="checkbox"
                checked={prefs[opt.key]}
                onChange={(e) => setPrefs((p) => ({ ...p, [opt.key]: e.target.checked }))}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/30"
              />
            </label>
          ))}
        </div>
        <Button className="mt-5" onClick={() => toast.success("Preferences saved")}>
          Save Preferences
        </Button>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-semibold text-secondary">Appearance</h2>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-secondary cursor-pointer"
        >
          {theme === "light" ? <FiSun /> : <FiMoon />}
          {theme === "light" ? "Light mode" : "Dark mode"} — click to toggle
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-red-100 bg-red-50/50 p-6 shadow-sm sm:p-8">
        <h2 className="mb-1 font-semibold text-red-600">Danger Zone</h2>
        <p className="mb-4 text-sm text-slate-500">Permanently delete your account and all associated data.</p>
        <Button variant="danger" icon={<FiTrash2 size={15} />} onClick={() => setDeleteModalOpen(true)}>
          Delete Account
        </Button>
      </div>

      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Account">
        <p className="text-sm text-slate-600">
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
