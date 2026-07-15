import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Button } from "../../components/common/Button";
import contactBgImage from "../../assets/restaurants/dosa-chutneys.jpg";

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>();

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    reset();
  };

  return (
    <div className="relative overflow-hidden">
      <img src={contactBgImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 blur-[1px]" />
      <div className="absolute inset-0 bg-surface/60" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Contact" }]} />
        <h1 className="mt-3 text-3xl font-bold text-secondary sm:text-4xl">Get in Touch</h1>
        <p className="mt-2 max-w-xl text-slate-500">
          Have a question about a reservation, partnership, or feedback for us? We'd love to hear from you.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold text-secondary">Business Information</h2>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-primary" /> 2/108, RS Puram, Coimbatore, Tamil Nadu
                </li>
                <li className="flex items-center gap-3">
                  <FiPhone className="shrink-0 text-primary" /> +91 96882 91673
                </li>
                <li className="flex items-center gap-3">
                  <FiMail className="shrink-0 text-primary" /> mathan@gmail.com
                </li>
                <li className="flex items-center gap-3">
                  <FiClock className="shrink-0 text-primary" /> Mon – Fri, 9:00 AM – 6:00 PM IST
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                {[FiFacebook, FiInstagram, FiTwitter].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-secondary hover:bg-primary hover:text-white"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            <div className="h-56 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                [ Google Map Placeholder ]
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input label="Full Name" placeholder="Jane Doe" {...register("name", { required: "Name is required" })} error={errors.name?.message} />
              <Input
                label="Email Address"
                type="email"
                placeholder="jane@example.com"
                {...register("email", { required: "Email is required" })}
                error={errors.email?.message}
              />
            </div>
            <Input label="Subject" placeholder="How can we help?" {...register("subject", { required: "Subject is required" })} error={errors.subject?.message} />
            <Textarea
              label="Message"
              rows={6}
              placeholder="Tell us more..."
              {...register("message", { required: "Please write a message" })}
              error={errors.message?.message}
            />
            <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
