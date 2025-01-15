import banner from "../assets/png/Banner.png"

const Banner = () => {
    return (
        <div className="relativ w-full h-[362px]">
            <img 
            src={banner} 
            alt="Banner"
            className="w-full h-full object-cover" />
        </div>
      );
}
 
export default Banner;