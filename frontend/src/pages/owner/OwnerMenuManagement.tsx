import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { Select } from "../../components/common/Select";
import { Modal } from "../../components/common/Modal";
import { Badge } from "../../components/common/Badge";
import { menusByRestaurant } from "../../data/menus";
import type { MenuItem } from "../../types";
import { OWNER_RESTAURANT_ID } from "./ownerConstants";
import { formatCurrency } from "../../utils/format";

interface MenuItemFormValues {
  name: string;
  description: string;
  price: string;
  category: string;
  isVeg: boolean;
}

export function OwnerMenuManagement() {
  const [items, setItems] = useState<MenuItem[]>(menusByRestaurant[OWNER_RESTAURANT_ID] ?? []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const { register, handleSubmit, reset } = useForm<MenuItemFormValues>();

  const categories = Array.from(new Set(items.map((i) => i.category)));

  const openAddModal = () => {
    setEditingItem(null);
    reset({ name: "", description: "", price: "", category: categories[0] ?? "Mains", isVeg: false });
    setModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    reset({ name: item.name, description: item.description, price: String(item.price), category: item.category, isVeg: item.isVeg });
    setModalOpen(true);
  };

  const onSubmit = (data: MenuItemFormValues) => {
    if (editingItem) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id ? { ...i, name: data.name, description: data.description, price: Number(data.price), category: data.category, isVeg: data.isVeg } : i
        )
      );
      toast.success("Menu item updated");
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          name: data.name,
          description: data.description,
          price: Number(data.price),
          category: data.category,
          image: "https://picsum.photos/seed/new-dish/500/400",
          isVeg: data.isVeg,
        },
      ]);
      toast.success("Menu item added");
    }
    setModalOpen(false);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Menu item removed");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text">Menu Management</h1>
          <p className="mt-1 text-text-muted">Add, edit, or remove items from your menu.</p>
        </div>
        <Button icon={<FiPlus size={16} />} onClick={openAddModal}>
          Add Item
        </Button>
      </div>

      <div className="mt-6 space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{category}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items
                .filter((i) => i.category === category)
                .map((item) => (
                  <div key={item.id} className="flex gap-3 rounded-xl border border-border bg-surface-raised p-3 shadow-sm">
                    <img src={item.image} alt={item.name} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-text line-clamp-1">{item.name}</p>
                        <span className="shrink-0 text-sm font-semibold text-primary">{formatCurrency(item.price)}</span>
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-xs text-text-muted">{item.description}</p>
                      <div className="mt-1.5 flex items-center justify-between">
                        {item.isVeg ? <Badge tone="accent">Veg</Badge> : <span />}
                        <div className="flex gap-1.5">
                          <button onClick={() => openEditModal(item)} className="text-text-subtle hover:text-primary cursor-pointer">
                            <FiEdit2 size={14} />
                          </button>
                          <button onClick={() => deleteItem(item.id)} className="text-text-subtle hover:text-red-500 cursor-pointer">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? "Edit Menu Item" : "Add Menu Item"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Item Name" {...register("name", { required: true })} />
          <Textarea label="Description" rows={3} {...register("description", { required: true })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (₹)" type="number" step="1" {...register("price", { required: true })} />
            <Select
              label="Category"
              options={[...categories, "New Category"].map((c) => ({ label: c, value: c }))}
              {...register("category")}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input type="checkbox" {...register("isVeg")} className="h-4 w-4 rounded border-border-strong text-primary focus:ring-primary/30" />
            Vegetarian
          </label>
          <Button type="submit" fullWidth>
            {editingItem ? "Save Changes" : "Add Item"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
