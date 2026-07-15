import { useState } from "react";
import toast from "react-hot-toast";
import { FiCreditCard } from "react-icons/fi";
import { Button } from "../../components/common/Button";
import { Select } from "../../components/common/Select";
import { Input } from "../../components/common/Input";

const toggleOptions = [
  { key: "autoConfirm", label: "Automatically confirm new reservations" },
  { key: "emailBookings", label: "Email me for every new booking" },
  { key: "smsAlerts", label: "SMS alerts for last-minute reservations" },
  { key: "reviewNotifications", label: "Notify me about new reviews" },
];

export function OwnerSettings() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    autoConfirm: false,
    emailBookings: true,
    smsAlerts: true,
    reviewNotifications: true,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">Settings</h1>
      <p className="mt-1 text-slate-500">Manage booking preferences and payout details.</p>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-semibold text-secondary">Booking Preferences</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Select
            label="Booking Window"
            options={[
              { label: "Up to 30 days ahead", value: "30" },
              { label: "Up to 60 days ahead", value: "60" },
              { label: "Up to 90 days ahead", value: "90" },
            ]}
            defaultValue="60"
          />
          <Input label="Max Party Size" type="number" defaultValue={10} />
        </div>
        <div className="mt-5 space-y-3">
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
        <h2 className="mb-4 flex items-center gap-2 font-semibold text-secondary">
          <FiCreditCard /> Payout Method
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="Bank Account Holder" defaultValue="Rajesh Rayar" />
          <Input label="Account Number" defaultValue="•••• •••• •••• 4821" />
        </div>
        <Button variant="outline" className="mt-5" onClick={() => toast.success("Payout details updated")}>
          Update Payout Info
        </Button>
      </div>
    </div>
  );
}
