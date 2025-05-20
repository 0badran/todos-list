'use client';

import AuthWrapper from "@/components/auth-wrapper";
import { SignIn } from "@stackframe/stack";

export default function CustomSignIn() {

   return (
      <AuthWrapper>
         <SignIn automaticRedirect={true} />
      </AuthWrapper>
   );
}