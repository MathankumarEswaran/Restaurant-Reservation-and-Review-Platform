import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiPlus, FiX } from "react-icons/fi";
import { useState } from "react";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Button } from "../../components/common/Button";
import { getRestaurantById } from "../../data/restaurants";
import { OWNER_RESTAURANT_ID } from "./ownerConstants";

interface ProfileFormValues {
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export function OwnerRestaurantProfile() {
  const restaurant = getRestaurantById(OWNER_RESTAURANT_ID)!;
  const [facilities, setFacilities] = useState(restaurant.facilities);
  const [newFacility, setNewFacility] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: restaurant.name,
      tagline: restaurant.tagline,
      description: restaurant.description,
      address: restaurant.location.address,
      city: restaurant.location.city,
      state: restaurant.location.state,
      zip: restaurant.location.zip,
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success("Restaurant profile updated");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Restaurant Profile</h1>
      <p className="mt-1 text-text-muted">Manage how your restaurant appears to diners.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="rounded-2xl border border-border bg-surface-raised p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 font-semibold text-text">Basic Information</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input label="Restaurant Name" {...register("name")} />
            </div>
            <div className="sm:col-span-2">
              <Input label="Tagline" {...register("tagline")} />
            </div>
            <div className="sm:col-span-2">
              <Textarea label="Description" rows={5} {...register("description")} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface-raised p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 font-semibold text-text">Location</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input label="Street Address" {...register("address")} />
            </div>
            <Input label="City" {...register("city")} />
            <Input label="State" {...register("state")} />
            <Input label="ZIP Code" {...register("zip")} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface-raised p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 font-semibold text-text">Facilities</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {facilities.map((facility) => (
              <span key={facility} className="flex items-center gap-1.5 rounded-full bg-surface-sunken px-3 py-1.5 text-xs font-medium text-text">
                {facility}
                <button type="button" onClick={() => setFacilities((f) => f.filter((x) => x !== facility))} className="text-text-subtle hover:text-red-500 cursor-pointer">
                  <FiX size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a facility (e.g. Valet Parking)"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              className="max-w-xs"
            />
            <Button
              type="button"
              variant="outline"
              icon={<FiPlus size={15} />}
              onClick={() => {
                if (newFacility.trim()) {
                  setFacilities((f) => [...f, newFacility.trim()]);
                  setNewFacility("");
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface-raised p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 font-semibold text-text">Gallery</h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {restaurant.gallery.map((img, idx) => (
              <img key={idx} src={img} alt="" className="h-20 w-full rounded-lg object-cover" />
            ))}
            <button
              type="button"
              className="flex h-20 items-center justify-center rounded-lg border-2 border-dashed border-border-strong text-text-subtle hover:border-primary hover:text-primary cursor-pointer"
              onClick={() => toast("Image upload is UI only for now", { icon: "🔧" })}
            >
              <FiPlus size={20} />
            </button>
          </div>
        </div>

        <Button type="submit" size="lg" isLoading={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
