import GoogleLogin from "./GoogleLogin";
import {useContext} from "react";
import {LoginContext} from "../context/LoginContext";
import Login from "./Login";

function Home(){

    const {user} = useContext(LoginContext);

    return(
        user?.email ?
        <>
            <h2>HOMEPAGE</h2>

        </>
            :
            <div><Login/></div>
    )
}
export default Home;