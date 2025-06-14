import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js";
import PropTypes from 'prop-types'; 
import AvatarImg from '../assets/avatar.png';

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
  object-fit: cover; 
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
  object-fit: cover; 
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

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  const [channelLoading, setChannelLoading] = useState(true); 
  const [channelError, setChannelError] = useState(false);   

  useEffect(() => {
    const fetchChannel = async () => {
      setChannelLoading(true); 
      setChannelError(false);   
      try {
        const res = await axios.get(`/api/users/find/${video.userId}`);
        setChannel(res.data);
      } catch (err) {
        console.error("Error fetching channel:", err);
        setChannelError(true); 
      } finally {
        setChannelLoading(false); 
      }
    };
    fetchChannel();
  }, [video.userId]); 

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
          alt={video.title} 
        />
        <Details type={type}>
          {channelLoading ? ( 
            <ChannelImage type={type} /> 
          ) : channelError ? (
            <ChannelImage type={type} /> 
          ) : (
            <ChannelImage
              type={type}
              src={channel.img || AvatarImg}
              alt={channel.name} 
            />
          )}
          <Texts>
            <Title>{video.title}</Title>
            {channelLoading ? (
              <ChannelName>Loading Channel...</ChannelName> 
            ) : channelError ? (
              <ChannelName>Unknown Channel</ChannelName> 
            ) : (
              <ChannelName>{channel.name}</ChannelName> 
            )}
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};


Card.propTypes = {
  type: PropTypes.string, 
  video: PropTypes.shape({ 
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired, 
    createdAt: PropTypes.string.isRequired, 
    
  }).isRequired,
};

export default Card;