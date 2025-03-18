"use client"; // Add this directive for Next.js 13+
import React from 'react'; // Import React
import { RecoilRoot } from 'recoil';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot> {/* Wrap your app with RecoilRoot */}
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}