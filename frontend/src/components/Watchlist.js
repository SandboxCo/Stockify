

function Watchlist(){

    // return (
    //     <div style={{backgroundColor: "white", borderRadius: 10, height:"100%", boxSizing: "border-box", padding:7}}>
    //         <p style={{fontWeight: 500, margin:0, fontFamily:"Montserrat"}}>Watchlist</p>
    //         <div style={{display:"flex", flexDirection:"column"}}> 
    //         </div>
    //     </div>
    // )

    const componentStyle = {
        position: 'relative',
        width: '300px', // Set your desired width
        height: '200px', // Set your desired height
        backgroundImage: 'url("background-image.jpg")', // Set your background image
        backgroundSize: 'cover',
        overflow: 'hidden',
        borderRadius: 6,
      };
    
      const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the last parameter for transparency
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        fontFamily:"Montserrat",
        fontWeight:600
      };
    
      return (
        <div style={componentStyle}>
          <div style={overlayStyle}>
            <p>Sign In to Use Watchlist</p>
          </div>
        </div>
      );
}

export default Watchlist