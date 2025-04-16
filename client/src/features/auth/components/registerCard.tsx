import { FcGoogle } from 'react-icons/fc';
import { DottedSeparator } from '@/components/dotted-separato';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../../components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Required'),
  email: z.string().email(),
  password: z.string().min(8, 'Minimum of 8 chacacters required'),
});

export const RegisterCard = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
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
            <Button disabled={false} size="lg" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7 flex flex-col gap-y-4">
        <DottedSeparator />
        <CardContent>
          <Button variant="secondary" size="lg" className="w-full" disabled={false}>
            <FcGoogle className="mr-2 size-5" />
            Register with Google
          </Button>
        </CardContent>
      </div>
      <div className="px-7">
      </div>
      <CardContent className="flex items-center justify-center text-sm">
        <p>Already have an account?
          <Link href="/login">
             <span className='text-slate-600'>&nbsp;Login</span> 
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
