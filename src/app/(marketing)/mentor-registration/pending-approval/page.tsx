"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Clock, CheckCircle, ArrowLeft } from "lucide-react";

export default function PendingMentorRegApproval() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-2xl p-8 text-center">
        <CardContent className="space-y-8">
          {/* Icon and Status */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Clock className="w-20 h-20 text-[#4CB5C3] animate-pulse" />
              <CheckCircle className="w-8 h-8 text-[#4CB5C3] absolute -bottom-1 -right-1" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Application Under Review
            </h1>
          </div>

          {/* Message */}
          <div className="space-y-4 text-gray-600">
            <p className="text-lg">
              Thank you for applying to be a mentor with us!
            </p>
            <div className="space-y-2">
              <p>
                Your application is currently being reviewed by our admin team.
                This process typically takes 24-48 hours.
              </p>
              <p>
                We&apos;ll notify you via email once your application has been
                processed.
              </p>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="flex justify-center items-center space-x-4 py-6">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#4CB5C3] flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm mt-2 text-gray-600">Submitted</p>
            </div>
            <div className="flex-1 h-1 bg-[#4CB5C3]" />
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border-2 border-[#4CB5C3] flex items-center justify-center animate-pulse">
                <Clock className="w-5 h-5 text-[#4CB5C3]" />
              </div>
              <p className="text-sm mt-2 text-gray-600">Under Review</p>
            </div>
            <div className="flex-1 h-1 bg-gray-200" />
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-gray-200" />
              </div>
              <p className="text-sm mt-2 text-gray-400">Approved</p>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="font-semibold text-lg mb-4 text-gray-800">
              What happens next?
            </h2>
            <ul className="text-left space-y-3 text-gray-600">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-[#4CB5C3] mt-0.5" />
                <span>
                  We&apos;ll review your qualifications and experience
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-[#4CB5C3] mt-0.5" />
                <span>You&apos;ll receive an email with our decision</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-[#4CB5C3] mt-0.5" />
                <span>
                  If approved, you&apos;ll get access to your mentor dashboard
                </span>
              </li>
            </ul>
          </div>

          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="mt-8 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
