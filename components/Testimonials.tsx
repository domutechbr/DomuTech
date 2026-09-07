import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { CaretLeft, CaretRight, Quotes } from "@phosphor-icons/react";
import AnimateOnScroll from "./AnimateOnScroll";
import BrandGhosts from "./BrandGhosts";

const RAW_TESTIMONIALS = [
  {
    name: "Ricardo Porcher",
    company: "VERSI BR",
    text: "Projeto desafiador de prazo no rebranding. Comunicação fluida e entrega antes do previsto. Custo-benefício decisivo. Parabéns à Domu Tech!",
  },
  {
    name: "Jaque Pivato",
    company: "REFRISAT",
    text: "Empresa organizada, com boa estrutura para criar sites. Revisões claras, prazos cumpridos e design profissional. Recomendo muito o trabalho da equipe.",
  },
  {
    name: "Flora Nicotero",
    company: "EDUARDO VEÍCULOS ANTIGOS",
    text: "Experiência incrível! Mesmo sem ser tech, a ferramenta de feedback foi fácil. Site moderno, processo suave e resultado lindo. Super recomendo!",
  },
  {
    name: "Daniele Neves",
    company: "ALDANTH",
    text: "Upgrade incrível no nosso site. Desenvolvimento simples, sem deixar de atender as demandas. Acompanharam tudo com paciência. Obrigado, Domu Tech!",
  },
  {
    name: "Marco Castello",
    company: "ESSENTIAL IDIOMAS",
    text: "Muito satisfeitos com o site da Essential. Equipe atenciosa, com bons insights e sempre disposta. Resultado excelente em performance e SEO.",
  },
];

const GAP = 16;

/** Quantos cards cabem inteiros - nunca mostra pedaço cortado */
const getVisibleCards = (width: number) => {
  if (width < 540) return 1;   // mobile
  if (width < 900) return 2;   // tablet
  return 3;                    // desktop - cards mais largos, texto completo legível
};

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  const N = RAW_TESTIMONIALS.length;
  const items = [...RAW_TESTIMONIALS, ...RAW_TESTIMONIALS, ...RAW_TESTIMONIALS];

  const visibleCards = containerW > 0 ? getVisibleCards(containerW) : 1;
  const gapsTotal = GAP * Math.max(visibleCards - 1, 0);
  // floor evita 1px de overflow que corta a ponta do último card
  const slideW =
    containerW > 0
      ? Math.floor((containerW - gapsTotal) / visibleCards)
      : 280;
  const STEP = slideW + GAP;
  // sobra de pixels do floor - centraliza visualmente com padding no track
  const trackPad = Math.max(
    0,
    Math.floor((containerW - (slideW * visibleCards + gapsTotal)) / 2),
  );

  const [current, setCurrent] = useState(N);
  const currentRef = useRef(N);
  const animControls = useRef<{ stop: () => void } | null>(null);
  const visibleRef = useRef(visibleCards);

  const trackX = useMotionValue(0);

  const goTo = useCallback(
    (idx: number) => {
      if (STEP <= 0) return;

      // Interrompe animação em curso - clique rápido sem esperar
      animControls.current?.stop();

      currentRef.current = idx;
      setCurrent(idx);

      const target = idx;
      animControls.current = animate(trackX, -(idx * STEP) + trackPad, {
        type: "spring",
        stiffness: 320,
        damping: 34,
        mass: 0.8,
        onComplete: () => {
          if (currentRef.current !== target) return;

          let normalized = target;
          if (target >= N * 2) normalized = target - N;
          else if (target < N) normalized = target + N;

          if (normalized !== target) {
            currentRef.current = normalized;
            setCurrent(normalized);
            trackX.set(-(normalized * STEP) + trackPad);
          }
        },
      });
    },
    [N, STEP, trackX, trackPad],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      setContainerW(Math.floor(el.clientWidth));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Reposiciona quando muda largura / quantidade visível
  useEffect(() => {
    if (containerW <= 0) return;
    // se mudou o nº de cards visíveis, mantém o índice real
    if (visibleRef.current !== visibleCards) {
      visibleRef.current = visibleCards;
    }
    trackX.set(-(currentRef.current * STEP) + trackPad);
  }, [containerW, STEP, trackPad, trackX, visibleCards]);

  const onDragEnd = (_: unknown, info: { velocity: { x: number } }) => {
    const v = info.velocity.x;
    const x = trackX.get();
    const raw =
      -(x - trackPad) / STEP + (v < -300 ? 0.5 : v > 300 ? -0.5 : 0);
    goTo(Math.round(raw));
  };

  const realIndex = (((current % N) + N) % N);

  const navBtnClass =
    "w-10 h-10 flex items-center justify-center rounded-full border border-[var(--domu-border)] bg-[var(--domu-surface-1)] text-[var(--domu-primary)] shadow-[0_8px_24px_-12px_rgba(10,15,24,0.25)] hover:border-[var(--domu-accent)]/40 hover:text-[var(--domu-accent)] transition-all flex-shrink-0";

  return (
    <section
      id="testimonials"
      className="section-domu tone-soft relative overflow-hidden"
    >
      <BrandGhosts variant="spread" />

      <div className="mx-auto w-full max-w-[92rem] page-pad-x relative z-10">
        <AnimateOnScroll>
          <div className="text-center section-head-domu">
            <span className="tag-domu mb-3 block">Quem já confia na Domu</span>
            <h2 className="h2-domu text-gradient">
              Empresas que cresceram com a gente
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Track em largura total - setas ficam embaixo para não roubar espaço nem sobrepor */}
        <div
          ref={containerRef}
          className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <motion.div
            drag="x"
            dragElastic={0.08}
            onDragEnd={onDragEnd}
            style={{ x: trackX, display: "flex", gap: GAP }}
          >
            {items.map((item, i) => (
              <article
                key={`${item.name}-${i}`}
                style={{
                  width: slideW,
                  minWidth: slideW,
                  maxWidth: slideW,
                }}
                className="testimonial-card group box-border bg-[var(--domu-surface-1)] border border-[var(--domu-border)] rounded-2xl p-5 md:p-6 flex flex-col flex-shrink-0 shadow-[0_16px_40px_-28px_rgba(10,15,24,0.2)] transition-colors duration-300 hover:border-[var(--domu-accent)]/30"
              >
                <div className="flex items-start justify-between gap-3 mb-4 shrink-0">
                  <Quotes className="w-8 h-8 text-[var(--domu-accent)]" weight="duotone" />
                  <span className="type-eyebrow !text-[var(--domu-accent)]/45">
                    {String((i % N) + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="testimonial-card__text !text-[var(--domu-secondary)] flex-1 italic">
                  “{item.text}”
                </p>

                <div className="mt-auto pt-4 border-t border-[var(--domu-border)] shrink-0">
                  <h4 className="text-[0.9375rem] font-bold text-[var(--domu-accent)] mb-0.5 leading-tight">
                    {item.name}
                  </h4>
                  <span className="type-eyebrow !text-[var(--domu-muted)]">
                    {item.company}
                  </span>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => goTo(currentRef.current - 1)}
            className={navBtnClass}
            aria-label="Avaliação anterior"
          >
            <CaretLeft className="w-5 h-5" weight="bold" />
          </button>
          <span className="type-caption tabular-nums !text-[var(--domu-muted)] min-w-[4.5rem] text-center">
            {String(realIndex + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => goTo(currentRef.current + 1)}
            className={navBtnClass}
            aria-label="Próxima avaliação"
          >
            <CaretRight className="w-5 h-5" weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
