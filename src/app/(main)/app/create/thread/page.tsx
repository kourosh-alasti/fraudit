"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createThread } from "@/actions/fraudit/create-thread";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  slug: string;
}

const formSchema = z.object({
  title: z
    .string({ required_error: "A Title is required to post a thread" })
    .min(6, { message: "Best Practices to have a well-defined title" }),
  content: z
    .string({
      required_error: "Content is required to post a new thread",
    })
    .min(40, { message: "Description must be more than 40 characters" }),
});

const CreateThreadPage = ({ slug }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createThread({ ...values, frauditSlug: slug })
      .then(() => {
        toast({
          title: "Success",
          description: "Successfully posted a new thread",
          variant: "success",
        });

        router.push(`/app/f/${slug}`);
      })
      .catch((err) =>
        toast({
          variant: "destructive",
          title: "An Error has occurred",
          description:
            err.message || "Failed to post new thread, please try again later",
        }),
      );
  };

  return (
    <div className="mx-auto lg:max-w-[968px]">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-extrabold tracking-wide md:text-2xl lg:text-3xl">
            Post a new Thread
          </h1>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thread Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Help Needed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <Input placeholder="Content" {...field} />
                )}
              />
              <Button type="submit" className="bg-green-500 text-slate-700">
                Post
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
