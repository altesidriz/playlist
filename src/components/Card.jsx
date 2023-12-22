import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    width: 360px;
    margin-bottom: 45px;
    cursor: pointer;
`;
const Image = styled.img`
    width: 100%;
    height: 202px;
    background-color: #999;
`;

const Details = styled.div`
    display: flex;
    margin-top: 16px;
    gap: 12px;
`;

const ChannelImage = styled.img`
width: 36px;
height: 36px; 
border-radius: 50%;
background-color: #999;
`;

const Texts = styled.div``;
const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
font-size: 14px;
color: ${({ theme }) => theme.textSoft};
margin: 9px 0px;
`;

const Info = styled.div`
font-size: 14px;
color: ${({ theme }) => theme.textSoft};

`;

const Card = () => {
    return (
        <Link to="/video/test" style={{textDecoration: 'none'}}>
            <Container>
                <Image src='https://images.hellomagazine.com/imagenes/film/20210126105415/harry-potter-tv-show-what-will-it-be-about/0-508-62/harry-potter-1-t.jpg' />
                <Details>
                    <ChannelImage src='src\img\d4lg5mo-8589bcd2-ee2d-4d5b-9fdc-0bb84771efa1.png' />
                    <Texts>
                        <Title>Test Video</Title>
                        <ChannelName>Hogwartz Videos</ChannelName>
                        <Info>88K views &bull; 1 year ago </Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default Card