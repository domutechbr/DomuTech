import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ROTATING = [
    'crescer online',
    'lançar rápido',
    'vender mais',
    'mais vendidos',
    'escalar com clareza',
] as const;

const TYPE_MS = 55;
const DELETE_MS = 32;
const HOLD_MS = 1700;
const GAP_MS = 280;

/** Duração da animação automática do vídeo (ms) */
const ANIM_MS = 950;
/** Quanto de scroll (em vh) o vídeo leva pra encolher e encaixar na colagem */
const DOCK_VH = 1.35;
/** Segura a colagem no viewport depois do dock (evita faixa branca cedo) */
const HOLD_VH = 0.65;

const SHOWCASE_BRANDS = [
    {
        name: 'La Dolce Vita',
        slot: 'nw',
        tone: 'soft',
        img: '/projeto/img-ladolcevita.png',
    },
    {
        name: 'Alan X',
        slot: 'ne',
        tone: 'loud',
        img: '/projeto/img-AlanX.png',
    },
    {
        name: 'AGB Campinas',
        slot: 'w',
        tone: 'mark',
        img: '/projeto/img-agbcampinas.png',
    },
    {
        name: 'Dara Adv',
        slot: 'e',
        tone: 'soft',
        img: '/projeto/img-daraadv.png',
    },
    {
        name: 'Territórios',
        slot: 'sw',
        tone: 'italic',
        img: '/projeto/img-redeterritorios.png',
    },
    {
        name: 'Rio Silveira',
        slot: 'se',
        tone: 'mark',
        img: '/projeto/img-projetoriosilveira.png',
    },
] as const;

const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Crossfade limpo:
 * - 0→0.4: só a logo de baixo some (header fica em 0, sem fantasma)
 * - 0.4→1: header sobe 0→1 até opacidade cheia
 */
const logoOpacitiesFor = (p: number) => {
    const heroLogo = clamp01(1 - p / 0.55);
    const headerLogo = p <= 0.4 ? 0 : clamp01((p - 0.4) / 0.6);
    return { heroLogo, headerLogo };
};

const setHeroProgress = (p: number, root?: HTMLElement | null) => {
    const { heroLogo, headerLogo } = logoOpacitiesFor(p);
    const heroO = heroLogo.toFixed(4);
    const headerO = headerLogo.toFixed(4);
    const pStr = p.toFixed(4);

    document.documentElement.style.setProperty('--hero-p', pStr);
    document.documentElement.style.setProperty('--hero-logo-o', heroO);
    document.documentElement.style.setProperty('--header-logo-o', headerO);

    if (root) {
        root.style.setProperty('--hero-p', pStr);
        root.style.setProperty('--hero-logo-o', heroO);
    }
};

/** Header muda no frame zero: logo + nav central, sem esperar o vídeo */
const setHeaderExpanded = (expanded: boolean, p = 0, docking = false) => {
    if (expanded) {
        document.documentElement.classList.add('hero-expanded');
    } else {
        document.documentElement.classList.remove('hero-expanded');
        document.documentElement.classList.remove('hero-docking');
    }
    window.dispatchEvent(
        new CustomEvent('domu-hero', { detail: { p, expanded, docking } }),
    );
};

const applyDockProgress = (dock: number, root?: HTMLElement | null) => {
    const d = clamp01(dock);
    const dStr = d.toFixed(4);
    document.documentElement.style.setProperty('--hero-dock', dStr);
    if (root) root.style.setProperty('--hero-dock', dStr);
    const docking = d > 0.03;
    document.documentElement.classList.toggle('hero-docking', docking);
    window.dispatchEvent(
        new CustomEvent('domu-hero', {
            detail: {
                docking,
                expanded: document.documentElement.classList.contains('hero-expanded'),
            },
        }),
    );
};

