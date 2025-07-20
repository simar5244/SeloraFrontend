"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import dynamic from 'next/dynamic';
import Footer from "@/components/ui/footer";
import VideoPreloader from "@/components/video-preloader";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  return (
    <>
      <VideoPreloader />
      <main className="relative flex grow flex-col">{children}</main>
      <Footer />
    </>
  );
}
