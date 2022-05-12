import styled from 'styled-components';
import naruto from '../../images/naruto.png';
import { Quotes } from '../../components/'
import { getQuote } from '../../services';
import { useState, useEffect, useRef } from 'react';
import jutsoSound from '../../sounds/jutso.mp3'; 

const audio = new Audio(jutsoSound); 

export function App() {
  const isMounted = useRef(true)
  const [quoteState, setQuoteState] = useState({speaker: 'Loading speaker...',
  quote: 'Loading Quote'})

  const onUpdate = async () => {
    const quote = await getQuote()

    if(isMounted.current){
      audio.play()
      setQuoteState(quote)
    }
  }

  useEffect(()=>{
    onUpdate();

    return () => {
      isMounted.current = false;
    };
  }, [])

  return (
    <Content>
      <Quotes quote={quoteState.quote} speaker={quoteState.speaker} onUpdate={onUpdate} />
      <NarutoImg src={naruto} alt="naruto com kunai"/>
    </Content>
  );
}

const Content = styled.div`
  height: 100vh;
  padding: 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NarutoImg = styled.img`
  max-width: 50vw;
  align-self: flex-end;
`;