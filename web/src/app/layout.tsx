import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from '@/components/common/Toast';

export const metadata: Metadata = {
  title: '美团·周末去哪玩 - 高校探索指南桌面工作台',
  description: '美团本地生活周末出游场景调度中枢与一站式全链路履约平台（高校版）',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
