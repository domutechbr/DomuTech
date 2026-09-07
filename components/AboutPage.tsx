import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimateOnScroll from './AnimateOnScroll';
import { ArrowUpRightIcon } from './icons';

const AboutPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--domu-bg)] font-sans text-white selection:bg-[var(--domu-accent)]">
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <AnimateOnScroll>
                        <span className="text-[var(--domu-muted)] font-black text-[11px] uppercase tracking-[0.4em] mb-6 block">
                            Sobre a Domu
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight italic">
                            De agência para <br />
                            <span className="text-gradient">plataforma digital</span>
                        </h1>
                        <p className="text-[var(--domu-muted)] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            A Domu nasceu entregando sites e sistemas sob medida. Agora concentra
                            esses serviços em uma plataforma: você cria conta, escolhe o que precisa
                            e gerencia pelo painel.
                        </p>
                    </AnimateOnScroll>
                </div>
            </section>

            <section className="py-20 bg-[var(--domu-black)]">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                title: 'Produto primeiro',
                                desc: 'Conta, painel e serviços internos no mesmo fluxo, no espírito Nuvemshop.',
                            },
                            {
                                title: 'Design com propósito',
                                desc: 'Interfaces claras para contratar e operar, não só para impressionar.',
                            },
                            {
                                title: 'Autonomia do cliente',
                                desc: 'Menos orçamento por WhatsApp, mais caminho direto até o que você precisa.',
                            },
                        ].map((item, i) => (
                            <AnimateOnScroll key={item.title} delay={i * 200}>
                                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-[var(--domu-accent)] transition-all group">
                                    <div className="w-12 h-12 bg-[var(--domu-accent)]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <ArrowUpRightIcon className="w-6 h-6 text-[var(--domu-accent)]" />
                                    </div>
                                    <h3 className="text-xl font-black tracking-tighter mb-4">{item.title}</h3>
                                    <p className="text-white/40 leading-relaxed">{item.desc}</p>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <AnimateOnScroll>
                            <h2 className="h2-domu text-white mb-8">POR QUE A DOMU?</h2>
                            <div className="space-y-6 text-white/60">
                                <p>
                                    Unimos a experiência de quem já entregou projetos reais com o
                                    modelo de plataforma: um login, um painel, vários serviços.
                                </p>
                                <p>
                                    O objetivo é simples: você entra, escolhe, personaliza e opera.
                                    Sem recomeçar o funil de agência a cada necessidade nova.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="btn-budget mt-10"
                            >
                                <ArrowUpRightIcon className="w-3.5 h-3.5" />
                                Criar conta
                            </button>
                        </AnimateOnScroll>

                        <AnimateOnScroll delay={300}>
                            <div className="relative rounded-lg overflow-hidden border border-white/10">
                                <img
                                    src="/img/fundo-web.png"
                                    alt="Plataforma Domu"
                                    className="w-full opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--domu-bg)] to-transparent" />
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
