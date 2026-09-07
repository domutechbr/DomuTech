import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    SquaresFour,
    Storefront,
    GearSix,
    SignOut,
    GlobeHemisphereWest,
    Lightning,
    Layout,
    Plus,
    Code,
    Palette,
    CheckCircle,
    Clock,
} from '@phosphor-icons/react';

type TabId = 'inicio' | 'servicos' | 'layouts' | 'conta';

const NAV: { id: TabId; label: string; icon: typeof SquaresFour }[] = [
    { id: 'inicio', label: 'Início', icon: SquaresFour },
    { id: 'servicos', label: 'Serviços', icon: GlobeHemisphereWest },
    { id: 'layouts', label: 'Layouts', icon: Layout },
    { id: 'conta', label: 'Conta', icon: GearSix },
];

const CATALOG = [
    {
        title: 'Site sob medida',
        desc: 'Template fixo + personalização no painel (fase 1 do produto).',
        price: 'Setup + mensalidade',
        icon: GlobeHemisphereWest,
    },
    {
        title: 'IA & Automação',
        desc: 'Fluxos e atendimento inteligente ligados à sua conta.',
        price: 'Em definição',
        icon: Lightning,
    },
    {
        title: 'Software House',
        desc: 'Demanda sob medida fora do catálogo padrão.',
        price: 'Sob consulta',
        icon: Code,
    },
    {
        title: 'Branding & UX',
        desc: 'Identidade e interfaces para o produto publicado.',
        price: 'Sob consulta',
        icon: Palette,
    },
] as const;

const LAYOUTS = [
    { name: 'Glassmorphism', category: 'LP / Site / E-commerce', status: 'Em breve' },
    { name: 'Institucional Clean', category: 'Site institucional', status: 'Em breve' },
    { name: 'Landing Conversão', category: 'Landing page', status: 'Em breve' },
] as const;

