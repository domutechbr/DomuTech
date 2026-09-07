import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle } from '@phosphor-icons/react';
import { MenuIcon, XIcon } from './icons';

const NAV_ITEMS = [
    { name: 'Soluções', href: '/#solucoes' },
    { name: 'Plataforma', href: '/#plataforma' },
    { name: 'Preços', href: '/#precos' },
    { name: 'Cases', href: '/cases' },
];

const Header: React.FC = () => {
    const location = useLocation();
    const headerRef = useRef<HTMLElement>(null);
    const isHome = location.pathname === '/';
    const [spacerH, setSpacerH] = useState(isHome ? 0 : 72);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const applyChromeHeight = (h: number) => {
        setSpacerH(h);
        document.documentElement.style.setProperty('--site-chrome-h', `${h}px`);
    };

    useEffect(() => {
        localStorage.setItem('domu_theme', 'light');
        document.documentElement.classList.add('light-theme');
        document.documentElement.classList.remove('dark-theme', 'dark');
    }, []);

    useEffect(() => {
        if (!isHome) {
            const onScroll = () => setIsScrolled(window.scrollY > 16);
            onScroll();
            window.addEventListener('scroll', onScroll, { passive: true });
            return () => window.removeEventListener('scroll', onScroll);
        }

        // Home: espelha html.hero-expanded no mesmo instante do gesto
        const syncFromHero = (event?: Event) => {
            const detail = (event as CustomEvent<{ expanded?: boolean }> | undefined)?.detail;
            if (typeof detail?.expanded === 'boolean') {
                setIsScrolled(detail.expanded);
                return;
            }
            setIsScrolled(document.documentElement.classList.contains('hero-expanded'));
        };

        syncFromHero();
        window.addEventListener('domu-hero', syncFromHero);
        return () => window.removeEventListener('domu-hero', syncFromHero);
    }, [isHome]);

    useLayoutEffect(() => {
        const el = headerRef.current;
        if (!el) return;

        const syncSpacer = () => {
            if (isHome) {
                applyChromeHeight(0);
                return;
            }
            applyChromeHeight(Math.ceil(el.getBoundingClientRect().height));
        };

        syncSpacer();
        const ro = new ResizeObserver(syncSpacer);
        ro.observe(el);
        window.addEventListener('resize', syncSpacer);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', syncSpacer);
        };
    }, [isHome, isScrolled]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsMenuOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Home: logo no DOM sempre (fade via --hero-p). Outras páginas: logo sempre.
    const showLogo = true;

    return (
        <>
            <header
                ref={headerRef}
                className={[
                    'ns-header',
                    isHome ? 'is-home' : 'is-inner',
                    isScrolled ? 'is-scrolled' : '',
                    isMenuOpen ? 'is-menu-open' : '',
                ]
                    .filter(Boolean)
                    .join(' ')}
            >
                <div className="ns-header__bar">
                    <div className="ns-header__inner">
                        <div className={`ns-header__logo-slot ${showLogo ? 'is-visible' : ''}`}>
                            <Link to="/" aria-label="Domu Tech" className="ns-header__logo-link">
                                <img src="/frame-1.png" alt="DOMU TECH" className="ns-header__logo" />
                            </Link>
                        </div>

                        <nav className="ns-header__nav" aria-label="Principal">
                            {NAV_ITEMS.map((item) => (
                                <Link key={item.name} to={item.href} className="ns-header__link">
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="ns-header__actions">
                            <Link to="/login" className="ns-header__login">
                                <UserCircle className="ns-header__login-icon" weight="regular" />
                                Login
                            </Link>
                            <Link to="/login" className="ns-header__cta">
                                Criar conta
                            </Link>

                            <button
                                type="button"
                                className="ns-header__menu-btn"
                                onClick={() => setIsMenuOpen((open) => !open)}
                                aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {!isHome && (
                <div className="site-header-spacer" style={{ height: spacerH }} aria-hidden />
            )}

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="ns-header__drawer"
                    >
                        <nav className="ns-header__drawer-nav">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="ns-header__drawer-link"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="ns-header__drawer-login"
                            >
                                <UserCircle className="w-4 h-4" weight="regular" />
                                Login
                            </Link>
                            <Link
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="ns-header__drawer-cta"
                            >
                                Criar conta
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
