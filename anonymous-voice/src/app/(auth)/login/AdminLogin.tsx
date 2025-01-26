"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Chrome } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface AdminLoginProps {
  title?: string;
  description?: string;
}

interface LoginFormInputs {
  username: string;
  password: string;
}

export function AdminLogin({
  title = "Admin Access",
  description = "Sign in with your organization email",
}: AdminLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAdminAuth();
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setIsLoading(true);
      await login(data.username, data.password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please check your credentials and try again.",
      });
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background antialiased">
      <Card className="shadow-md rounded-2xl max-w-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-sm font-normal">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-xs space-y-4"
          >
            <Input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
            <Input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in with Username"}
            </Button>
          </form>

          <div className="my-4 w-full max-w-xs flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-2 text-gray-500">or</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    variant="outline"
                    onClick={handleSignIn}
                    disabled
                    size="lg"
                    className="max-w-xs w-full relative shadow-none transition-all 
                    duration-200 bg-soft-paste-dark text-white font-bold hover:bg-secondary active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <Chrome
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Chrome className="mr-2 h-4 w-4" aria-hidden="true" />
                    )}
                    <span>
                      {isLoading ? "Signing in..." : "Sign in with Google"}
                    </span>
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Available on v0.0.2</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="mt-4 text-xs text-muted-foreground text-center px-8 max-w-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
