"use client";

import { useRouter } from "next/navigation";
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
  password: z
    .string({
      required_error: "You must enter a password",
    })
    .min(6, { message: "Password must be greater than 6 characters" }),
  confirmPassword: z
    .string({ required_error: "Must re-enter password" })
    .min(6, { message: "Passwords must match" }),
});

export default function ForgotPasswordPage({
  params,
}: {
  params: { token: String; email: String };
}) {
  const { toast } = useToast();
  const router = useRouter();

  const token = params.token;
  const email = params.email;

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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
      <Card>
        <CardHeader>
          <CardTitle>Reset Your Password!</CardTitle>
          <CardDescription>
            It is time to reset your password. Write down in a secure place.
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirm Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Reset Password!</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
