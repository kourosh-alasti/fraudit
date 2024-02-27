"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const ResetPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email Address is required" })
    .email({ message: "Invalid Email Address supplied" }),
});

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    try {
      const response = await fetch(
        "http://localhost:3333/api/v1/auth/request-reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          mode: "cors",
          body: JSON.stringify(data),
        }
      );
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send Password Reset Request",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Reset your forgotten password here</CardDescription>
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
              <Button type="submit" className="w-full">
                Get Magic Link
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
