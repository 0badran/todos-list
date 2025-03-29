import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import TopButton from "@/components/top-button";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Todo List App",
  description: "A simple and effective todo list application for organizing and managing your daily tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className='antialiased dark:bg-gray-800'>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Sidebar />
          <main className="grid">
            <div className="mt-20 w-full px-6 dark:text-white sm:px-8 md:px-10 lg:w-2/3 xl:3/4 2xl:4/5 lg:place-self-end lg:ml-5 xl:ml-8 2xl:ml-12">
              {children}
            </div>
          </main>
          <Toaster position="top-center" />
          <TopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
