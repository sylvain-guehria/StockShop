import RegisterComponant from '@/components/03-auth/register/RegisterComponant';
import AuthLayout from '@/layouts/AuthLayout';

const Login = () => {
  return (
    <AuthLayout>
      <RegisterComponant />
    </AuthLayout>
  );
};

export default Login;
