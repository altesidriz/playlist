import React from 'react';
import styled from 'styled-components';

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import DownloadIcon from '@mui/icons-material/Download';


const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
  flex: 5;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Recommendations = styled.div`
  flex: 2;
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
display: flex;
justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
width: 50px;
height: 50px; 
border-radius: 50%;
background-color: #999;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;


const ChanelCounter = styled.span`
  margin: 8px 0 20px 0;
  color: ${({ theme }) => theme.textSoft};
  font-size: 13px;
`;
const Description = styled.p`
font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 5px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="545px"
            src="https://www.youtube.com/embed/KnWJepe-nxE"
            title="Youtube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; ancrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>Harry Potter And The Cursed Child - Trailer(2025)</Title>
        <Details>
          <Info>2.1m views &bull; 9 days ago</Info>
          <Buttons>
            <Button><ThumbUpOutlinedIcon />10K</Button>
            <Button><ThumbDownOutlinedIcon /></Button>
            <Button><ReplyOutlinedIcon />Share</Button>
            <Button><DownloadIcon />Download</Button>
          </Buttons>
        </Details>
        <Hr></Hr>
        <Channel>
          <ChannelInfo>
            <Image src='\src\img\d4lg5mo-8589bcd2-ee2d-4d5b-9fdc-0bb84771efa1.png' />
            <ChannelDetail>
              <ChannelName>Hogwarts Videos</ChannelName>
              <ChanelCounter>1.2mil subscribers</ChanelCounter>
              <Description>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Aliquid atque quasi architecto minus nam dolorum voluptatibus commodi quidem pariatur voluptatem.
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
      </Content>
      <Recommendations></Recommendations>
    </Container>
  )
}

export default Video