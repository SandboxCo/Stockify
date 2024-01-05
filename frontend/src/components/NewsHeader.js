import { FaArrowRight } from "react-icons/fa6";


function NewsHeader(){

    const Circle = ()=>{
        return (
            <div style={{width:10, height:10, borderRadius: 1000, backgroundColor:"red", marginRight:8}}></div>   
        )
    }

    return (
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <p style={{fontFamily:"Montserrat", margin:0, fontSize: 15, marginRight:10, display:"flex", alignItems:"center"}}><Circle/>Live News</p>
            <button style={{backgroundColor:"transparent", border:"none", color:"#5570fa", width: 50, display:"flex", justifyContent:"space-between", padding:2}}>
                <u>View</u>
                <FaArrowRight />
            </button>
        </div>
    )
}

export default NewsHeader