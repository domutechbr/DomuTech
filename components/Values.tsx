
import React from 'react';
import { DesktopTower, GearSix, Lightning } from '@phosphor-icons/react';
import AnimateOnScroll from './AnimateOnScroll';
import BrandGhosts from './BrandGhosts';

const STEPS = [
    {
        title: 'Crie sua conta',
        desc: 'Cadastre-se na Domu em poucos minutos e entre no painel da plataforma.',
        icon: DesktopTower,
    },
    {
        title: 'Escolha o que precisa',
        desc: 'Site, automação, layout ou outro serviço: selecione, personalize e defina o plano no painel.',
        icon: GearSix,
    },
    {
        title: 'Gerencie no painel',
        desc: 'Acompanhe status, edite o que for permitido e evolua sua operação digital em um só lugar.',
        icon: Lightning,
    },
] as const;

const Values: React.FC = () => {
    return (
        <section id="values" className="section-domu tone-paper relative overflow-hidden">
            <BrandGhosts variant="spread" />
            <div className="mx-auto w-full max-w-[92rem] page-pad-x relative z-10">
                <AnimateOnScroll>
                    <div className="text-center section-head-domu max-w-3xl mx-auto">
                        <span className="tag-domu mb-4 block">
                            Como funciona a Domu
                        </span>
                        <h2 className="h2-domu text-gradient">
                            Da conta ao painel,<br />
                            sem burocracia
                        </h2>
                    </div>
                </AnimateOnScroll>

                <div className="grid md:grid-cols-3 gap-4 md:gap-5">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <AnimateOnScroll key={step.title} delay={index * 120}>
                                <article className="group relative flex flex-col h-full rounded-2xl bg-[var(--domu-surface-1)] border border-[var(--domu-border)] p-6 md:p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[var(--domu-accent)]/40 hover:shadow-[0_28px_50px_-32px_rgba(10,10,11,0.28)]">
                                    <div className="absolute inset-x-0 top-0 h-[3px] bg-[var(--domu-accent)] -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

                                    <div className="flex items-center justify-between gap-3 mb-6">
                                        <div className="icon-tile w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                                            <Icon className="w-5 h-5" weight="duotone" />
                                        </div>
                                        <span className="type-eyebrow !text-[var(--domu-accent)]/50 group-hover:!text-[var(--domu-accent)] transition-colors">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <h3 className="type-card-title text-[var(--domu-primary)] mb-2.5 group-hover:text-[var(--domu-accent)] transition-colors duration-300">
                                        {step.title}
                                    </h3>

                                    <p className="type-card-desc">
                                        {step.desc}
                                    </p>
                                </article>
                            </AnimateOnScroll>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Values;
