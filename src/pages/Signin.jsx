import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: calc(100vh - 56px);
color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
background-color: ${({ theme }) => theme.bgLighter};
border: 1px solid ${({ theme }) => theme.soft};
padding: 20px 50px;
gap: 10px;
`;

const Title = styled.h1`
height: 24px;
padding-bottom: 10px;
`;

const SubTitle = styled.h2`
font-size: 20px;
font-weight: 300;
`;

const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
width: 100%;
`;

const Button = styled.button`
border-radius: 3px;
border: none;
padding: 15px 30px;
font-weight: 300;
cursor: pointer;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
margin-top: 10px;
display: flex;
font-size: 12px;
color: ${({ theme }) => theme.soft};
`;

const Links = styled.div`
margin-left: 50px;
`;

const Link = styled.span`
margin-left: 30px;
`;


const Signin = () => {
  const baseUrl = "http://localhost:8800/api";

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`${baseUrl}/auth/signin`, { name, password });
      dispatch(loginSuccess(res.data));

    } catch (error) {
      dispatch(loginFailure())
    }
  }

  const signInWithGoogle = async() => {
    dispatch(loginStart())
    signInWithPopup(auth, provider)
      .then((result) => {
        axios.post(`${baseUrl}/auth/google`, {
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        }).then((res)=>{
          dispatch(loginSuccess(res.data))
        })
      })
      .catch((error)=> {
        dispatch(loginFailure())
      });
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to VideoTube</SubTitle>
        <Input type='text' placeholder='username' onChange={e => setName(e.target.value)} />
        <Input type='password' placeholder='password' onChange={e => setPassword(e.target.value)} />
        <Button onClick={handleSignin}>Sign in</Button>
        <SubTitle>or</SubTitle>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        <SubTitle>or</SubTitle>
        <Title>Sign up</Title>
        <Input type='text' placeholder='username' onChange={e => setName(e.target.value)} />
        <Input type='email' placeholder='email' onChange={e => setEmail(e.target.value)} />
        <Input type='password' placeholder='password' onChange={e => setPassword(e.target.value)} />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(US)
        <Links>
          <Link>Help</Link>
          <Link>Terms</Link>
          <Link>Privacy</Link>
        </Links>
      </More>
    </Container>
  )
}

export default Signin