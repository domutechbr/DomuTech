import React from 'react';
import { Link } from 'react-router-dom';
import AnimateOnScroll from './AnimateOnScroll';
import BrandGhosts from './BrandGhosts';
import { ArrowUpRightIcon } from './icons';

const STEPS = [
    {
        title: 'Conta',
        text: 'Você cria o login e entra na plataforma Domu.',
    },
    {
        title: 'Escolha',
        text: 'Seleciona o serviço ou template que faz sentido pro negócio.',
    },
    {
        title: 'Personalização',
        text: 'Ajusta conteúdo, plano e detalhes direto no painel.',
    },
    {
        title: 'Operação',
        text: 'Publica, acompanha e evolui tudo em um só lugar.',
    },
] as const;

const About: React.FC = () => {
    return (
        <section id="about" className="about-pro relative overflow-hidden">
            <BrandGhosts variant="corners" opacity={0.05} />
            <div className="mx-auto w-full max-w-[92rem] page-pad-x relative z-10 py-8 md:py-12 lg:py-14">
                <div className="process-pro-card">
                    <BrandGhosts variant="spread" opacity={0.05} className="process-pro-card__ghosts" />

                    <AnimateOnScroll>
                        <div className="process-pro-card__header">
                            <p>Como a plataforma funciona</p>
                            <h2>Do login ao resultado, no seu ritmo.</h2>
                            <span>
                                Um fluxo simples: conta, escolha, personalização e operação contínua.
                            </span>
                        </div>
                    </AnimateOnScroll>

                    <div className="process-flow">
                        {STEPS.map((step, index) => (
                            <AnimateOnScroll key={step.title} delay={index * 60}>
                                <div className={`process-flow__item ${index % 2 === 0 ? 'is-left' : 'is-right'}`}>
                                    <div className="process-flow__card">
                                        <div className="process-flow__card-top">
                                            <span className="process-flow__number">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h3>{step.title}</h3>
                                        </div>
                                        <p>{step.text}</p>
                                    </div>
                                    <span className="process-flow__dot" aria-hidden />
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>

                    <AnimateOnScroll delay={220}>
                        <div className="process-pro-card__footer">
                            <p>Quer começar agora?</p>
                            <Link to="/login" className="btn-budget group">
                                Criar conta
                                <ArrowUpRightIcon className="w-4 h-4" />
                            </Link>
                        </div>
                    </AnimateOnScroll>
                </div>
            </div>
        </section>
    );
};

export default About;
