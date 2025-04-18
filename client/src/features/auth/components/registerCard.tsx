'use client';

import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { DottedSeparator } from '@/components/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { error } from 'console';
import { registerSchema } from '@/validator/authSchema';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';

export const RegisterCard = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, status } = useRegister();

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    mutate(values, {
      onSuccess: (data) => {
        console.log('Registration successful', data);
        router.push('/login');
      },
      onError: (error) => {
        console.error('Error registering', error);
      },
    });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Let's team up! </CardTitle>
        <CardDescription>
          By signing up, you agree to our {''}
          <Link href="/privacy">
            <span className="text-slate-600">Privacy Policy</span>
          </Link>{' '}
          {''}
          and {''}
          <Link href="/terms">
            <span className="text-slate-600">Termos of Service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Name"></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Email address"></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password"></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <Button disabled={status === 'pending'} size="lg" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7 flex flex-col gap-y-4">
        <DottedSeparator />
      </div>
      <div className="px-7"></div>
      <CardContent className="p-7 flex items-center justify-center text-sm">
        <p>
          Already have an account?
          <Link href="/login">
            <span className="text-slate-600">&nbsp;Login</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
