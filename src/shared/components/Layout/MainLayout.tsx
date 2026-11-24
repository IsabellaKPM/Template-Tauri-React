import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export interface Props {
  children: ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
