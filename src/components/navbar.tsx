import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full max-w-6xl mx-auto flex justify-between items-center p-6 border-b border-opacity-30">
      <Link href="/" onClick={() => window.location.reload()}>
      <h1 className="text-2xl font-bold text-primary cursor-pointer">Convertly</h1>
      </Link>
      <nav className="flex gap-6 text-primary justify-center items-center font-medium">
        <ModeToggle />
      </nav>
    </div>
  );
}