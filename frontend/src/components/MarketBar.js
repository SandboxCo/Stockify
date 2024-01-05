import React, { useRef, useEffect } from 'react';
import "../styles/marketbar.css"; // Import your CSS file with styles

const Ticker = ({stock}) => {
    const tickerContainerRef = useRef(null);

    useEffect(() => {
      const tickerContainer = tickerContainerRef.current;
  
      const handleAnimationIteration = () => {
        // Reset the position to the beginning when an iteration is completed
        tickerContainer.style.transform = 'translateX(0)';
      };
  
      // Attach the event listener to the ticker container
      tickerContainer.addEventListener('animationiteration', handleAnimationIteration);
  
      // Clean up event listener on component unmount
      return () => {
        tickerContainer.removeEventListener('animationiteration', handleAnimationIteration);
      };
    }, []);

    return (
          <div ref={tickerContainerRef} className="stock-ticker">
              <div className="stock-item">
                {stock}
              </div>
          </div>
      );
}

const MarketBar = ({ stockData=["S&P 500","DOW JONES","NASDAQ","DAX","HENG SENG","FTSE 100","SENSEX","TSX"] }) => {
  const tickerContainerRef = useRef(null);

//   useEffect(() => {
//     const tickerContainer = tickerContainerRef.current;

//     const handleAnimationIteration = () => {
//       // Reset the position to the beginning when an iteration is completed
//       tickerContainer.style.transform = 'translateX(0)';
//     };

//     // Attach the event listener to the ticker container
//     tickerContainer.addEventListener('animationiteration', handleAnimationIteration);

//     // Clean up event listener on component unmount
//     return () => {
//       tickerContainer.removeEventListener('animationiteration', handleAnimationIteration);
//     };
//   }, []);

  return (
    <div className="stock-ticker-container">
      <div className="stock-ticker">
        {stockData.map((stock, index) => (
            <Ticker stock={stock} />
        ))}
      </div>
    </div>
  );
};

export default MarketBar;