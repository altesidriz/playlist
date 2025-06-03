import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center; 
  padding: 20px; 
`;

const Message = styled.p`
  color: ${({ theme }) => theme.textSoft};
  text-align: center;
  width: 100%; 
  margin-top: 50px;
  font-size: 1.2em;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false);   
  const query = useLocation().search; 

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true); 
      setError(false);   
      setVideos([]);     
      try {
        const res = await axios.get(`/api/videos/search${query}`);
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching search results:", err); 
        setError(true); 
      } finally {
        setLoading(false); 
      }
    };
    
    
    if (query) {
      fetchVideos();
    } else {
      setLoading(false);
      setVideos([]); 
    }
  }, [query]); 

  if (loading) {
    return (
      <Container>
        <Message>Loading search results...</Message>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Message style={{ color: "red" }}>Failed to load search results. Please try again.</Message>
      </Container>
    );
  }

  if (videos.length === 0) {
    return (
      <Container>
        <Message>No videos found for your search. Try a different query!</Message>
      </Container>
    );
  }

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;