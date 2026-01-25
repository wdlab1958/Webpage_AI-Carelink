import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "AI CareLink | 기술이 사람을 보살피다",
  description: "AI 기반 고령층 통합 돌봄 플랫폼. 환자, 보호자, 간병인을 위한 지능형 매칭 및 스마트 케어 솔루션.",
  keywords: "AI 간병, 실버 케어, 고령층 돌봄, 스마트 매칭, AI 건강 모니터링",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={noto.className} suppressHydrationWarning>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
