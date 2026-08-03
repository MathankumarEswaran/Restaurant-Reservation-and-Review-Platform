import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail, FiLock } from "react-icons/fi";
import { AuthShell } from "../../components/layout/AuthShell";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const user = await login({ email: data.email, password: data.password });
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
      navigate("/");
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to manage your reservations and favorites."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          icon={<FiMail size={16} />}
          placeholder="you@example.com"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          icon={<FiLock size={16} />}
          placeholder="••••••••"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-text-muted">
            <input type="checkbox" {...register("remember")} className="h-4 w-4 rounded border-border-strong text-primary focus:ring-primary/30" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-medium text-primary">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
          Log In
        </Button>
      </form>
    </AuthShell>
  );
}
