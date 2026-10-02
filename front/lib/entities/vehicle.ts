import { User } from "@/lib/entities/user";

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number | null;
  userId: string;
  photos?: string[];
};

export type VehicleUser = Vehicle & { user: User | null };
