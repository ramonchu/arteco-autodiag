import Link from "next/link";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="py-6 px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-semibold text-foreground">TechCheck Navigator</span>
        </Link>
      </div>
    </header>
  );
}
