import './App.css';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import coffeeLottie from "./Pre_comp_1.json";
import scrollDown from "./scrollDown.json"
function App() {
  const [prevY, setPrevY] = useState(0);
  const [scrollStatus, setScrollStatus] = useState(0);
  const [isReversed, setIsReversed] = useState(false);
  const [idle, setIdle] = useState(true)

  useEffect(() => {
    
    const handleScroll = () => {
      setIdle(false)
      setTimeout(() => {
        clearTimeout()
        setIdle(true);
      }, 5000);
      
      const currentY = window.scrollY;
      if (prevY < currentY) {
        if (scrollStatus >= 160) {
            setScrollStatus(0);
            setIsReversed(false); // Reset to forward play
            return false;
        }
        setScrollStatus(scrollStatus + 0.55);

      } else {
        if (scrollStatus <= 0) { 
            setScrollStatus(0);
            setIsReversed(false); // Reset to forward play
            return false;
        }
        setScrollStatus(scrollStatus - 0.55);
      }

      setPrevY(currentY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevY, scrollStatus]);


  // Calculate the frame number 5 frames before the end of the animation

  return (
    <div className="App">
      <div className='overLay'/>
      {idle && <Lottie
      className={`scrollSignal ${idle ? 'fadeIn' : ''}`}
      animationData={scrollDown}
      play
      loop
      />}
      <div className="animation-container">
        <Lottie 
          className='animation'
          animationData={coffeeLottie}
          goTo={scrollStatus > 2 ? scrollStatus - 2 : 0} // Start from after frame 2
          play={((scrollStatus > 50) || isReversed)}
          loop= {isReversed}
          direction={isReversed ? -1 : 1} // Reverse animation if isReversed is true
          speed={isReversed ? 2 : 1} // Reverse animation if isReversed is true
        />
      </div>
    </div>
  );
}

export default App;
