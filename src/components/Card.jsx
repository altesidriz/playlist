import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Container = styled.div`
    width:  ${(props) => props.type !== "sm" && "360px"};
    margin-bottom: ${(props) => props.type == "sm" ? "20px" : "45px"};
    cursor: pointer;
    display: ${(props) => props.type == "sm" && "flex"};
    gap: 10px;
`;
const Image = styled.img`
    width: 100%;
    height: ${(props) => props.type == "sm" ? "100px" : "202px"};
    background-color: #999;
    flex:1;
`;

const Details = styled.div`
    display: flex;
    margin-top:  ${(props) => props.type !== "sm" && "16px"};
    gap: 12px;
    flex: 1;
`;

const ChannelImage = styled.img`
width: 36px;
height: 36px; 
border-radius: 50%;
display: ${(props) => props.type == "sm" && "none"};
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

const Card = ({ type }) => {
    return (
        <Link to="/video/test" style={{ textDecoration: 'none' }}>
            <Container type={type}>
                <Image type={type} src='https://images.hellomagazine.com/imagenes/film/20210126105415/harry-potter-tv-show-what-will-it-be-about/0-508-62/harry-potter-1-t.jpg' />
                <Details type={type}>
                    <ChannelImage type={type} src='\src\img\d4lg5mo-8589bcd2-ee2d-4d5b-9fdc-0bb84771efa1.png' />
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