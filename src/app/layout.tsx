import { ThemeProvider } from "@/components/theme-provider";
import TopButton from "@/components/top-button";
import { Toaster } from "@/components/ui/sonner";
import { StackProvider, StackTheme } from "@stackframe/stack";
import type { Metadata } from "next";
import { stackServerApp } from "../stack";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo List App",
  description: "A simple and effective todo list application for organizing and managing your daily tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = {
    dark: {
      popover: '#1e2939',
      accent: '#dff2fe',
      accentForeground: '#0084D1',
      muted: '#1e2939',
      secondary: '#0084D1',
    },
  }
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className='antialiased dark:bg-gray-800'>
        <StackProvider app={stackServerApp}>
          <StackTheme theme={theme}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster position="bottom-right" />
              <TopButton />
            </ThemeProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
