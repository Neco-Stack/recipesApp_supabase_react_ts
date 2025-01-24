import { useState } from "react";
import { supabase } from "../utils/setupSupabase";

const PasswordForgotten = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            setError(error.message);
        } else {
            setMessage("Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet");
        }
    };

    return (
        <div className="auth-container py-10 bg-[#f5f2f2]">
            <div className="max-w-[500px] mx-auto bg-white shadow-lg rounded-[30px] p-8">
                <h1 className="text-center font-inter font-bold text-[32px] text-[#2c2b2b] mb-6">
                    Passwort vergessen?
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-[#2c2b2b] font-inter mb-2">
                            E-Mail-Adresse
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-[#ddd] rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#ffdb63]"
                            placeholder="Deine E-Mail-Adresse"
                        />
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {message && <p className="text-green-500 text-center">{message}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#ffdb63] text-[#2c2b2b] font-inter font-bold rounded-[32px] hover:bg-[#ffcc50] transition-all"
                    >
                        Link senden
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordForgotten;
