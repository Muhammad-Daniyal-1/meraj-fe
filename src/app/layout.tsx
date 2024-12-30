import "@/ui/global.css";
import { inter } from "@/ui/fonts";
import { Metadata } from "next";
import ClientProvider from "./ClientProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | Meraj",
    default: "Meraj",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
