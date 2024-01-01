import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Home = ({
  type,
}) => {
  const baseUrl = "http://localhost:8800/api"

  const [videos, setVideos] = useState([]);
  // create err state so can show on cards

  useEffect(()=>{
    const fetchVideos = async() => {
      //try catch action needed **!**
      const res = await axios.get(`${baseUrl}/videos/${type}`);
      setVideos(res.data);
    }
    fetchVideos()
  },[type])
  return (
    <Container>
        {videos.map((video) => (
          <Card key={video._id} video={video}/>
        ))}
    </Container>
  )
}

export default Home