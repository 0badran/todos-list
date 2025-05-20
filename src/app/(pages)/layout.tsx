import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";


export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mt-20 dark:text-white container mx-auto">
        {children}
      </main>
      <Sidebar />
    </>
  );
}
