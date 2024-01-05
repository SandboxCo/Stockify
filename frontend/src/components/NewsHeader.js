import { FaArrowRight } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

function NewsHeader(){

    const navigate = useNavigate()

    const routePage = () =>{
        navigate("/news")
    }

    const Circle = ()=>{
        return (
            <div style={{width:10, height:10, borderRadius: 1000, backgroundColor:"red", marginRight:8}}></div>   
        )
    }

    return (
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <p style={{fontFamily:"Montserrat", margin:0, fontSize: 15, marginRight:10, display:"flex", alignItems:"center",}}><Circle/>Live News</p>
            <button onClick={()=>{routePage()}} style={{backgroundColor:"transparent", border:"none", color:"#5570fa", width: 50, display:"flex", justifyContent:"space-between", padding:2, cursor:"pointer", textDecoration:"underline"}}>
                View
                <FaArrowRight />
            </button>
        </div>
    )
}

export default NewsHeader