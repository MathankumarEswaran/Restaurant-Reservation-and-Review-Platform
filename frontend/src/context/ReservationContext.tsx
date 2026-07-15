import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import * as reservationService from "../services/reservationService";
import type { Reservation } from "../types";

interface ReservationContextValue {
  reservations: Reservation[];
  isLoading: boolean;
  addReservation: (reservation: Reservation) => void;
  cancelReservation: (reservationId: string) => void;
}

const ReservationContext = createContext<ReservationContextValue | undefined>(undefined);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = user ? reservationService.fetchReservationsByUser(user.id, user.name) : Promise.resolve([]);
    load.then((data) => {
      if (!cancelled) setReservations(data);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const addReservation = (reservation: Reservation) => {
    setReservations((prev) => [reservation, ...prev]);
  };

  const cancelReservation = (reservationId: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === reservationId ? { ...r, status: "cancelled" } : r))
    );
    reservationService.cancelReservation(reservationId).catch(() => {
      // revert on failure
      setReservations((prev) =>
        prev.map((r) => (r.id === reservationId ? { ...r, status: "upcoming" } : r))
      );
    });
  };

  const value = useMemo<ReservationContextValue>(
    () => ({ reservations, isLoading, addReservation, cancelReservation }),
    [reservations, isLoading]
  );

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useReservations() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservations must be used within a ReservationProvider");
  return ctx;
}
