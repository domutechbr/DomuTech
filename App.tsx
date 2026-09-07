import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutPage from './components/AboutPage';
import CasesPage from './components/CasesPage';
import About from './components/About';
import Stats from './components/Stats';
import Values from './components/Values';
import Portfolio from './components/Portfolio';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CallToAction from './components/CallToAction';
import CookieBanner from './components/CookieBanner';
import LayoutStorePage from './components/LayoutStorePage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

const HomePage = () => (
  <>
    <Hero />
    <div id="solucoes">
      <Values />
    </div>
    <Portfolio />
    <div id="plataforma">
      <Features />
    </div>
    <About />
    <Stats />
    <div id="precos">
      <CallToAction
        title="Pronto para começar na Domu?"
        subtitle="Crie sua conta e acesse o painel para contratar e personalizar os serviços da plataforma."
        primaryButtonText="Criar conta"
        primaryButtonLink="/login"
        variant="platform"
      />
    </div>
    <Testimonials />
    <FAQ />
    <CallToAction
      title="Sua operação digital em um só lugar."
      subtitle="Sites, automações e serviços sob medida. Entre na plataforma e gerencie tudo pelo painel."
      primaryButtonText="Criar conta"
      primaryButtonLink="/login"
      variant="platform"
    />
  </>
);

/** URLs antigas de agência: manda pro login da plataforma */
const LegacyToLogin = () => <Navigate to="/login" replace />;

const App: React.FC = () => {
  const location = useLocation();
  const isShellFree =
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/painel');

  return (
    <div className="bg-[var(--domu-bg)] selection:bg-[var(--domu-accent)] selection:text-white w-full relative">
      {!isShellFree && <Header />}
      <main className="w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/painel" element={<DashboardPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/layouts" element={<LayoutStorePage />} />

          <Route path="/chatbot-placeholder" element={<LegacyToLogin />} />
          <Route path="/servico/*" element={<LegacyToLogin />} />
        </Routes>
      </main>
      {!isShellFree && (
        <>
          <Footer />
          <CookieBanner />
        </>
      )}
    </div>
  );
};

export default App;