const TITLES: Record<TabId, { eyebrow: string; title: string }> = {
    inicio: { eyebrow: 'Painel Domu', title: 'Olá! Bem-vindo à plataforma.' },
    servicos: { eyebrow: 'Catálogo', title: 'Serviços para contratar' },
    layouts: { eyebrow: 'Templates', title: 'Layouts disponíveis' },
    conta: { eyebrow: 'Preferências', title: 'Sua conta' },
};

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState<TabId>('inicio');
    const [accountName, setAccountName] = useState('André Vitor');
    const [accountEmail, setAccountEmail] = useState('andre.vitor@tec4udigital.com');
    const [savedNote, setSavedNote] = useState<string | null>(null);

    const head = TITLES[tab];

    const handleSaveAccount = (event: React.FormEvent) => {
        event.preventDefault();
        if (!accountName.trim() || !accountEmail.trim()) {
            setSavedNote('Preencha nome e e-mail.');
            return;
        }
        setSavedNote('Dados salvos só neste preview (ainda sem banco).');
    };

    return (
        <div className="dashboard">
            <aside className="dashboard__sidebar">
                <Link to="/" className="dashboard__brand" aria-label="Voltar ao site Domu">
                    <img src="/frame-1.png" alt="DOMU TECH" />
                </Link>

                <nav className="dashboard__nav" aria-label="Painel">
                    {NAV.map((item) => {
                        const Icon = item.icon;
                        const active = tab === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                className={`dashboard__nav-item ${active ? 'is-active' : ''}`}
                                aria-current={active ? 'page' : undefined}
                                onClick={() => {
                                    setTab(item.id);
                                    setSavedNote(null);
                                }}
                            >
                                <Icon className="w-5 h-5" weight={active ? 'fill' : 'duotone'} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <button
                    type="button"
                    className="dashboard__signout"
                    onClick={() => navigate('/login')}
                >
                    <SignOut className="w-4 h-4" weight="bold" />
                    Sair
                </button>
            </aside>

            <div className="dashboard__main">
                <header className="dashboard__top">
                    <div>
                        <p className="dashboard__eyebrow">{head.eyebrow}</p>
                        <h1>{head.title}</h1>
                    </div>
                    <span className="dashboard__badge">Preview · sem Auth</span>
                </header>

                <div className="dashboard__banner" role="status">
                    Protótipo do painel. Abas já navegáveis; contratação e Auth entram depois.
                </div>

                {tab === 'inicio' && (
                    <>
                        <section className="dashboard__section">
                            <div className="dashboard__section-head">
                                <h2>Resumo</h2>
                            </div>
                            <div className="dashboard__stats">
                                <article className="dashboard__stat">
                                    <CheckCircle className="w-5 h-5" weight="fill" />
                                    <div>
                                        <strong>0</strong>
                                        <span>serviços ativos</span>
                                    </div>
                                </article>
                                <article className="dashboard__stat">
                                    <Clock className="w-5 h-5" weight="fill" />
                                    <div>
                                        <strong>0</strong>
                                        <span>pedidos em andamento</span>
                                    </div>
                                </article>
                                <article className="dashboard__stat">
                                    <Storefront className="w-5 h-5" weight="fill" />
                                    <div>
                                        <strong>{LAYOUTS.length}</strong>
                                        <span>layouts no catálogo</span>
                                    </div>
                                </article>
                            </div>
                        </section>

                        <section className="dashboard__section">
                            <div className="dashboard__section-head">
                                <h2>Comece por aqui</h2>
                                <button
                                    type="button"
                                    className="dashboard__ghost-btn dashboard__ghost-btn--active"
                                    onClick={() => setTab('servicos')}
                                >
                                    <Plus className="w-4 h-4" weight="bold" />
                                    Ver serviços
                                </button>
                            </div>
                            <div className="dashboard__grid">
                                {CATALOG.slice(0, 3).map((svc) => {
                                    const Icon = svc.icon;
                                    return (
                                        <article key={svc.title} className="dashboard__card">
                                            <div className="dashboard__card-icon">
                                                <Icon className="w-5 h-5" weight="duotone" />
                                            </div>
                                            <h3>{svc.title}</h3>
                                            <p>{svc.desc}</p>
                                            <span>{svc.price}</span>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>

                        <section className="dashboard__section">
                            <div className="dashboard__section-head">
                                <h2>Atalhos</h2>
                            </div>
                            <div className="dashboard__shortcuts">
                                <button type="button" className="dashboard__shortcut" onClick={() => setTab('layouts')}>
                                    Abrir layouts no painel
                                </button>
                                <Link to="/layouts" className="dashboard__shortcut">
                                    Loja pública de layouts
                                </Link>
                                <Link to="/" className="dashboard__shortcut">
                                    Voltar à landing
                                </Link>
                            </div>
                        </section>
                    </>
                )}

                {tab === 'servicos' && (
                    <section className="dashboard__section">
                        <div className="dashboard__section-head">
                            <h2>Catálogo interno</h2>
                            <button type="button" className="dashboard__ghost-btn" disabled>
                                Contratar (em breve)
                            </button>
                        </div>
                        <div className="dashboard__list">
                            {CATALOG.map((svc) => {
                                const Icon = svc.icon;
                                return (
                                    <article key={svc.title} className="dashboard__list-item">
                                        <div className="dashboard__card-icon">
                                            <Icon className="w-5 h-5" weight="duotone" />
                                        </div>
                                        <div className="dashboard__list-body">
                                            <h3>{svc.title}</h3>
                                            <p>{svc.desc}</p>
                                        </div>
                                        <div className="dashboard__list-meta">
                                            <span>{svc.price}</span>
                                            <button type="button" className="dashboard__mini-btn" disabled>
                                                Contratar
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                )}

                {tab === 'layouts' && (
                    <section className="dashboard__section">
                        <div className="dashboard__section-head">
                            <h2>Templates da conta</h2>
                            <Link to="/layouts" className="dashboard__ghost-btn dashboard__ghost-btn--active">
                                Ver loja pública
                            </Link>
                        </div>
                        <div className="dashboard__list">
                            {LAYOUTS.map((layout) => (
                                <article key={layout.name} className="dashboard__list-item">
                                    <div className="dashboard__card-icon">
                                        <Layout className="w-5 h-5" weight="duotone" />
                                    </div>
                                    <div className="dashboard__list-body">
                                        <h3>{layout.name}</h3>
                                        <p>{layout.category}</p>
                                    </div>
                                    <div className="dashboard__list-meta">
                                        <span>{layout.status}</span>
                                        <button type="button" className="dashboard__mini-btn" disabled>
                                            Aplicar
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {tab === 'conta' && (
                    <section className="dashboard__section">
                        <div className="dashboard__section-head">
                            <h2>Dados da conta</h2>
                        </div>
                        <form className="dashboard__form" onSubmit={handleSaveAccount} noValidate>
                            <label className="dashboard__field">
                                <span>Nome</span>
                                <input
                                    type="text"
                                    value={accountName}
                                    onChange={(e) => setAccountName(e.target.value)}
                                    autoComplete="name"
                                />
                            </label>
                            <label className="dashboard__field">
                                <span>E-mail</span>
                                <input
                                    type="email"
                                    value={accountEmail}
                                    onChange={(e) => setAccountEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </label>
                            <label className="dashboard__field">
                                <span>Papel</span>
                                <input type="text" value="Dono da conta (preview)" disabled readOnly />
                            </label>
                            <button type="submit" className="login-page__btn login-page__btn--primary dashboard__submit">
                                Salvar alterações
                            </button>
                            {savedNote && (
                                <p className="dashboard__form-note" role="status">
                                    {savedNote}
                                </p>
                            )}
                        </form>
                    </section>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
