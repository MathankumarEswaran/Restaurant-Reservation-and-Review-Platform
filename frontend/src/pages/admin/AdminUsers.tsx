import { useState } from "react";
import toast from "react-hot-toast";
import { FiSearch, FiSlash, FiCheckCircle } from "react-icons/fi";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import { users as initialUsers } from "../../data/users";
import { formatDate } from "../../utils/format";
import { cn } from "../../utils/cn";
import type { User } from "../../types";

export function AdminUsers() {
  const [users, setUsers] = useState<(User & { suspended?: boolean })[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = users.filter(
    (u) =>
      (roleFilter === "all" || u.role === roleFilter) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleSuspend = (id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, suspended: !u.suspended } : u)));
    const target = users.find((u) => u.id === id);
    toast.success(target?.suspended ? "User reactivated" : "User suspended");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Users</h1>
      <p className="mt-1 text-text-muted">Manage customers, restaurant owners, and admins.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input icon={<FiSearch size={16} />} placeholder="Search by name or email" value={search} onChange={(e) => setSearch(e.target.value)} className="sm:max-w-xs" />
        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="sm:max-w-[180px]"
          options={[
            { label: "All Roles", value: "all" },
            { label: "Customer", value: "customer" },
            { label: "Owner", value: "owner" },
            { label: "Admin", value: "admin" },
          ]}
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-surface-sunken text-xs uppercase text-text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-none">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-text">{u.name}</p>
                        <p className="text-xs text-text-muted">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 capitalize text-text-muted">{u.role}</td>
                  <td className="px-5 py-4 text-text-muted">{formatDate(u.joinedAt)}</td>
                  <td className="px-5 py-4">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", u.suspended ? "bg-red-100 text-red-600" : "bg-accent/10 text-accent-dark")}>
                      {u.suspended ? "Suspended" : "Active"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleSuspend(u.id)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium cursor-pointer",
                        u.suspended ? "bg-accent/10 text-accent-dark hover:bg-accent/20" : "bg-red-50 text-red-500 hover:bg-red-100"
                      )}
                    >
                      {u.suspended ? <FiCheckCircle size={13} /> : <FiSlash size={13} />}
                      {u.suspended ? "Reactivate" : "Suspend"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