const Hero: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [typedText, setTypedText] = useState('');

    const progressRef = useRef(0);
    const expandedRef = useRef(false);
    const lockingRef = useRef(false);
    const animFrameRef = useRef(0);
    const touchYRef = useRef<number | null>(null);
    const phraseIndexRef = useRef(0);
    const typedRef = useRef('');
    const typeModeRef = useRef<'type' | 'hold' | 'delete'>('type');

    useEffect(() => {
        let timer = 0;
        let cancelled = false;

        if (prefersReducedMotion()) {
            setTypedText(ROTATING[0]);
            timer = window.setInterval(() => {
                phraseIndexRef.current = (phraseIndexRef.current + 1) % ROTATING.length;
                setTypedText(ROTATING[phraseIndexRef.current]);
            }, HOLD_MS);
            return () => window.clearInterval(timer);
        }

        const schedule = (fn: () => void, ms: number) => {
            timer = window.setTimeout(() => {
                if (!cancelled) fn();
            }, ms);
        };

        const step = () => {
            const full = ROTATING[phraseIndexRef.current];
            const mode = typeModeRef.current;

            if (mode === 'type') {
                if (typedRef.current.length < full.length) {
                    typedRef.current = full.slice(0, typedRef.current.length + 1);
                    setTypedText(typedRef.current);
                    schedule(step, TYPE_MS);
                    return;
                }
                typeModeRef.current = 'hold';
                schedule(() => {
                    typeModeRef.current = 'delete';
                    step();
                }, HOLD_MS);
                return;
            }

            if (mode === 'delete') {
                if (typedRef.current.length > 0) {
                    typedRef.current = typedRef.current.slice(0, -1);
                    setTypedText(typedRef.current);
                    schedule(step, DELETE_MS);
                    return;
                }
                phraseIndexRef.current = (phraseIndexRef.current + 1) % ROTATING.length;
                typeModeRef.current = 'type';
                schedule(step, GAP_MS);
            }
        };

        schedule(step, 400);

        return () => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        setHeroProgress(0, section);
        setHeaderExpanded(false, 0);
        applyDockProgress(0, section);
        section.classList.remove('is-dockable');

        const applyP = (p: number) => {
            progressRef.current = p;
            setHeroProgress(p, section);
        };

        const unlockBody = () => {
            lockingRef.current = false;
        };

        const lockBody = () => {
            lockingRef.current = true;
        };

        const syncDockFromScroll = () => {
            if (!expandedRef.current || lockingRef.current) {
                if (!expandedRef.current) applyDockProgress(0, section);
                return;
            }
            const range = Math.max(window.innerHeight * DOCK_VH, 1);
            applyDockProgress(window.scrollY / range, section);
        };

        const markDockable = (on: boolean) => {
            section.classList.toggle('is-dockable', on);
            if (on) {
                section.style.setProperty('--hero-dock-vh', String(DOCK_VH));
                section.style.setProperty('--hero-hold-vh', String(HOLD_VH));
            } else {
                section.style.removeProperty('--hero-dock-vh');
                section.style.removeProperty('--hero-hold-vh');
            }
        };

        const animateTo = (target: 0 | 1) => {
            if (lockingRef.current) return;
            if (progressRef.current === target && expandedRef.current === (target === 1)) return;

            cancelAnimationFrame(animFrameRef.current);

            applyP(progressRef.current);
            expandedRef.current = target === 1;
            setHeaderExpanded(target === 1, progressRef.current);

            if (target === 0) {
                markDockable(false);
                applyDockProgress(0, section);
            }

            if (prefersReducedMotion()) {
                applyP(target);
                setHeaderExpanded(target === 1, target);
                markDockable(target === 1);
                window.scrollTo({ top: 0 });
                return;
            }

            lockBody();
            const from = progressRef.current;
            const start = performance.now();

            const tick = (now: number) => {
                const t = Math.min(1, (now - start) / ANIM_MS);
                const p = from + (target - from) * easeInOutCubic(t);
                applyP(p);

                if (t < 1) {
                    animFrameRef.current = requestAnimationFrame(tick);
                    return;
                }

                applyP(target);
                expandedRef.current = target === 1;
                setHeaderExpanded(target === 1, target);
                markDockable(target === 1);
                window.scrollTo({ top: 0 });
                unlockBody();
            };

            animFrameRef.current = requestAnimationFrame(tick);
        };

        const atPageTop = () => window.scrollY < 8;
        const dockNearZero = () => window.scrollY < 12;

        const onWheel = (event: WheelEvent) => {
            if (lockingRef.current) {
                event.preventDefault();
                return;
            }

            if (!expandedRef.current && event.deltaY > 0 && atPageTop()) {
                event.preventDefault();
                animateTo(1);
                return;
            }

            if (expandedRef.current && event.deltaY < 0 && dockNearZero()) {
                event.preventDefault();
                window.scrollTo({ top: 0 });
                animateTo(0);
                return;
            }
        };

        const onTouchStart = (event: TouchEvent) => {
            touchYRef.current = event.touches[0]?.clientY ?? null;
        };

        const onTouchMove = (event: TouchEvent) => {
            if (touchYRef.current == null) return;
            const y = event.touches[0]?.clientY ?? touchYRef.current;
            const delta = touchYRef.current - y;

            if (lockingRef.current) {
                event.preventDefault();
                return;
            }

            if (!expandedRef.current && delta > 24 && atPageTop()) {
                event.preventDefault();
                touchYRef.current = null;
                animateTo(1);
                return;
            }

            if (expandedRef.current && delta < -24 && dockNearZero()) {
                event.preventDefault();
                touchYRef.current = null;
                window.scrollTo({ top: 0 });
                animateTo(0);
            }
        };

        const onTouchEnd = () => {
            touchYRef.current = null;
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (lockingRef.current) {
                if (
                    event.key === 'ArrowDown' ||
                    event.key === 'ArrowUp' ||
                    event.key === 'PageDown' ||
                    event.key === 'PageUp' ||
                    event.key === ' '
                ) {
                    event.preventDefault();
                }
                return;
            }

            if (
                !expandedRef.current &&
                atPageTop() &&
                (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ')
            ) {
                event.preventDefault();
                animateTo(1);
                return;
            }

            if (
                expandedRef.current &&
                dockNearZero() &&
                (event.key === 'ArrowUp' || event.key === 'PageUp')
            ) {
                event.preventDefault();
                window.scrollTo({ top: 0 });
                animateTo(0);
            }
        };

        let dockFrame = 0;
        const onScroll = () => {
            cancelAnimationFrame(dockFrame);
            dockFrame = requestAnimationFrame(syncDockFromScroll);
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            cancelAnimationFrame(dockFrame);
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            unlockBody();
            document.documentElement.style.removeProperty('--hero-p');
            document.documentElement.style.removeProperty('--hero-logo-o');
            document.documentElement.style.removeProperty('--header-logo-o');
            document.documentElement.style.removeProperty('--hero-dock');
            document.documentElement.classList.remove('hero-expanded', 'hero-docking');
            section.classList.remove('is-dockable');
        };
    }, []);

    return (
        <section
            id="home"
            ref={sectionRef}
            className="ns-hero"
            style={{ ['--hero-p' as string]: 0, ['--hero-dock' as string]: 0 }}
        >
            <div className="ns-hero__stage">
                <div className="ns-hero__layout">
                    <div className="ns-hero__content">
                        <img
                            src="/frame-1.png"
                            alt="DOMU TECH"
                            className="ns-hero__logo"
                        />

                        <h1 className="ns-hero__title">
                            Mais do que um site.
                            <span className="ns-hero__title-line">
                                A base para sua marca{' '}
                                <em className="ns-hero__emph" aria-label={typedText || undefined}>
                                    {typedText}
                                </em>
                            </span>
                        </h1>

                        <div className="ns-hero__actions">
                            <Link to="/login" className="ns-hero__btn ns-hero__btn--primary">
                                Criar conta
                            </Link>
                            <Link to="/login" className="ns-hero__btn ns-hero__btn--ghost">
                                Falar com a Domu
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="ns-hero__showcase" aria-hidden>
                    <div className="ns-hero__showcase-frame">
                        {SHOWCASE_BRANDS.map((brand) => (
                            <figure
                                key={brand.name}
                                className={`ns-hero__brand ns-hero__brand--${brand.slot} ns-hero__brand--${brand.tone}`}
                            >
                                <img
                                    src={brand.img}
                                    alt=""
                                    className="ns-hero__brand-img"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <figcaption className="ns-hero__brand-name">{brand.name}</figcaption>
                            </figure>
                        ))}

                        <p className="ns-hero__showcase-title">
                            <strong>+50</strong> marcas crescendo com a Domu
                        </p>
                    </div>
                </div>

                <div
                    className="ns-hero__media"
                    onMouseEnter={() => {
                        const v = videoRef.current;
                        if (v && !v.paused) v.pause();
                    }}
                    onMouseLeave={() => {
                        const v = videoRef.current;
                        if (v && v.paused) {
                            void v.play().catch(() => {});
                        }
                    }}
                >
                    <div className="ns-hero__media-frame">
                        <video
                            ref={videoRef}
                            className="ns-hero__video"
                            src="/videos/hero-tech.mp4?v=2"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="Vídeo demonstrativo de tecnologia"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
