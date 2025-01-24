import logo from '../assets/png/Icon.png'
import socialIcons from '../assets/png/Icons.png'

const Footer = () => {
    return (
        <footer className='h-[273px] bg-[#ffdb63] flex items-center justify-between px-[114px] mt-10'>
            <div className='flex items-center'>
                <img src={logo} alt="Logo" className='h-[46px] w-[50px] mr-4' />
                <h2 className='font-inter font-semibold text-[46px] text-center'>Die Rezeptwelt</h2>
            </div>
            <div className='flex flex-col'>
                <h2 className='mb-5 font font-inter font-semibold text-[26px]'>Social Media</h2>
                <img 
                src={socialIcons} 
                alt="Social Media Icons"/>
            </div>


        </footer>
      );
}
 
export default Footer;