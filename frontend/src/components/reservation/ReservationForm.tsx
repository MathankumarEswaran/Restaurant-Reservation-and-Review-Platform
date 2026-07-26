import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import axios from "axios";
import { FiUsers, FiCalendar, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../common/Textarea";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useReservations } from "../../context/ReservationContext";
import { createPaymentOrder, loadRazorpayCheckoutScript, openCheckout, verifyPayment } from "../../services/paymentService";
import { resolveRestaurantIdBySlug } from "../../services/restaurantService";
import type { Restaurant } from "../../types";

interface ReservationFormValues {
  date: Date | null;
  time: string;
  guests: string;
  specialRequest: string;
}

const TIME_SLOTS = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM",
].map((t) => ({ label: t, value: t }));

const GUEST_OPTIONS = Array.from({ length: 10 }, (_, i) => ({ label: `${i + 1} ${i === 0 ? "Guest" : "Guests"}`, value: String(i + 1) }));

const FEE_PER_GUEST_INR = 50;
const GST_RATE = 0.18;

const formatINR = (rupees: number) => `₹${rupees.toLocaleString("en-IN")}`;

const errorMessage = (error: unknown, fallback: string) =>
  (axios.isAxiosError(error) ? (error.response?.data as { message?: string } | undefined)?.message : undefined) ?? fallback;

export function ReservationForm({ restaurant }: { restaurant: Restaurant }) {
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { addReservation } = useReservations();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    defaultValues: { date: null, time: "", guests: "2", specialRequest: "" },
  });

  const guestsValue = useWatch({ control, name: "guests" });
  const guestCount = Number(guestsValue) || 0;
  const baseAmount = guestCount * FEE_PER_GUEST_INR;
  const taxAmount = Math.round(baseAmount * GST_RATE);
  const totalAmount = baseAmount + taxAmount;

  const onSubmit = async (data: ReservationFormValues) => {
    if (!data.date) return;
    if (!isAuthenticated || !user) {
      toast("Please sign in to complete your reservation", { icon: "🔒" });
      navigate("/login");
      return;
    }

    try {
      const restaurantId = await resolveRestaurantIdBySlug(restaurant.slug);
      const order = await createPaymentOrder({
        restaurantId,
        date: data.date.toISOString().slice(0, 10),
        time: data.time,
        guests: Number(data.guests),
        specialRequest: data.specialRequest || undefined,
      });

      await loadRazorpayCheckoutScript();

      openCheckout({
        order,
        name: "BookMyBite",
        description: `Table reservation at ${restaurant.name}`,
        prefill: { name: user.name, email: user.email, contact: user.phone },
        onSuccess: async (response) => {
          setIsProcessing(true);
          try {
            const reservation = await verifyPayment(response, user.name);
            addReservation(reservation);
            toast.success("Payment successful — reservation confirmed!");
            setSubmitted(true);
          } catch (error) {
            toast.error(errorMessage(error, "Payment succeeded but we couldn't confirm your reservation. Please contact support."));
          } finally {
            setIsProcessing(false);
          }
        },
        onDismiss: () => {
          toast("Payment cancelled — your table wasn't booked", { icon: "ℹ️" });
        },
      });
    } catch (error) {
      toast.error(errorMessage(error, "Couldn't start payment. Please try again."));
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
          <FiCalendar size={24} />
        </div>
        <h3 className="text-lg font-semibold text-text">You're all set!</h3>
        <p className="mt-1 text-sm text-text-muted">A confirmation has been added to your reservations.</p>
        <Button variant="outline" className="mt-5" onClick={() => navigate("/dashboard/reservations")}>
          View My Reservations
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-border bg-surface-raised p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-text">Reserve a Table</h3>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Date</label>
        <Controller
          name="date"
          control={control}
          rules={{ required: "Please select a date" }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              minDate={new Date()}
              placeholderText="Select a date"
              dateFormat="MMMM d, yyyy"
              className="w-full rounded-xl border border-border-strong px-4 py-2.5 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              wrapperClassName="w-full"
            />
          )}
        />
        {errors.date && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.date.message}</p>}
      </div>

      <Select
        label="Time"
        icon={<FiClock />}
        placeholder="Select a time"
        options={TIME_SLOTS}
        {...register("time", { required: "Please select a time" })}
        error={errors.time?.message}
      />

      <Select label="Guests" icon={<FiUsers />} options={GUEST_OPTIONS} {...register("guests")} />

      <Textarea label="Special Request (optional)" placeholder="Allergies, occasion, seating preference..." {...register("specialRequest")} />

      <div className="rounded-xl border border-border bg-surface-sunken p-4 text-sm">
        <div className="flex items-center justify-between text-text-muted">
          <span>Deposit ({formatINR(FEE_PER_GUEST_INR)} × {guestCount || 0} guests)</span>
          <span>{formatINR(baseAmount)}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-text-muted">
          <span>GST (18%)</span>
          <span>{formatINR(taxAmount)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-border-strong pt-2 font-semibold text-text">
          <span>Total payable</span>
          <span>{formatINR(totalAmount)}</span>
        </div>
      </div>

      <Button type="submit" fullWidth size="lg" isLoading={isSubmitting || isProcessing}>
        Reserve Now
      </Button>
      <p className="text-center text-xs text-text-subtle">This is a refundable deposit to confirm your booking, charged securely via Razorpay</p>
    </form>
  );
}
