"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
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

const LoginFormSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(4, {
      message: "Usernames are at least 4 characters.",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password is at least 6 characters",
    }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
      const response = await fetch("http://localhost:3333/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(data),
      });

      toast({
        variant: "destructive",
        title: "Logging in...",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });

      if (response.ok) {
        router.replace("/");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to login, please try again later",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Alert>
        <AlertTriangle className="h-4 w-4 " color="#c70404" />
        <AlertTitle>
          Welcome back to Fraudit, a Fraudulent Reddit Remake
        </AlertTitle>
        <AlertDescription>IYKYK, Rate My Professor Please!</AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>Login to Fraudit!</CardTitle>
          <CardDescription>
            Login using your username and password below.
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    {/* <FormDescription>Your Account Username</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    {/* <FormDescription>Your Account Password</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>
            Don't have an account?{" "}
            <Link
              href={"/auth/register"}
              className="text-blue-400 underline underline-offset-2 hover:cursor-pointer"
            >
              Register Here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
