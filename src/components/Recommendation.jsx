import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import PropTypes from 'prop-types';

const Container = styled.div`
  flex: 2;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.textSoft};
  text-align: center;
  margin-top: 20px;
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const NoVideosText = styled.p`
  color: ${({ theme }) => theme.textSoft};
  text-align: center;
  margin-top: 20px;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);  

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(false);  
      try {
       
        if (!tags || tags.length === 0) {
            setVideos([]);
            setLoading(false);
            return;
        }
        const res = await axios.get(`/api/videos/tags?tags=${tags.join(',')}`);
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching recommended videos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [tags]);

  if (loading) {
    return <Container><LoadingText>Loading recommendations...</LoadingText></Container>;
  }

  if (error) {
    return <Container><ErrorText>Failed to load recommendations.</ErrorText></Container>;
  }

  if (videos.length === 0) {
    return <Container><NoVideosText>No recommendations found for these tags.</NoVideosText></Container>;
  }

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};


Recommendation.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Recommendation;