import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { format } from 'timeago.js'; 
import PropTypes from 'prop-types'; 

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px; 
    border-radius: 50%;
    object-fit: cover; 
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserName = styled.span`
    font-size: 15px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;

const CommentDate = styled.span` 
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.textSoft};
    margin-left: 5px;
`;

const Text = styled.p`
    font-size: 14px;
    color: ${({ theme }) => theme.text};
`;

const Comment = ({ comment }) => {
    const [channel, setChannel] = useState(null); 
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(false);     

    useEffect(() => {
        const fetchCommentUser = async () => { 
            setLoading(true); 
            setError(false);   
            try {
                
                if (!comment || !comment.userId) {
                    console.warn("Comment or userId is missing for fetching user info.");
                    setError(true);
                    setLoading(false);
                    return;
                }
                const res = await axios.get(`/api/users/find/${comment.userId}`);
                setChannel(res.data);
            } catch (err) {
                console.error("Error fetching comment user:", err); 
                setError(true); 
            } finally {
                setLoading(false); 
            }
        };
        fetchCommentUser();
    }, [comment.userId, comment]); 

    
    if (loading) {
        return (
            <Container>
                <Avatar src="https://i.stack.imgur.com/l60Hf.png" alt="Loading user avatar" /> 
                <Details>
                    <UserName>Loading User...</UserName>
                    <Text>Loading comment...</Text>
                </Details>
            </Container>
        );
    }

    if (error || !channel) {
        return (
            <Container>
                <Avatar src="https://i.stack.imgur.com/l60Hf.png" alt="User avatar not available" />
                <Details>
                    <UserName>Unknown User <CommentDate>{comment.createdAt ? format(comment.createdAt) : 'N/A'}</CommentDate></UserName>
                    <Text>{comment.desc || 'Comment content not available.'}</Text>
                </Details>
            </Container>
        );
    }

    return (
        <Container>
            <Avatar src={channel.img || "https://i.stack.imgur.com/l60Hf.png"} alt={channel.name || "User Avatar"} />
            <Details>
                <UserName>
                    {channel.name}
                    <CommentDate>{format(comment.createdAt)}</CommentDate>
                </UserName>
                <Text>{comment.desc}</Text>
            </Details>
        </Container>
    );
};


Comment.propTypes = {
    comment: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
};

export default Comment;