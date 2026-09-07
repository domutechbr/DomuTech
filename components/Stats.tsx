import React, { useMemo } from 'react';
import {
  Briefcase,
  CalendarBlank,
  ChartLineUp,
  UsersThree,
  Lightning,
  SealCheck,
  Headset,
  CodeBlock,
} from '@phosphor-icons/react';
import AnimateOnScroll from './AnimateOnScroll';
import BrandGhosts from './BrandGhosts';

type Tone = 'light' | 'blue' | 'dark' | 'soft';

type StatItem = {
  value: string;
  label: string;
  desc: string;
  icon: typeof Briefcase;
};

const STATS: StatItem[] = [
  {
    value: '15+',
    label: 'Projetos na base',
    desc: 'Sites e soluções que validam o modelo da plataforma Domu.',
    icon: Briefcase,
  },
  {
    value: '3+',
    label: 'Anos de mercado',
    desc: 'Experiência que agora vira produto: conta, painel e serviços digitais.',
    icon: CalendarBlank,
  },
  {
    value: '95+',
    label: 'Performance média',
    desc: 'Velocidade, SEO e conversão como padrão das entregas na plataforma.',
    icon: ChartLineUp,
  },
  {
    value: '12+',
    label: 'Tecnologias',
    desc: 'Stack moderna por trás do painel, dos sites e das automações.',
    icon: CodeBlock,
  },
  {
    value: '40+',
    label: 'Empresas atendidas',
    desc: 'Negócios que já confiaram na Domu e agora entram pelo mesmo funil de conta.',
    icon: UsersThree,
  },
  {
    value: '1',
    label: 'Painel único',
    desc: 'Contrate e gerencie serviços sem trocar de ferramenta a cada projeto.',
    icon: SealCheck,
  },
  {
    value: '24h',
    label: 'Acesso à conta',
    desc: 'Sua operação digital disponível quando você precisar.',
    icon: Headset,
  },
  {
    value: '3',
    label: 'Passos para começar',
    desc: 'Criar conta, escolher o serviço e personalizar no painel.',
    icon: Lightning,
  },
];

const TONES: Tone[] = ['light', 'light', 'blue', 'blue', 'dark', 'dark', 'soft', 'soft'];
const FALLBACK_TONES: Tone[] = ['blue', 'light', 'soft', 'dark', 'dark', 'soft', 'blue', 'light'];

function tonesDoNotTouch(tones: Tone[], columns: number) {
  return tones.every((tone, index) => {
    const touchesLeft = index % columns !== 0 && tones[index - 1] === tone;
    const touchesAbove = index >= columns && tones[index - columns] === tone;
    return !touchesLeft && !touchesAbove;
  });
}

function createTonePattern() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const shuffled = [...TONES];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }

    if ([1, 2, 4].every((columns) => tonesDoNotTouch(shuffled, columns))) {
      return shuffled;
    }
  }

  return FALLBACK_TONES;
}

const Stats: React.FC = () => {
  const tonePattern = useMemo(createTonePattern, []);

  return (
    <section id="stats" className="section-domu tone-snow relative overflow-hidden">
      <BrandGhosts variant="corners" />

      <div className="mx-auto w-full max-w-[92rem] page-pad-x relative z-10">
        <AnimateOnScroll>
          <div className="text-center section-head-domu max-w-2xl mx-auto">
            <span className="tag-domu mb-4 block">Números da Domu</span>
            <h2 className="h2-domu text-gradient">
              Resultados que<br className="hidden sm:block" /> sustentam a plataforma
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="stats-grid">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <AnimateOnScroll key={stat.label} delay={60 + index * 55}>
                <article className={`stats-card stats-card--${tonePattern[index]}`}>
                  <div className="stats-card__top">
                    <span className="stats-card__icon" aria-hidden>
                      <Icon className="w-5 h-5" weight="duotone" />
                    </span>
                    <span className="stats-card__idx">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="stats-card__value">{stat.value}</p>
                  <h3 className="stats-card__label">{stat.label}</h3>
                  <p className="stats-card__desc">{stat.desc}</p>
                </article>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
