import headerLogo from "../assets/png/Icon.png"
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="w-full h-[143px] mx-auto">
            <div className="h-[30px] bg-[#ffdb63]"></div> 
            <nav className="h-[113px] bg-white flex items-center justify-between px-8 shadow-md">
            <div className="flex items-center ml-[237px]">
                    <img src={headerLogo} alt="Logo" className='h-[26px] w-[28px] mr-2' />
                    <h2 className="font-inter font-medium text-[26px] text-[#2c2b2b] flex items-center">Die Rezeptwelt</h2>
                </div>
                <ul className='flex space-x-8'>
                <li>
                    <Link to="/" className="text-[#2c2b2b] text-[26px] font-inter font-bold hover:underline">Home</Link>
                </li>
                    <li>
                    <Link to="/recipes" className="text-[#2c2b2b] text-[26px] font-inter font-bold hover:underline">Rezepte</Link>
                </li>
                    <li>
                        <a href="#home" className="text-[#2c2b2b] text-[26px] font-inter font-bold hover:underline">Über uns</a>
                    </li>
                    <li>
                        <a href="#home" className="text-[#2c2b2b] text-[26px] font-inter font-bold hover:underline">Login</a>
                    </li>

                </ul>
            </nav>
        </header>
    );
};

export default Navbar;