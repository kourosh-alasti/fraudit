"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { AlertTriangle } from "lucide-react";

const RegisterFormSchema = z.object({
  first_name: z.string({ required_error: "First Name is required" }),
  last_name: z.string({ required_error: "Last Name is required" }),
  username: z
    .string({ required_error: "Username is required" })
    .min(4, { message: "Username must be at least 4 characters." }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Incorrect Formatting" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters." }),
  confirm_password: z
    .string({ required_error: "Password's must match" })
    .min(6, { message: "Password's must match" }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
    try {
      const { confirm_password, ...rest } = data;

      const response = await fetch(
        "http://localhost:3333/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          mode: "cors",
          body: JSON.stringify(rest),
        }
      );

      toast({
        variant: "destructive",
        title: "Registering account...",
        description: "Registering your new account for Fraudit",
      });

      if (response.ok) {
        router.replace("/");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register account, please try again later",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" color="#c70404" />
        <AlertTitle>Welcome to Fraudit, a Fraudulent Reddit Remake</AlertTitle>
        <AlertDescription>IYKYK, Rate My Professor Please!</AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>Register a New Account!</CardTitle>
          <CardDescription>Fraudit, A Fraudulent Reddit Remake</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              <div className="flex gap-6">
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
                  name="confirm_password"
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
              </div>
              <Button type="submit">Register Account</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>
            Already have an account?{" "}
            <Link
              href={"/auth/login"}
              className="text-blue-400 underline underline-offset-2 hover:cursor-pointer"
            >
              Login Here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );

  return <div>RegisterPage</div>;
}
