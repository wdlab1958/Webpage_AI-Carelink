import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "AI CareLink | 기술이 사람을 보살피다",
    template: "%s | AI CareLink",
  },
  description:
    "가족 간병·병원 동행이 필요한 보호자와 간병인·동행 매니저를 쉽게 연결합니다. 요양병원·요양원 전용 인력 요청과 급여화 증빙도 지원. 2026 간병 급여화 시범사업 대상 요양병원 500개소 내외(원안 200개소).",
  keywords: [
    "AI 간병",
    "실버 케어",
    "고령층 돌봄",
    "스마트 매칭",
    "AI 건강 모니터링",
    "간병인 매칭",
    "요양병원",
    "노인 돌봄",
    "케어링크",
    "AI CareLink",
  ],
  authors: [{ name: "WDLAB", url: "https://wdlab.kr" }],
  creator: "WDLAB",
  publisher: "WDLAB",
  metadataBase: new URL("https://www.ai-carelink.co.kr"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.ai-carelink.co.kr",
    siteName: "AI CareLink",
    title: "AI CareLink | 기술이 사람을 보살피다",
    description:
      "보호자·간병인·요양기관을 쉽게 연결하는 AI케어링크. 2026 간병 급여화 시범사업 대상 요양병원 500개소 내외(원안 200개소).",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI CareLink",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI CareLink | 기술이 사람을 보살피다",
    description:
      "보호자·간병인·요양기관을 쉽게 연결하는 AI케어링크. 2026 간병 급여화 시범사업 대상 요양병원 500개소 내외(원안 200개소).",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={noto.className} suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AccessibilityToolbar />
        <CookieConsent />
      </body>
    </html>
  );
}
