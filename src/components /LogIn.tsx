import Auth from "./Auth";
import { Link } from "react-router-dom";

const LogIn = () => {
    return ( 
    <div>
            <Auth mode="login" />
    <p className="mt-4 text-center text-[#333333] text-lg font-bold hover:text-[#ffcc50] transition-all">
    <Link to="/forgot-password" className="hover:underline ">
        Passwort vergessen?
    </Link>
</p>
    </div>
    

);

}
 
export default LogIn