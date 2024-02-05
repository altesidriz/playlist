import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px; 
    border-radius: 50%;
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
const Date = styled.span`
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
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchComment = async () => {
            const res = await axios.get(`/api/users/find/${comment.userId}`);
            setChannel(res.data)
        };
        fetchComment();
    }, [comment.userId]);

    return (
        <Container>
            <Avatar src={channel.img} />
            <Details>
                <UserName>
                    {channel.name} <Date>5 hours ago</Date>
                </UserName>
                <Text>{comment.desc}</Text>
            </Details>
        </Container>
    )
}

export default Comment