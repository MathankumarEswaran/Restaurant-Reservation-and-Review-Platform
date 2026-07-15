import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
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
      navigate(user.role === "admin" ? "/admin" : user.role === "owner" ? "/owner" : "/dashboard");
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
          <label className="flex cursor-pointer items-center gap-2 text-slate-600">
            <input type="checkbox" {...register("remember")} className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/30" />
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

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <Button variant="outline" fullWidth size="lg" icon={<FcGoogle size={18} />} onClick={() => toast("Google login is UI only for now", { icon: "🔧" })}>
        Continue with Google
      </Button>
    </AuthShell>
  );
}
