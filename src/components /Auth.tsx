import { useRef, useState } from "react";
import { supabase } from "../utils/setupSupabase";
import { useNavigate } from "react-router-dom";

interface AuthProps {
    mode: 'login' | 'signup';
}

const Auth = ({ mode }: AuthProps) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleAuth = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;

        if (!email || !password || (mode === 'signup' && (!firstName || !lastName))) {
            setError('Alle Felder müssen ausgefüllt werden.');
            return;
        }

        try {
            let result;
            if (mode === 'login') {
                result = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
            } else {
                result = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            first_name: firstName,
                            last_name: lastName,
                        },
                    },
                });

                const user = result.data?.user; 
                if (user) {
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .upsert([
                            {
                                id: user.id, 
                                first_name: firstName,
                                last_name: lastName,
                            }
                        ]);
                    if (profileError) {
                        throw profileError;
                    }
                }
            }

            if (result.error) throw result.error;

            if (mode === 'signup') {
                setMessage('Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail-Adresse.');
                setTimeout(() => navigate('/login'), 3000); 
            } else {
                navigate('/');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unbekannter Fehler');
            }
        }
    };

    return (
        <div className="auth-container py-10 bg-[#f5f2f2]">
            <div className="max-w-[500px] mx-auto bg-white shadow-lg rounded-[30px] p-8">
                <h1 className="text-center font-inter font-bold text-[32px] text-[#2c2b2b] mb-6">
                    {mode === 'login' ? 'Willkommen zurück!' : 'Registrieren'}
                </h1>
                {mode === 'signup' && (
                    <>
                        <div className="mb-6">
                            <label htmlFor="first-name" className="block text-[#2c2b2b] font-inter mb-2">Vorname</label>
                            <input
                                id="first-name"
                                type="text"
                                ref={firstNameRef}
                                className="w-full p-3 border border-[#ddd] rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#ffdb63]"
                                placeholder="Vorname"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="last-name" className="block text-[#2c2b2b] font-inter mb-2">Nachname</label>
                            <input
                                id="last-name"
                                type="text"
                                ref={lastNameRef}
                                className="w-full p-3 border border-[#ddd] rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#ffdb63]"
                                placeholder="Nachname"
                            />
                        </div>
                    </>
                )}

                <div className="mb-6">
                    <label htmlFor="email" className="block text-[#2c2b2b] font-inter mb-2">E-Mail</label>
                    <input
                        id="email"
                        type="email"
                        ref={emailRef}
                        className="w-full p-3 border border-[#ddd] rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#ffdb63]"
                        placeholder="E-Mail"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-[#2c2b2b] font-inter mb-2">Passwort</label>
                    <input
                        id="password"
                        type="password"
                        ref={passwordRef}
                        className="w-full p-3 border border-[#ddd] rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#ffdb63]"
                        placeholder="Passwort"
                    />
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {message && <p className="text-green-500 text-center">{message}</p>}

                <button
                    onClick={handleAuth}
                    className="w-full mt-4 py-3 bg-[#ffdb63] text-[#2c2b2b] font-inter font-bold rounded-[32px] hover:bg-[#ffcc50] transition-all"
                >
                    {mode === 'login' ? 'Einloggen' : 'Registrieren'}
                </button>

                <div className="mt-4 text-center">
                    <p className="text-[#2c2b2b]">
                        {mode === 'login' ? 'Noch kein Konto?' : 'Bereits ein Konto?'}
                        <a href={mode === 'login' ? '/signup' : '/login'} className="text-[#ffdb63] hover:underline">
                            {mode === 'login' ? 'Registrieren' : 'Einloggen'}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
