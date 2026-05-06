import Link from "next/link";
import { Rocket } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 p-8">
      <Rocket className="h-16 w-16 text-brand" />
      <h1 className="text-5xl font-bold text-brand">DClaw Deploy</h1>
      <p className="text-xl text-gray-600">CI/CD pipeline builder</p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-brand px-6 py-3 text-white shadow hover:bg-sky-600 transition"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
