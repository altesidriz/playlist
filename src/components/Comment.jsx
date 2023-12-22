import React from 'react'
import styled from 'styled-components'

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



const Comment = () => {
    return (
        <Container>
            <Avatar src='\src\img\d4lg5mo-8589bcd2-ee2d-4d5b-9fdc-0bb84771efa1.png' />
            <Details>
                <UserName>
                    Harry Potter <Date>5 hours ago</Date>
                </UserName>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, reprehenderit. Quae repellendus, doloremque id iure temporibus reprehenderit vitae sapiente? Optio consequatur odio quasi ea, dolorum modi unde architecto quidem minus necessitatibus, blanditiis facere. Neque quasi eaque, aliquam hic ipsam aut!</Text>
            </Details>
        </Container>
    )
}

export default Comment