export default function AuthWrapper({ children }: { children: React.ReactNode }) {
   return (
      <div className="w-md shadow-lg shadow-slate-500/50 bg-slate-50/30 backdrop-blur-sm rounded-2xl flex justify-center p-6">
         {children}
      </div>
   );
}