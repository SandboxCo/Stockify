import React from "react"
import { FaChartLine } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa6";
import { FaTableCellsLarge } from "react-icons/fa6";
import Divider from '@mui/material/Divider';


import {useLocation, useNavigate} from "react-router-dom"
import { useAuth } from "../providers/AuthProvider";

function VerticalNav() {
    const linkStyle={
        color: "#333333",
        fontSize: "13px",
        textAlign: "left",
        backgroundColor: "transparent",
        border: "none",
        margin: 0,
        padding: 0,
        marginBottom: '20px',
        display:"flex",
        justifyContent: "flex-start",
        alignItems: "center",
        fontFamily:"Montserrat",
        cursor:"pointer"
    }

    const { pathname} = useLocation();

    const navigate = useNavigate();

    const {isSignedIn} = useAuth()

    const handleDashboardRedirect = () => {
        if (!isSignedIn){ 
            alert("Sign in to use dashboard feature!")
        } else if (pathname != "/dashboard") {
            navigate("/dashboard")
        }
    }
    
    const handleNewsRedirect = () => {
        if (pathname != "/news"){
            navigate("/news")
        }
    }

    const handleStockRedirect = () => {
        if (pathname != "/"){
            navigate("/")
        }
    }

    //boxShadow: "7px 4px 8px -3px #A3A3A3"
    return (
        <div style={{padding: 20, boxSizing:"border-box", justifyContent: "space-between", display:"flex", flexDirection: "column", height:"100%"}}>
            <div style={{justifyContent:"space-between", display:"flex", flexDirection: "column", height: "100px", color: "#fafcff"}}>
                <button style={{...linkStyle, color: pathname=="/dashboard" ? "#007BFF" : "#b3b3b3"}}
                    onClick={()=>{handleDashboardRedirect()}}
                >
                    <FaTableCellsLarge style={{marginRight: 7}}/>
                    Dashboard
                </button>
                <Divider sx={{marginBottom:3}} />
                <button style={{...linkStyle, color: pathname=="/" ? "#007BFF" : "#b3b3b3"}}
                    onClick={()=>{handleStockRedirect()}}
                >
                   <FaChartLine style={{marginRight: 7}}/> Stocks
                </button>
                <button style={{...linkStyle, color: pathname=="/news" ? "#007BFF" : "#b3b3b3"}}
                    onClick={()=>{handleNewsRedirect()}}
                >
                    <FaNewspaper style={{marginRight: 7}}/>
                    Live News
                </button>
            </div>
            <div style={{color:"#b3b3b3", fontFamily:"Montserrat", fontSize:12}}>
                SandboxCo, Jan 2024 
            </div>
        </div>
    )
}

export default VerticalNav