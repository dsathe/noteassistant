import { Button } from "@/components/ui/button";
import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="bg-gradient-to-r min-h-screen grainy">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-7xl font-semibold text-center">
          Welcome to {' '}<span className="text-green-600 font-bold">Note Assistant
          </span>!
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700">
          <TypewriterTitle />
        </h2>
        <div className="mt-4 flex justify-center">
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-green-600 font-semibold">
                Get Started <ArrowRight className="ml-1 h-5 w-5" strokeWidth={3} />
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard">
              <Button className="bg-green-600 font-semibold">
                Get Started <ArrowRight className="ml-1 h-5 w-5" strokeWidth={3} />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  )
}