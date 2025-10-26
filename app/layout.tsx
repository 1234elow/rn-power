import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "ReNewed Power - Outpatient Addiction Recovery & Support",
  description: "Empowering individuals to reclaim their lives through compassionate, evidence-based outpatient addiction recovery and therapy services in Arizona and Chicago.",
  keywords: ["addiction recovery", "outpatient treatment", "substance abuse therapy", "addiction support", "recovery services"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
