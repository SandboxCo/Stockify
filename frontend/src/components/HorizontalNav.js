import React, {useState} from "react"

import { useAuth } from "../providers/AuthProvider"
import SignOutModal from "./SignOutModal";

import { useNavigate } from 'react-router-dom';


function HorizontalNav(){
    const navigate = useNavigate();

    const {isSignedIn} = useAuth()

    const [signOutModalOpen, setSignOutModalOpen] = useState(false);


    const auth = isSignedIn()

    const authAction = () => {
        if (auth) {
            setSignOutModalOpen(true)
        } else {
            navigate('/signIn');
        }
    }
    return (
        <div style={{width: "100%", height:"100%", display: "flex", justifyContent: "space-between", boxSizing:"border-box", padding:15, paddingLeft:20, paddingRight:20}}>
            <img src={require("../media/logo.png")} width={135} height={40}/>

            <div>
                <button 
                    onClick={()=>{authAction()}}
                    style={{fontWeight: 300, color:"white", border: "none", backgroundColor:"#007BFF", fontSize: 14, width: 100, padding:8, fontFamily:"Montserrat"}}>
                    {auth ? "Sign Out" : "Sign In"}
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