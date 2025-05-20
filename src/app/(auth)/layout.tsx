import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
   return (
      <main className="bg-[url('/images/auth.webp')] relative  h-screen flex items-center justify-center px-4">
         <Link href='/' className="absolute top-7 left-7 font-bold text-2xl hover:underline">Home</Link>
         {children}
      </main>
   );
}