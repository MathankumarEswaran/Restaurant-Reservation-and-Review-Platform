import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiCamera, FiX } from "react-icons/fi";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Avatar } from "../../components/common/Avatar";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/format";

interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
}

export function CustomerProfile() {
  const { user, updateUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({ defaultValues: { name: user?.name, email: user?.email, phone: user?.phone } });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Profile updated successfully");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary">My Profile</h1>
      <p className="mt-1 text-slate-500">Manage your personal information.</p>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar name={user?.name ?? "?"} src={user?.avatar} size={80} />
            <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-sm cursor-pointer">
              <FiCamera size={13} />
            </button>
          </div>
          <div>
            <p className="text-lg font-semibold text-secondary">{user?.name}</p>
            <p className="text-sm text-slate-500">Member since {user ? formatDate(user.joinedAt) : ""}</p>
            {user?.avatar && (
              <button
                type="button"
                onClick={() => {
                  updateUser({ avatar: undefined });
                  toast.success("Profile photo removed");
                }}
                className="mt-1.5 flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-red-500 cursor-pointer"
              >
                <FiX size={12} /> Remove photo
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="Full Name" {...register("name")} />
          <Input label="Email Address" type="email" {...register("email")} />
          <Input label="Phone Number" type="tel" {...register("phone")} />
          <div className="flex items-end sm:col-span-2">
            <Button type="submit" isLoading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-semibold text-secondary">Change Password</h2>
        <form className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input label="Current Password" type="password" placeholder="••••••••" />
          <div className="hidden sm:block" />
          <Input label="New Password" type="password" placeholder="••••••••" />
          <Input label="Confirm New Password" type="password" placeholder="••••••••" />
          <div className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => toast.success("Password updated")}>
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
