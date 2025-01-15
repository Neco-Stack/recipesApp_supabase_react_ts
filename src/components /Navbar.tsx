import logo from '../assets/png/logo.png';

const Navbar = () => {
    return (
        <header className="w-full h-[143px] mx-auto">
            <div className="h-[30px] bg-[#ffdb63]"></div> {/* Korrigierte Farbe */}
            <nav className="h-[113px] bg-white flex items-center justify-between px-8 shadow-md">
                <div className="flex items-center ml-[150px]">
                    <img src={logo} alt="Logo" className='h-8 mr-2' />
                </div>
                <ul className='flex space-x-8'>
                    <li>
                        <a href="#home" className="text-[#2c2b2b] text-[26px] font-inter font-bold hover:underline">Home</a>
                    </li>
                    <li>
                        <a href="#home" className="text-[#2c2b2b] text-[26px] font-inter font-bold hover:underline">Rezepte</a>
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