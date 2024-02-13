import cat from './images/cat.gif'
import stars from './images/stars.svg'
import cloud from './images/cloud.svg'
import happyCat from './images/cat-jump.gif'

import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useEffect, useRef, useState } from 'react';

const begs = [
  'say yes please', 'are you sure?', 'think about it :(', 'i think you you clicked no by mistake',
  'look, you have no other option just click yes', 'you being silly now', 'no f u'
]

function App() {
  const pageRef = useRef()
  const [accept, setAccept] = useState(false)
  const [noCount, setNoCount] = useState(0)
  const [text, setText] = useState()
  const [isVisible, setIsVisible] = useState(false)
  const handleNoClick = () => {
    if (noCount === begs.length) return
    setNoCount(prev => prev + 1)
  }
  useEffect(() => {
    if (noCount === begs.length) return
    setText(begs[noCount])
  }, [noCount])
  useEffect(() => {
    const observer = new IntersectionObserver(enteries => {
      setIsVisible(enteries[0].isIntersecting)
      if (enteries[0].isIntersecting) observer.unobserve(pageRef.current)
    })
    if (pageRef.current) observer.observe(pageRef.current)
  })

  return (
    <div>
      <Parallax pages={4}>
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
        <ParallaxLayer offset={3} speed={1} style={{ backgroundColor: '#dc3935' }} />
        <ParallaxLayer offset={0} factor={4} style={{ backgroundImage: `url(${stars})`, backgroundSize: 'cover' }} />
        <ParallaxLayer offset={0} speed={-0.4} style={{ opacity: 0.8 }} >
          <img src={cloud} alt='cloud' style={{ position: 'absolute', width: '10rem', top: '50%', left: '5rem', translateY: '-50%' }} />
          <h1 style={{ textAlign: 'center', color: 'white', fontSize: '5rem', marginTop: '3rem' }}>Would you be my .........</h1>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={cloud} alt='cloud' style={{ marginLeft: '70%', width: '10rem' }} />
          <img src={cloud} alt='cloud' style={{ marginLeft: '20%', width: '10rem' }} />
          <img src={cloud} alt='cloud' style={{ marginLeft: '50%', width: '15rem' }} />
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.4} style={{ opacity: 0.2 }}>
          <img src={cloud} alt='cloud' style={{ marginLeft: '70%', width: '10rem' }} />
          <img src={cloud} alt='cloud' style={{ marginLeft: '20%', width: '10rem' }} />
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.7} style={{ opacity: 0.5 }}>
          <img src={cloud} alt='cloud' style={{ marginLeft: '70%', width: '10rem' }} />
          <img src={cloud} alt='cloud' style={{ marginLeft: '20%', width: '10rem' }} />
        </ParallaxLayer>
        <ParallaxLayer sticky={{ start: 1, end: 2.7 }} speed={-1} style={{ textAlign: 'center', zIndex: 1 }}>
          <img src={cat} alt='cat' />
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.1} style={{ zIndex: 2 }}>
          <div className={`valentine-wrapper ${isVisible && 'animation'}`} ref={pageRef}>
            <h1>Valentine?👉👈</h1>
            {accept ? (
              <img src={happyCat} alt='happy cat' />
            ) : (
              <>
                <div className='btns'>
                  <button onClick={() => setAccept(true)}>yes</button>
                  <button onClick={handleNoClick}>no</button>
                </div>
                {<p style={{ color: 'white', fontSize: '1.5rem' }}>{text}</p>}
              </>
            )}
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default App;