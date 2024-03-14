"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useUserStore } from "@/store/use-user-store";

const UpdateUserFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function EditProfilePage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateUserFormSchema>>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      first_name: user?.first_name as string,
      last_name: user?.last_name as string,
      username: user?.username as string,
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateUserFormSchema>) => {
    try {
      toast({
        variant: "destructive",
        title: "Updating account information...",
        description: "Your account information is being updated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Failed to update account information, please try again later",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 mx-auto justify-center items-center mt-12">
      <Card>
        <CardHeader>
          <CardTitle>Update Your Profile</CardTitle>
          <CardDescription>Edit your Profiles Information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y- 6"
            >
              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-6 mt-3 items-center">
                <Button type="submit">Update Account</Button>
                <Button
                  variant="ghost"
                  onClick={() => router.replace("/profile")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
