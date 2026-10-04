import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { BackgroundLines } from './components/BackgroundLines';
import { PageTransition } from './components/PageTransition';
import { SocialRail } from './components/SocialRail';
import { BrandMark } from './components/BrandMark';
import { LandingPage } from './pages/LandingPage';
import { AboutUs } from './pages/AboutUs';
import { Product } from './pages/Product';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

function ScrollToTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    const target = (state as {scrollTo?: string;} | null)?.scrollTo;
    if (target) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, state]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen w-full bg-white text-ink">
        <BackgroundLines />
        <ScrollProgress />
        <CustomCursor />
        <BrandMark />
        <Navbar />
        <SocialRail />
        <ScrollToTop />
        <main id="main">
          <PageTransition>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/product" element={<Product />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
      </div>
    </BrowserRouter>);

}