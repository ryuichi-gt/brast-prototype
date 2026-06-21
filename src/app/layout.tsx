import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BRAST — Brand Strategy OS",
  description:
    "BRAST は、AIが週次でメディア戦略を作り切ってプレゼンしてくる「超優秀な部下」。あなたは上司としてレビュー・承認するだけ。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
