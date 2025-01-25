import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            404 - Page Not Found
          </h1>
          <p className="mt-2 text-base text-purple-100 sm:text-lg md:text-xl">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
        <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Button
            asChild
            className="bg-white text-purple-600 hover:bg-purple-100 focus:ring-purple-500 focus:ring-offset-purple-200"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white hover:text-purple-600 focus:ring-white"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Link>
          </Button>
        </div>
        <div className="mt-8">
          <p className="text-sm text-purple-100">
            If you believe this is an error, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
