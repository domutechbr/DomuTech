import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramLogo } from '@phosphor-icons/react';
import { ArrowUpRightIcon } from './icons';
import AnimateOnScroll from './AnimateOnScroll';

const CONTACT = {
    instagram: 'https://www.instagram.com/domu_tech/',
};

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer id="footer" className="site-footer site-footer--dark">
            <div className="mx-auto max-w-[92rem] page-pad-x">
                <AnimateOnScroll>
                    <div className="footer-cta-pro">
                        <div>
                            <p className="footer-cta-pro__eyebrow">Entre na plataforma</p>
                            <h2>Seu próximo passo começa com uma conta Domu.</h2>
                            <p>
                                Crie sua conta, escolha o que precisa e gerencie sites e serviços
                                em um painel só.
                            </p>
                        </div>
                        <div className="footer-cta-pro__actions">
                            <Link to="/login" className="btn-budget">
                                Criar conta
                                <ArrowUpRightIcon className="w-3.5 h-3.5" />
                            </Link>
                            <Link to="/login" className="footer-whatsapp-link">
                                Já tenho conta: Login
                            </Link>
                        </div>
                    </div>
                </AnimateOnScroll>

                <div className="footer-main-pro">
                    <div className="footer-brand-pro">
                        <Link to="/" aria-label="Domu Tech">
                            <img src="/frame-1.png" alt="DOMU TECH" className="site-logo" />
                        </Link>
                        <p>
                            Plataforma para empresas que querem contratar e gerenciar soluções
                            digitais em um só lugar.
                        </p>
                        <div className="footer-social-pro">
                            <a
                                href={CONTACT.instagram}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                            >
                                <InstagramLogo size={19} weight="regular" />
                            </a>
                        </div>
                    </div>

                    <nav className="footer-column-pro" aria-label="Navegação institucional">
                        <h3>Navegação</h3>
                        <Link to="/">Home</Link>
                        <Link to="/cases">Cases</Link>
                        <Link to="/sobre">Sobre</Link>
                        <Link to="/layouts">Layouts</Link>
                        <Link to="/login">Login</Link>
                    </nav>

                    <nav className="footer-column-pro" aria-label="Plataforma">
                        <h3>Plataforma</h3>
                        <Link to="/login">Criar conta</Link>
                        <Link to="/layouts">Layouts</Link>
                        <Link to="/cases">Cases</Link>
                        <Link to="/sobre">Sobre a Domu</Link>
                    </nav>

                    <div className="footer-column-pro footer-contact-pro">
                        <h3>Contato</h3>
                        <Link to="/login">Acessar plataforma</Link>
                        <a href={CONTACT.instagram} target="_blank" rel="noreferrer">
                            @domu_tech
                        </a>
                        <p>
                            <span />
                            Conta online 24h
                        </p>
                    </div>
                </div>

                <div className="footer-bottom-pro">
                    <p>© {year} Domu Tech. Todos os direitos reservados.</p>
                    <div>
                        <a href="#">Privacidade</a>
                        <a href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
