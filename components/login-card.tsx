'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const loginSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(6, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginCard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    const response = await signIn('credentials', {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl:
        searchParams?.get('from') ||
        process.env.NEXT_PUBLIC_AUTHENTICATED_REDIRECT ||
        '/',
    });

    setIsLoading(false);

    if (!response?.ok || response?.error) {
      return toast({
        title: 'Something went wrong',
        description: 'Your log in request failed. please try again.',
        variant: 'destructive',
      });
    }

    // NOTE: Using router.push because redirect wouldn't work
    router.push(
      searchParams?.get('from') ||
        process.env.NEXT_PUBLIC_AUTHENTICATED_REDIRECT ||
        '/',
    );
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials to login to your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...register('email')}
              />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                {...register('password')}
              />
              {errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
