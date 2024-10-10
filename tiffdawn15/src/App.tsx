import "./App.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

function App() {
  return (
    <>
      <div>
        <Parallax pages={4}>
          <ParallaxLayer
            offset={0}
            speed={1}
            factor={2}
            style={{
              backgroundImage: `url('https://unsplash.com/photos/a-person-standing-on-top-of-a-mountain-oObLAZvXSPM')`,
              backgroundSize: "cover",
            }}
          >
            Hello World
          </ParallaxLayer>
          <ParallaxLayer offset={1} speed={1}>It's nice to meet you</ParallaxLayer>
          <ParallaxLayer offset={2} speed={2}>It's nice to meet you</ParallaxLayer>
          <ParallaxLayer offset={3} speed={3}>It's nice to meet you</ParallaxLayer>

        </Parallax>
      </div>
    </>
  );
}

export default App;
