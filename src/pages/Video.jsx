import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchStart, fetchSuccess, fetchFailure, like } from "../redux/videoSlice"; 
import { subscription } from "../redux/userSlice";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";


import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import Comments from '../components/Comments'
import Recommendation from "../components/Recommendation";
import AvatarImg from '../assets/avatar.png';


const Container = styled.div`
  display: flex;
  gap: 24px;

   @media (max-width: 480px) {
   flex-direction: column;
   padding: 10px;
  }
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};

   @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 480px) {
    font-size: 12px;
    flex-wrap: wrap;
  }
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 480px){
    width: 100%;
    padding-top: 10px;
    justify-content: space-around;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  @media (max-width: 480px){
    span{
      display: none;
    }
  }
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
object-fit: cover; 
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

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo, loading, error } = useSelector((state) => state.video); 
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  const [channelLoading, setChannelLoading] = useState(true); 
  const [channelError, setChannelError] = useState(false);   


  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart()); 
      setChannelLoading(true); 
      setChannelError(false); 

      try {
        const videoRes = await axios.get(`/api/videos/find/${path}`);
        
        if (!videoRes.data || !videoRes.data.userId) {
          throw new Error("Video data or userId is missing.");
        }

        const channelRes = await axios.get(`/api/users/find/${videoRes.data.userId}`);
        
        setChannel(channelRes.data); 
        dispatch(fetchSuccess(videoRes.data)); 
      } catch (err) {
        console.error("Error fetching video or channel:", err);
        dispatch(fetchFailure()); 
        setChannelError(true); 
      } finally {
        setChannelLoading(false); 
      }
    };
    fetchData();
  }, [path, dispatch]);


  const handleLike = async () => {
    
    if (!currentVideo || !currentUser) {
      console.warn("Cannot like/dislike: Video not loaded or user not logged in.");
      return;
    }

    try {
      
      if (currentVideo.likes.includes(currentUser._id)) {
        
        await axios.put(`/api/users/unlike/${currentVideo._id}`); 
      } else {
        
        await axios.put(`/api/users/like/${currentVideo._id}`);
      }
      dispatch(like(currentUser._id));
    } catch (err) {
      console.error("Error handling like:", err);
      
    }
  };

  const handleDislike = async () => {
    
    if (!currentVideo || !currentUser) {
      console.warn("Cannot like/dislike: Video not loaded or user not logged in.");
      return;
    }

    try {
      
      if (currentVideo.dislikes.includes(currentUser._id)) {
        
        await axios.put(`/api/users/undislike/${currentVideo._id}`); 
      } else {
        
        await axios.put(`/api/users/dislike/${currentVideo._id}`);
      }
      dispatch(dislike(currentUser._id));
    } catch (err) {
      console.error("Error handling dislike:", err);
      
    }
  };

  const handleSub = async () => {
    
    if (!currentUser || !channel._id) {
      console.warn("Cannot subscribe/unsubscribe: User or channel not loaded.");
      return;
    }

    try {
      if (currentUser.subscribedUsers?.includes(channel._id)) { 
        await axios.put(`/api/users/unsub/${channel._id}`);
      } else {
        await axios.put(`/api/users/sub/${channel._id}`);
      }
      dispatch(subscription(channel._id));
    } catch (err) {
      console.error("Error handling subscription:", err);
      
    }
  };

  
  if (loading) return <Container>Loading video...</Container>;
  if (error) return <Container>Something went wrong: Could not load video.</Container>;
  
  if (!currentVideo) return <Container>Video not found.</Container>;


  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} autoPlay controls/>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views &bull; {format(currentVideo.createdAt)}
          </Info>
          <Buttons>
            
            <Button onClick={handleLike} disabled={!currentUser}>
              {currentVideo.likes?.includes(currentUser?._id) ? ( 
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />)}
              {" "}
              {currentVideo.likes?.length || 0} 
            </Button>
            <Button onClick={handleDislike} disabled={!currentUser}>
              {currentVideo.dislikes?.includes(currentUser?._id) ? ( 
                <ThumbDownIcon />
              ) : (
                <ThumbDownOutlinedIcon />
              )}{" "}
              <span>Dislike</span>
            </Button>
            <Button><ReplyOutlinedIcon /><span>Share</span></Button>
            <Button><DownloadIcon /><span>Download</span></Button>
          </Buttons>
        </Details>
        <Hr></Hr>
        <Channel>
          <ChannelInfo>
            {channelLoading ? ( 
                <Image src="" alt="Loading channel image..." />
            ) : channelError ? (
                <Image src="" alt="Channel image failed to load" />
            ) : (
                <Image src={channel.img || AvatarImg} alt={channel.name || "Channel Image"}/>
            )}
            <ChannelDetail>
              {channelLoading ? (
                <ChannelName>Loading Channel...</ChannelName>
              ) : channelError ? (
                <ChannelName>Unknown Channel</ChannelName>
              ) : (
                <ChannelName>{channel.name}</ChannelName>
              )}
              <ChanelCounter>
                {channelLoading ? "..." : channelError ? "N/A" : `${channel.sub} subscribers`}
              </ChanelCounter>
              <Description>
                {currentVideo.desc} 
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          {currentUser && ( 
            <Subscribe onClick={handleSub}>
              {currentUser.subscribedUsers?.includes(channel._id) 
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Subscribe>
          )}
        </Channel>
        <Hr></Hr>
        {currentVideo._id && <Comments videoId={currentVideo._id}/>} 
      </Content>
      {currentVideo.tags && <Recommendation tags={currentVideo.tags}/>} 
    </Container>
  )
}


export default Video;