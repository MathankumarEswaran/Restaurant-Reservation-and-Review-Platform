import type { User } from "../types";

export const users: User[] = [
  {
    id: "u-1",
    name: "Kumaran Maran",
    email: "kumaran.maran@gmail.com",
    phone: "+91 98765 43210",
    role: "customer",
    joinedAt: "2023-08-14",
  },
  {
    id: "u-2",
    name: "sanjay",
    email: "sanjay@gmail.com",
    phone: "+91 98450 12233",
    role: "customer",
    joinedAt: "2023-11-02",
  },
  {
    id: "u-3",
    name: "Prem kumar",
    email: "premkumar@gmail.com",
    phone: "+91 90031 55678",
    role: "customer",
    joinedAt: "2024-01-19",
  },
  {
    id: "u-4",
    name: "Rajesh",
    email: "rajesh@rgmail.com",
    phone: "+91 97890 66112",
    role: "owner",
    joinedAt: "2023-05-30",
  },
  {
    id: "u-5",
    name: "Kavitha",
    email: "kavitha@gmail.com",
    phone: "+91 96001 99882",
    role: "owner",
    joinedAt: "2023-04-11",
  },
  {
    id: "u-6",
    name: "prajith",
    email: "prajith@gmail.com",
    phone: "+91 94440 66123",
    role: "admin",
    joinedAt: "2022-12-01",
  },
];

export const currentCustomer = users[0];
export const currentOwner = users[3];
export const currentAdmin = users[5];
