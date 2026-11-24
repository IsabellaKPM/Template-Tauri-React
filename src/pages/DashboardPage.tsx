import { DashboardWelcome } from "@/features/auth/components/DashboardWelcome";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <DashboardWelcome />
      </div>
    </div>
  );
}
