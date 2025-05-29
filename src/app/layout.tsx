import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'


import { ThemeProvider } from "@/components/theme";
import ReactQueryProvider from "@/react-query";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/redux/provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nuvue",
  description: "Share AI powered videos with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.className} bg-background text-foreground`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ReduxProvider>
              <ReactQueryProvider>
                {children}
                <Toaster />
              </ReactQueryProvider>
            </ReduxProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
