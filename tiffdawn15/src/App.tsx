import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
// import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useTransition, animated } from '@react-spring/web'

function App() {
  const ref = useRef<ReturnType<typeof setTimeout>[]>([])
  const [items, set] = useState<string[]>([])
  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: 'perspective(600px) rotateX(0deg)',
      color: '#8fa5b6',
    },
    enter: [
      // TODO TIFF: Change colors
      { opacity: 1, height: 80, innerHeight: 80 },
      // TODO TIFF: Move to the right and left instead flipping
      { transform: 'perspective(600px) rotateX(180deg)', color: '#28d79f' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [{ color: '#c23369' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: '#28b4d7' },
  });

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout)
    ref.current = []
    set([])
    ref.current.push(setTimeout(() => set(['Tiffany Messer', 'Software Engineer', 'Artist']), 2000))
  }, [])

  useEffect(() => {
    reset()
    return () => ref.current.forEach(clearTimeout)
  }, [])

  return (
    <>
      <div className="container" >
      <div className="main">
        {transitions(({ innerHeight, ...rest }, item) => (
          <animated.div className="transitionsItem" style={rest} onClick={reset}>
            <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
    </>
  );
}

export default App;
