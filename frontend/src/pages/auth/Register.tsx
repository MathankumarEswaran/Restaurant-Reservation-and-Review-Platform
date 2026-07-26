import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { AuthShell } from "../../components/layout/AuthShell";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

interface RegisterFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const user = await registerUser({ name: data.name, email: data.email, phone: data.phone, password: data.password });
      toast.success(`Welcome to BookMyBite, ${user.name.split(" ")[0]}!`);
      navigate("/dashboard");
    } catch (error) {
      const message = axios.isAxiosError(error) ? (error.response?.data as { message?: string } | undefined)?.message : undefined;
      toast.error(message ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join thousands of diners discovering great restaurants."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full Name"
          icon={<FiUser size={16} />}
          placeholder="Jane Doe"
          {...register("name", { required: "Name is required" })}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          icon={<FiMail size={16} />}
          placeholder="you@example.com"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />
        <Input
          label="Phone"
          type="tel"
          icon={<FiPhone size={16} />}
          placeholder="+91 98765 43210"
          {...register("phone", { required: "Phone number is required" })}
          error={errors.phone?.message}
        />
        <Input
          label="Password"
          type="password"
          icon={<FiLock size={16} />}
          placeholder="••••••••"
          {...register("password", { required: "Password is required", minLength: { value: 8, message: "At least 8 characters" } })}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
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
          Create Account
        </Button>
      </form>
    </AuthShell>
  );
}
