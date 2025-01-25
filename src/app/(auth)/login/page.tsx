"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
// import { MentorLogin } from "./MentorLogin";

const loginSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      form.reset({ userName: values.userName, password: values.password });

      await login(values.userName, values.password);

      // toast({
      //   title: "Welcome back!",
      //   description: "You have successfully logged in.",
      // });

      router.push("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
      });
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Card className="max-w-sm rounded-2xl bg-soft-paste-light shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-lg text-muted-foreground">
            Welcome To <span className="text-violet">Anonymous </span>{" "}
            <span className="text-soft-paste-hover">Voice!</span>
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground"></CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
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
                    <FormLabel className="text-xs font-semibold">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-xs">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* <MentorLogin /> */}
    </div>
  );
}
