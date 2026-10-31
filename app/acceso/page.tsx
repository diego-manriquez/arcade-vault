import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = { title: "Acceso · Arcade Vault" };

export default function AccessPage() {
  return (
    <main className="view flex flex-1 items-center justify-center px-5 pb-24 pt-12">
      <AuthCard />
    </main>
  );
}
