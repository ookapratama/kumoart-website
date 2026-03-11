import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import FloatingWhatsApp from "@/components/CTA/FloatingWhatsApp";
import { getActiveEvents } from "@/lib/events.server";
import { LanguageProvider } from "@/lib/language";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeEvents = await getActiveEvents();

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar activeEvents={activeEvents} />
        <main className="grow">{children}</main>
        <Footer />
      </div>
      <FloatingWhatsApp />
    </LanguageProvider>
  );
}
