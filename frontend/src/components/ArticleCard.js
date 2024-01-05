import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material/styles";


function ArticleCard({imgHeight, imagePresent=true}) {
    return (
        <div style={{borderRadius:10, backgroundColor:"white",height:"100%", boxSizing:"border-box", padding: imagePresent ? 0: 10}}>
            {imagePresent && (
                <img height={"50%"} width={"100%"} style={{borderRadius:"inherit"}} src="https://cc-prod.scene7.com/is/image/CCProdAuthor/What-is-Stock-Photography_P1_mobile?$pjpeg$&jpegSize=200&wid=720"/> 
            )}
            <div style={{height:"50%", boxSizing:"border-box", padding: imagePresent ? 5 : 0, minHeight:200, alignItems:"center", justifyContent:"center"}}>
                <p style={{fontSize:13, margin:0, fontWeight:600, fontFamily:"Montserrat"}}>Lizard</p>
                <p style={{fontSize:11, margin:0, fontFamily:"Montserrat", marginTop:5, marginBottom:2}}>Lizards are a widespread group of squamate reptiles, with over 6,000</p>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <u><p style={{fontSize:9, margin:0, fontFamily:"Montserrat", marginTop:5, color:"#007BFF"}}>Yahoo Article</p></u>
                    <p style={{fontSize:9, margin:0, fontFamily:"Montserrat", marginTop:5}}>14 hours ago</p>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard