'use client';
import AuthWrapper from "@/components/auth-wrapper";
import { ForgotPassword } from "@stackframe/stack";
import { Suspense } from "react";

export default function CustomForgotPassword() {
   return (
      <Suspense>
         <AuthWrapper>
            <ForgotPassword />
         </AuthWrapper>
      </Suspense>
   );
}