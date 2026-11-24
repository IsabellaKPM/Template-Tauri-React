import Logo from "./Logo";
import { HeaderNav } from "./HeaderNav";
import { HeaderAuthActions } from "./HeaderAuthActions";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        <div className="flex items-center gap-6">
          <HeaderNav />
          <HeaderAuthActions />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
