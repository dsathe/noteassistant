import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Ubuntu } from "next/font/google";
import Providers from '../components/Providers';
import { Toaster } from "@/components/ui/toaster";

const font = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});


export const metadata: Metadata = {
  title: "Note Assistant",
  description: "AI powered note taking app",
};

/*
    Description ->  Creating Root layout for entire web application.
                    Wraping body in providers to make use of cache for db related tasks. 
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <Providers>
          <body className={`${font.className} antialiased`}>
            <main>{children}</main>
            <Toaster />
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
