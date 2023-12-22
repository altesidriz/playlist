import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  gap: 24 px;

`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
  flex: 5;
`;

const Title = styled.h1`
  
`;

const Details = styled.div``;
const Info = styled.span``;
const Buttons = styled.div``;
const Button = styled.div``;


const Recommendations = styled.div`
  flex: 2
`;



const Video = () => {
  return (
    <Container>
    <Content>
    <VideoWrapper>
    <iframe>
    width="100%"
    height="720"
    src="https://www.youtube.com/watch?v=KnWJepe-nxE"
    title="Youtube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; ancrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    </iframe>
    </VideoWrapper>
    </Content>
    <Recommendations></Recommendations>
    </Container>
  )
}

export default Video