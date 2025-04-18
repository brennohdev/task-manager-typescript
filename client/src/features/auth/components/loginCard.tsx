'use client';

import { useRouter } from 'next/navigation'; // <-- este é o hook certo pra Client Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../components/ui/form';
import { loginSchema } from '@/validator/authSchema';
import { useLogin } from '../hooks/useLogin';
import { useAuthStore } from '@/contexts/auth/authStore';
import Link from 'next/link';

export const LoginCard = () => {
  const router = useRouter(); // <- aqui agora funciona corretamente

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, status } = useLogin();
  const { setUser } = useAuthStore();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    mutate(values, {
      onSuccess: (data) => {
        setUser(data.user);
        console.log('Login successful', data);
        router.push('/'); // <- agora vai redirecionar certinho
      },
      onError: (error) => {
        console.error('Error logging in', error);
      },
    });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Hey, Welcome Back!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-2" />
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Email address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={status === 'pending'} size="lg" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7 flex flex-col gap-y-4" />
      <div className="px-7" />
      <CardContent className="p-7 flex items-center justify-center text-sm">
        <p>
          Don&apos;t have an account?
          <Link href="/register">
            <span className="text-slate-600">&nbsp;Register now</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
