"use client";

import React from "react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const ForgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Your Email Address is required to reset your password.",
    })
    .email({ message: "Invalid Email Address" }),
});

export default function ForgotPassword({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const { query } = useRouter();

  const token = query.token;
  const email = query.email;

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    try {
      const response = await fetch("http://localhost:3333/api/v1/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          variant: "destructive",
          title: "Sending Magic Link",
          description:
            "Check your Email for the magic link to reset your password",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send Magic Link, please try again later",
      });
    }
  };

  return (
    <>
      <div>{children}</div>
      <Card>
        <CardHeader>
          <CardTitle>Reset Your Password!</CardTitle>
          <CardDescription>
            Forgot your password? Send a reset link to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Get Magic Link</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

function ForgotPasswordForm() {}
