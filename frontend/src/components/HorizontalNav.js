import React, {useState} from "react"

import { useAuth } from "../providers/AuthProvider"
import SignOutModal from "./SignOutModal";

import { useNavigate, useLocation } from 'react-router-dom';


function HorizontalNav(){
    const navigate = useNavigate();

    const {pathname} = useLocation();

    const {isSignedIn} = useAuth()

    const [signOutModalOpen, setSignOutModalOpen] = useState(false);


    const auth = isSignedIn()

    const clickButton = () => {
        if (pathname == "/"){
            if (auth) {
                setSignOutModalOpen(true)
            } else {
                navigate('/signIn');
            }
        } else {
            navigate("/")
        }
    }

    let buttonText;

    if (pathname === "/" || pathname == "/news"){
        if (auth){
            buttonText = "Sign Out"
        } else {
            buttonText = "Sign In"
        }
    } else {
        buttonText = "Return Dashboard"
    }

    return (
        <div style={{width: "100%", height:"100%", display: "flex", justifyContent: "space-between", boxSizing:"border-box", padding:15, paddingLeft:20, paddingRight:20}}>
            <img src={require("../media/logo.png")} width={135} height={40}/>

            <div>
                <button 
                    onClick={()=>{clickButton()}}
                    style={{fontWeight: 300, color:"white", border: "none", backgroundColor:"#007BFF", fontSize: 14, width: pathname=="/" || pathname =="/news" ? 100 : 160, padding:8, fontFamily:"Montserrat", cursor:"pointer"}}>
                    {buttonText}
                </button>
            </div>

            <SignOutModal
                open={signOutModalOpen}
                onClose={() => setSignOutModalOpen(false)}
            />
        </div>
    )
}

export default HorizontalNav