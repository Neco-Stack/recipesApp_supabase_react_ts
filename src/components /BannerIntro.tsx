import bannerImg from "../assets/png/bannerimg.png"

const Banner = () => {
    return (
        <div className="relative w-full h-[362px]">
          <img
            src={bannerImg}
            alt="Banner"
            className="w-full h-full object-cover opacity-90"
          />
          
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-center">
            <p className="text-white font-inter font-extrabold text-[40px] leading-[48px]">
              Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie
              unvergessliche Momente bei Tisch.
            </p>
          </div>
        </div>
      );
    };
    
    export default Banner;