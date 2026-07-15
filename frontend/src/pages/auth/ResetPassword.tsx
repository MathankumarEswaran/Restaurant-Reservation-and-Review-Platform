import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLock } from "react-icons/fi";
import { AuthShell } from "../../components/layout/AuthShell";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { resetPassword } from "../../services/authService";

interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}

export function ResetPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>();

  const onSubmit = async (data: ResetPasswordValues) => {
    await resetPassword("mock-token", data.password);
    toast.success("Password reset successfully. Please log in.");
    navigate("/login");
  };

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Choose a new password for your account."
      footer={
        <Link to="/login" className="font-semibold text-primary">
          Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="New Password"
          type="password"
          icon={<FiLock size={16} />}
          placeholder="••••••••"
          {...register("password", { required: "Password is required", minLength: { value: 8, message: "At least 8 characters" } })}
          error={errors.password?.message}
        />
        <Input
          label="Confirm New Password"
          type="password"
          icon={<FiLock size={16} />}
          placeholder="••••••••"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === getValues("password") || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
          Reset Password
        </Button>
      </form>
    </AuthShell>
  );
}
