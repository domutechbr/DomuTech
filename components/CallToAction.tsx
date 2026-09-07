import React from 'react';
import { Link } from 'react-router-dom';
import AnimateOnScroll from './AnimateOnScroll';
import { WhatsAppIcon, ArrowUpRightIcon } from './icons';

interface CallToActionProps {
    title: string;
    subtitle: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    variant?: 'whatsapp' | 'budget' | 'platform';
    supportText?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
    title,
    subtitle,
    primaryButtonText,
    primaryButtonLink,
    variant = 'platform',
    supportText,
}) => {
    const isExternal = primaryButtonLink.startsWith('http');
    const resolvedSupport =
        supportText ??
        (variant === 'whatsapp'
            ? 'Resposta média em menos de 15 minutos'
            : variant === 'budget'
              ? 'Orçamento rápido e sem compromisso'
              : 'Acesso imediato ao painel da plataforma');

    const buttonClass = variant === 'whatsapp' ? 'btn-whatsapp' : 'btn-budget';

    const buttonContent = (
        <>
            {variant === 'whatsapp' ? (
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
            ) : (
                <ArrowUpRightIcon className="w-3.5 h-3.5" />
            )}
            {primaryButtonText}
        </>
    );

    return (
        <section className="section-domu tone-paper">
            <div className="mx-auto w-full max-w-[92rem] page-pad-x">
                <AnimateOnScroll>
                    <div className="on-dark relative p-7 md:p-12 lg:p-14 rounded-lg md:rounded-lg overflow-hidden border border-white/10 shadow-[0_10px_28px_-18px_rgba(10,15,24,0.2)]">
                        <div className="absolute -top-24 -right-16 w-72 h-72 bg-[var(--domu-accent)]/18 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-28 -left-20 w-80 h-80 bg-[var(--domu-accent)]/10 rounded-full blur-[110px] pointer-events-none" />
                        <div
                            className="absolute inset-0 opacity-[0.04] pointer-events-none"
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                                backgroundSize: '28px 28px',
                            }}
                        />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
                            <div className="text-center lg:text-left">
                                <h2 className="cta-title !text-white mb-3 md:mb-4">{title}</h2>
                                <p className="type-card-desc !text-white/60 mb-2 max-w-lg mx-auto lg:mx-0">
                                    {subtitle}
                                </p>
                            </div>

                            <div className="flex flex-col items-center lg:items-end">
                                <div className="flex flex-col items-center">
                                    {isExternal ? (
                                        <a
                                            href={primaryButtonLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${buttonClass} !text-white`}
                                        >
                                            {buttonContent}
                                        </a>
                                    ) : (
                                        <Link
                                            to={primaryButtonLink}
                                            className={`${buttonClass} !text-white`}
                                        >
                                            {buttonContent}
                                        </Link>
                                    )}
                                    <span className="cta-support mt-3.5 md:mt-4 text-center">
                                        {resolvedSupport}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    );
};

export default CallToAction;
