import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Button } from "../../components/common/Button";

const featureFlags = [
  { key: "maintenanceMode", label: "Maintenance Mode", description: "Temporarily disable public access to the platform" },
  { key: "newRegistrations", label: "Allow New Registrations", description: "Let new customers and owners sign up" },
  { key: "ownerAutoApprove", label: "Auto-approve New Restaurants", description: "Skip manual review for new restaurant listings" },
  { key: "reviewModeration", label: "Require Review Moderation", description: "Hold new reviews for admin approval before publishing" },
];

export function AdminSettings() {
  const [flags, setFlags] = useState<Record<string, boolean>>({
    maintenanceMode: false,
    newRegistrations: true,
    ownerAutoApprove: false,
    reviewModeration: true,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Platform Settings</h1>
      <p className="mt-1 text-text-muted">Configure global platform behavior.</p>

      <div className="mt-6 rounded-2xl border border-border bg-surface-raised p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-semibold text-text">General</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="Platform Name" defaultValue="Chennai Traditions Reserved" />
          <Input label="Support Email" defaultValue="support@tabletime.com" />
          <Input label="Commission Rate (%)" type="number" defaultValue={10} />
          <Input label="Default Currency" defaultValue="INR" />
          <div className="sm:col-span-2">
            <Textarea label="Platform Announcement" rows={3} placeholder="Shown as a banner across the site (optional)" />
          </div>
        </div>
        <Button className="mt-5" onClick={() => toast.success("Settings saved")}>
          Save Changes
        </Button>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface-raised p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-semibold text-text">Feature Flags</h2>
        <div className="space-y-3">
          {featureFlags.map((flag) => (
            <label key={flag.key} className="flex cursor-pointer items-center justify-between rounded-xl border border-border px-4 py-3">
              <div>
                <p className="text-sm font-medium text-text">{flag.label}</p>
                <p className="text-xs text-text-muted">{flag.description}</p>
              </div>
              <input
                type="checkbox"
                checked={flags[flag.key]}
                onChange={(e) => setFlags((f) => ({ ...f, [flag.key]: e.target.checked }))}
                className="h-4 w-4 shrink-0 rounded border-border-strong text-primary focus:ring-primary/30"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
