import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GEOIQ - Boost Your Brand Visibility in AI",
  description: "Improve your brand visibility in Large Language Models like ChatGPT, Claude, and Gemini with AI-powered content creation and brand monitoring.",
  keywords: "brand visibility, AI, LLM, ChatGPT, Claude, Gemini, content creation, brand monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-roboto antialiased">
        {children}
      </body>
    </html>
  );
}
