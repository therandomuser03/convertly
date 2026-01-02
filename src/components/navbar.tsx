import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto flex justify-between items-center p-6 border-b border-opacity-30"
    >
      <Link href="/" onClick={() => window.location.reload()} className="flex items-center gap-2">
        <motion.div whileHover={{ rotate: 20 }} transition={{ type: "spring", stiffness: 300 }}>
          <Image src="/favicon.ico" alt="Convertly" width={28} height={28} />
        </motion.div>
        <h1 className="text-2xl font-bold text-primary cursor-pointer hover:text-blue-600 transition-colors">Convertly</h1>
      </Link>
      <nav className="flex gap-6 text-primary justify-center items-center font-medium">
        <ModeToggle />
      </nav>
    </motion.div>
  );
}