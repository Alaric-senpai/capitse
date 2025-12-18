import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const VerificationPage = () => {
  return (
    <div className="w-full min-h-[calc(100vh-56px)] bg-gray-50 flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-[600px] flex flex-col items-center gap-6">
        {/* Header Section */}
        <div className="w-full flex flex-col items-center gap-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            SMS Phone Verification
          </h1>
          <p className="text-sm text-gray-600 font-medium">
            Enter the SMS code that was sent to your Mobile Number.
          </p>
        </div>

        {/* Verification Card */}
        <div className="w-full max-w-[400px] bg-white rounded-md shadow-md border-[1.5px] border-black/30 p-8">
          <div className="flex flex-col gap-5  w-[85%] mx-auto">
            <p className="text-sm font-medium text-black/75  ">
              SMS Code <span className="text-red-500">*</span> ( Please Note
              that the code might be a little bit delay due to your mobile
              network)
            </p>
            <Input
              id="sms-code"
              type="text"
              placeholder="Enter Code"
              className="h-10 text-sm border-2 border-gray-300 rounded-sm"
            />
            <Button
              className="w-full h-11 mt-1 text-white font-medium text-base hover:opacity-90"
              style={{ backgroundColor: "#0070A8" }}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
