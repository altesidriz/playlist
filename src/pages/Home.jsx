import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;



const Home = ({type}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false);   

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true); 
      setError(false); 
      try {
        const res = await axios.get(`/api/videos/${type}`);
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError(true); 
      } finally {
        setLoading(false); 
      }
    };
    fetchVideos();
  }, [type]);

  if (loading) return <p>Loading videos...</p>; 
  if (error) return <p>Something went wrong. Could not load videos.</p>; 
  if (videos.length === 0 && !loading && !error) return <p>No videos found.</p>; 

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

Home.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Home;