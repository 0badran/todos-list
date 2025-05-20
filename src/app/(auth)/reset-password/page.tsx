'use client';
import AuthWrapper from "@/components/auth-wrapper";
import { PasswordReset } from "@stackframe/stack";
import { Suspense, use } from "react";

export default function CustomResetPassword({ searchParams }: { searchParams: Promise<{ code: string }> }) {
   const params = use(searchParams);

   return (
      <Suspense>
         <AuthWrapper>
            <PasswordReset searchParams={params} />
         </AuthWrapper>
      </Suspense>
   );
}