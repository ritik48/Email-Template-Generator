import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto min-h-[calc(100vh-64px)] flex flex-col p-4">
        <div className="flex flex-col text-center flex-1 mt-[150px] items-center">
          <h1 className="text-4xl sm:text-6xl font-semibold">
            <span className="text-blue-500">AI-Powered</span> Email Templates
          </h1>
          <p className="sm:text-lg text-gray-700 sm:w-[50%] text-center mt-4">
            Generate smart, ready-to-send emails in seconds—perfect for
            outreach, follow-ups, and more.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <Button className="cursor-pointer">Get Started</Button>
            <Button variant={"outline"} className="cursor-pointer">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
