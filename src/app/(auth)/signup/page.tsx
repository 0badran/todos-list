import AuthWrapper from '@/components/auth-wrapper';
import { SignUp } from '@stackframe/stack';

export default function CustomSignUp() {
   return (
      <AuthWrapper>
         <SignUp automaticRedirect={true} />
      </AuthWrapper>
   );
}
