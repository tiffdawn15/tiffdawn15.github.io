import { useRef } from "react";
import "./App.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

function App() {
  const ref = useRef<Parallax>(null);
  return (
    <>
      <div>
        <Parallax pages={4} ref={ref}>
          <ParallaxLayer
            offset={0}
            speed={1}
            factor={2}
            style={{
              backgroundImage: `url(./public/alicharmant-oObLAZvXSPM-unsplash.jpg)`,
              backgroundSize: "cover",
            }}
          >
            Hello World
          </ParallaxLayer>
          <ParallaxLayer
            offset={1}
            speed={1}
            onClick={() => ref.current.scrollTo(3)}
          >
          </ParallaxLayer>
          <ParallaxLayer sticky={{start: 0.9, end: 2.5}}>
            <img src="../public/cat.gif"></img>
          </ParallaxLayer>
          <ParallaxLayer offset={3} speed={3}>
            It's nice to meet you
          </ParallaxLayer>
        </Parallax>
      </div>
    </>
  );
}

export default App;
