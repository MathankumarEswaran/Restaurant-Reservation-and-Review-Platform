import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import { AuthShell } from "../../components/layout/AuthShell";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { requestPasswordReset } from "../../services/authService";

interface ForgotPasswordValues {
  email: string;
}

export function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>();

  const onSubmit = async (data: ForgotPasswordValues) => {
    await requestPasswordReset(data.email);
    setSent(true);
  };

  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a link to reset it."
      footer={
        <Link to="/login" className="font-semibold text-primary">
          Back to login
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center">
          <FiCheckCircle className="mx-auto mb-3 text-accent-dark" size={30} />
          <h3 className="font-semibold text-text">Check your inbox</h3>
          <p className="mt-1.5 text-sm text-text-muted">
            We sent a password reset link to <span className="font-medium text-text">{getValues("email")}</span>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            icon={<FiMail size={16} />}
            placeholder="you@example.com"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />
          <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
            Send Reset Link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
