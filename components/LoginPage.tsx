import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EnvelopeSimple, GoogleLogo, AppleLogo } from '@phosphor-icons/react';

type AuthMode = 'login' | 'signup';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<AuthMode>('login');
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);

    const headline = mode === 'login' ? 'Que bom ter você aqui!' : 'Crie sua conta Domu';
    const switchLabel =
        mode === 'login'
            ? 'Ainda não tem uma conta Domu?'
            : 'Já tem uma conta Domu?';
    const switchAction = mode === 'login' ? 'Criar agora' : 'Fazer login';

    const goToPanelDemo = () => {
        navigate('/painel');
    };

    const handleProviderClick = (provider: string) => {
        setFeedback(
            `${provider} ainda não está conectado. Enquanto isso, use o acesso demo ao painel.`
        );
    };

    const handleEmailSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!email.trim() || !password.trim()) {
            setFeedback('Preencha e-mail e senha para continuar.');
            return;
        }
        // Demo: entra no painel sem Auth real
        navigate('/painel');
    };

    return (
        <div className="login-page">
            <div className="login-page__panel">
                <div className="login-page__card">
                    <Link to="/" className="login-page__brand" aria-label="Voltar para a Domu">
                        <img src="/frame-1.png" alt="DOMU TECH" className="login-page__logo" />
                    </Link>

                    <h1 className="login-page__title">{headline}</h1>

                    <div className="login-page__actions">
                        <button
                            type="button"
                            className="login-page__btn login-page__btn--primary"
                            onClick={() => handleProviderClick('Google')}
                        >
                            <GoogleLogo className="w-5 h-5" weight="bold" />
                            Entrar com Google
                        </button>

                        <button
                            type="button"
                            className="login-page__btn login-page__btn--primary"
                            onClick={() => handleProviderClick('Apple')}
                        >
                            <AppleLogo className="w-5 h-5" weight="bold" />
                            Entrar com Apple
                        </button>

                        <div className="login-page__divider" role="separator">
                            <span>ou</span>
                        </div>

                        {!showEmailForm ? (
                            <button
                                type="button"
                                className="login-page__btn login-page__btn--outline"
                                onClick={() => {
                                    setShowEmailForm(true);
                                    setFeedback(null);
                                }}
                            >
                                <EnvelopeSimple className="w-5 h-5" weight="bold" />
                                Entrar com e-mail
                            </button>
                        ) : (
                            <form className="login-page__form" onSubmit={handleEmailSubmit} noValidate>
                                <label className="login-page__field">
                                    <span>E-mail</span>
                                    <input
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="voce@empresa.com"
                                    />
                                </label>
                                <label className="login-page__field">
                                    <span>Senha</span>
                                    <input
                                        type="password"
                                        name="password"
                                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </label>
                                <button type="submit" className="login-page__btn login-page__btn--primary">
                                    {mode === 'login' ? 'Entrar' : 'Criar conta'}
                                </button>
                            </form>
                        )}

                        <button
                            type="button"
                            className="login-page__btn login-page__btn--demo"
                            onClick={goToPanelDemo}
                        >
                            Entrar no painel (demo)
                        </button>
                    </div>

                    {feedback && (
                        <p className="login-page__feedback" role="status">
                            {feedback}
                        </p>
                    )}

                    <p className="login-page__switch">
                        {switchLabel}{' '}
                        <button
                            type="button"
                            className="login-page__switch-btn"
                            onClick={() => {
                                setMode((current) => (current === 'login' ? 'signup' : 'login'));
                                setFeedback(null);
                            }}
                        >
                            {switchAction} <span aria-hidden>&gt;</span>
                        </button>
                    </p>
                </div>
            </div>

            <aside className="login-page__visual" aria-hidden>
                <img
                    src="/fraucon.png"
                    alt=""
                    className="login-page__visual-img"
                />
                <div className="login-page__visual-overlay" />
            </aside>
        </div>
    );
};

export default LoginPage;
