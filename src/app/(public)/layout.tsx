import Navbar from "@/components/Layout/Navbar";
import MobileBottomNav from "@/components/Layout/MobileBottomNav";
import Footer from "@/components/Layout/Footer";
import FloatingWhatsApp from "@/components/CTA/FloatingWhatsApp";
import { getAllEvents } from "@/lib/events.server";
import { LanguageProvider } from "@/lib/language";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeEvents = await getAllEvents();

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar activeEvents={activeEvents} />
        <main className="grow pb-20 md:pb-0">{children}</main>
        <Footer />
      </div>
      <MobileBottomNav activeEvents={activeEvents} />
      <FloatingWhatsApp />
    </LanguageProvider>
  );
}
