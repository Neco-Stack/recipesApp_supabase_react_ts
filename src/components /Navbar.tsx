import { useEffect, useState } from "react";
import { supabase } from "../utils/setupSupabase";
import { Link, useNavigate } from "react-router-dom";
import headerLogo from "../assets/png/Icon.png";
import { User } from '@supabase/supabase-js';
import { FaUser } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        navigate('/');
    };

    const handleLogoClick = () => {
        navigate('/'); 
    };

    return (
        <header className="w-full h-[143px] mx-auto">
        <div className="h-[30px] bg-[#ffdb63]"></div>
        <nav className="h-[113px] bg-white flex items-center justify-between px-8 shadow-md">
            <div className="flex items-center ml-[237px]" onClick={handleLogoClick}>
                <img src={headerLogo} alt="Logo" className='h-[26px] w-[28px] mr-2' />
                <h2 className="font-inter font-medium text-[26px] text-[#2c2b2b] flex items-center">Die Rezeptwelt</h2>
            </div>
            <ul className='flex space-x-8 items-center'>
                <li>
                    <Link to="/" className="text-[#2c2b2b] text-[26px] font-inter font-semibold hover:underline">Home</Link>
                </li>
                <li>
                    <Link to="/recipes" className={`text-[#2c2b2b] text-[26px] font-inter font-semibold hover:underline ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        Rezepte
                    </Link>
                </li>
                <li>
                    <a href="#home" className="text-[#2c2b2b] text-[26px] font-inter font-semibold hover:underline">Über uns</a>
                </li>
                {user ? (
                    <>
                        {/* Profil-Icon */}
                        <li className="flex items-center">
                            <Link to="/profile" className="text-[#2c2b2b] text-[26px] font-inter font-semibold hover:underline flex items-center">
                                <FaUser size={24} className="mr-2" /> {/* Profil-Icon mit passendem Abstand */}
                                Profil
                            </Link>
                        </li>
                        <li>
                            <span className="text-[#2c2b2b] text-[26px] font-inter font-semibold">
                                Hallo, {user?.user_metadata?.first_name}
                            </span>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-[#ffdb63] text-[26px] font-inter font-semibold hover:underline ml-10"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="text-[#2c2b2b] text-[26px] font-inter font-bold hover:underline">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup" className="text-[#2c2b2b] text-[26px] font-inter font-bold hover:underline">Sign Up</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    </header>
);
};

export default Navbar;
