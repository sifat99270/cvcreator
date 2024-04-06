import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Load from "@/components/load";
const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const res = await fetch(`${process.env.HOST}/api/auth/graph`, {
    method: "POST",
    cache: "no-store",
  });
  const result = await res.json();
  if (result["status"] === "success") {
    return {
      metadataBase: new URL(process.env.HOST),
      title: result["data"]["title"],
      description: result["data"]["description"],
      keywords: result["data"]["keywords"],

      openGraph: {
        images: result["data"]["openGraph"],
      },
    };
  }
  return;
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className=' '>
      <body className={inter.className}>
        <Toaster />
        <Suspense
          fallback={
            <div className='  w-full h-screen flex justify-center items-center'>
              <Load />
            </div>
          }>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
