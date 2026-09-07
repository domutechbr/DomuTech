import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  DeviceMobileCamera,
  MagnifyingGlass,
  CodeBlock,
  Lightning,
  SquaresFour,
  ShieldCheck,
} from "@phosphor-icons/react";
import AnimateOnScroll from "./AnimateOnScroll";
import BrandGhosts from "./BrandGhosts";
import { ArrowUpRightIcon } from "./icons";

const IconResponsivo = () => <DeviceMobileCamera className="w-5 h-5" weight="duotone" />;
const IconSEO = () => <MagnifyingGlass className="w-5 h-5" weight="duotone" />;
const IconTech = () => <CodeBlock className="w-5 h-5" weight="duotone" />;
const IconConversao = () => <Lightning className="w-5 h-5" weight="duotone" />;
const IconLayout = () => <SquaresFour className="w-5 h-5" weight="duotone" />;
const IconSecurity = () => <ShieldCheck className="w-5 h-5" weight="duotone" />;

const FEATURES = [
  {
    Icon: IconResponsivo,
    title: "Tudo em um painel",
    paragraphs: [
      "Sites, layouts e serviços digitais no mesmo login. Você não precisa abrir um orçamento novo a cada necessidade.",
      "A ideia é autonomia: entra na conta, escolhe o que precisa e acompanha o status sem depender de um funil de WhatsApp.",
    ],
  },
  {
    Icon: IconSEO,
    title: "Produtos prontos para crescer",
    paragraphs: [
      "Templates e serviços pensados para conversão, performance e SEO desde o começo.",
      "Você personaliza o que o plano libera, com foco em resultado de negócio, não só em página bonita.",
    ],
  },
  {
    Icon: IconTech,
    title: "Stack moderna por baixo",
    paragraphs: [
      "React, infraestrutura em nuvem e padrões de produto SaaS sustentam a plataforma.",
      "O mesmo cuidado técnico que a Domu já usava em projetos sob medida agora vira base do painel multi-cliente.",
    ],
  },
  {
    Icon: IconConversao,
    title: "Contratação sem atrito",
    paragraphs: [
      "O fluxo principal é criar conta e seguir no painel, no espírito Nuvemshop: landing apresenta, login abre a operação.",
      "Menos troca de mensagem, mais caminho claro até o serviço publicado.",
    ],
  },
  {
    Icon: IconLayout,
    title: "Layouts e serviços internos",
    paragraphs: [
      "A loja de layouts e os serviços da Domu passam a viver dentro da plataforma, não como menu de agência.",
      "Você escolhe, personaliza e opera a partir da sua conta.",
    ],
  },
  {
    Icon: IconSecurity,
    title: "Conta segura e contínua",
    paragraphs: [
      "Acesso por login, isolamento por cliente e manutenção pensada para o serviço ficar no ar com estabilidade.",
      "Suporte entra quando precisar, mas o dia a dia roda na sua conta.",
    ],
  },
];

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="section-domu tone-mist relative overflow-visible"
    >
      <BrandGhosts variant="sides" />
      <div className="mx-auto max-w-[92rem] page-pad-x relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.15fr)] gap-8 lg:gap-12 items-start">
          {/* ── Coluna esquerda - Sticky ─────────────────── */}
          <div className="lg:sticky lg:top-24 self-start flex flex-col items-center lg:items-start text-center lg:text-left min-w-0">
            {/* SVG Filter for Video Chroma Key (Luminance based background removal) */}
            <svg width="0" height="0" className="absolute pointer-events-none" style={{ position: "absolute", width: 0, height: 0 }}>
              <defs>
                <filter id="keyout-black" colorInterpolationFilters="sRGB">
                  <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            2 2 2 0 -0.15"
                  />
                </filter>
              </defs>
            </svg>

            {/* Mascote Branding Video */}
            <div className="relative w-full max-w-[240px] md:max-w-[320px] mx-auto lg:mx-0 mb-2">
              <video
                src="/img/video-domu.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover block"
                style={{ filter: "url(#keyout-black) saturate(1.2)" }}
              />
            </div>

            {/* CTA below logo */}
            <div className="px-2 w-full max-w-sm">
              <h3 className="type-card-title text-gradient mb-4">
                Pronto para entrar na plataforma?
              </h3>
              <Link to="/login" className="btn-budget group">
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
                Criar conta
              </Link>
            </div>
          </div>

          {/* ── Coluna direita - Lista de funcionalidades ───────────── */}
          <div className="pt-4 lg:pt-2 min-w-0 w-full overflow-hidden">
            <AnimateOnScroll>
              <div className="text-left section-head-domu">
                <span className="tag-domu mb-3 block">
                  O QUE VOCÊ ENCONTRA NA PLATAFORMA
                </span>
                <h2 className="h2-domu text-gradient">
                  Recursos para crescer com autonomia
                </h2>
              </div>
            </AnimateOnScroll>

            <div className="divide-y divide-white/5">
              {FEATURES.map((item, index) => (
                <AnimateOnScroll key={index} delay={index * 60}>
                    <div className="flex flex-col sm:flex-row gap-5 py-5 md:py-6 group items-start text-left min-w-0">
                    {/* Ícone quadrado - Clean Design */}
                    <div className="icon-tile w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--domu-accent)]/15">
                      <item.Icon />
                    </div>

                    <div className="min-w-0 flex-1 w-full">
                      <h4 className="feature-item-title type-card-title text-[var(--domu-accent)] mb-2">
                        {item.title}
                      </h4>
                      <div className="type-card-desc opacity-95 text-justify">
                        {item.paragraphs.map((p, i) => (
                          <p
                            key={i}
                            className={
                              i !== item.paragraphs.length - 1 ? "mb-3" : ""
                            }
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
