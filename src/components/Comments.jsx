import styled from 'styled-components'
import Comment from './Comment';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types'; 

const Container = styled.div``;

const NewComment = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px; 
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px; 
    border-radius: 50%;
    object-fit: cover; 
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    background-color: transparent;
    outline: none;
    padding: 5px;
    width: 80%;
`;

const Comments = ({ videoId }) => {

    const { currentUser } = useSelector((state) => state.user);

    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true); 
    const [commentsError, setCommentsError] = useState(false);   


    useEffect(() => {
        const fetchComments = async () => {
            setCommentsLoading(true); 
            setCommentsError(false);   
            try {
                const res = await axios.get(`/api/comments/${videoId}`);
                setComments(res.data);
            } catch (err) {
                console.error("Error fetching comments:", err); 
                setCommentsError(true); 
            } finally {
                setCommentsLoading(false); 
            }
        };
        fetchComments();
    }, [videoId]); 

    return (
        <Container>
            
            {currentUser && (
                <NewComment>
                    
                    <Avatar src={currentUser.img || "https://i.stack.imgur.com/l60Hf.png"} alt={currentUser.name || "User Avatar"}/> 
                    <Input placeholder="Add a comment..." />
                </NewComment>
            )}

            
            {commentsLoading ? (
                <p>Loading comments...</p>
            ) : commentsError ? (
                <p>Could not load comments.</p>
            ) : comments.length === 0 ? (
                <p>No comments yet. Be the first!</p>
            ) : (
                comments.map(comment => (
                    <Comment key={comment._id} comment={comment} />
                ))
            )}
        </Container>
    )
}


Comments.propTypes = {
    videoId: PropTypes.string.isRequired, 
};

export default Comments