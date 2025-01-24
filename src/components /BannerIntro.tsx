import bannerImg from "../assets/png/bannerimg.png";

const Banner = () => {
    return (
        <div className="relative w-full h-[362px]">
          <img
            src={bannerImg}
            alt="Banner"
            className="w-full h-full object-cover rounded-lg filter brightness-75"
          />

          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black/40 rounded-lg"></div>
          
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-center px-4">
            <p className="text-white text-[40px] lg:text-[50px] font-semibold leading-tight sm:text-[36px] md:text-[45px] max-w-3xl mx-auto px-4 shadow-lg">
              Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben Sie
              unvergessliche Momente bei Tisch.
            </p>
          </div>
        </div>
    );
};

export default Banner;
