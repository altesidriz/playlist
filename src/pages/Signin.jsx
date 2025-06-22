import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

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
  border-radius: 8px; 
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 10px;
  
  @media (max-width: 480px){
    /* display: none; */
    font-size: 15px
  }
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  width: 100%; 
  margin-top: 5px; 
  
  &:disabled { 
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};

  @media (max-width: 480px){
    height: 50px;
    align-items: center;
    justify-content:center;
  }
`;

const Links = styled.div`
  margin-left: 50px;

   @media (max-width: 480px){
    margin-left: 0;
  }
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(null); 

  
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState(null); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null); 
    dispatch(loginStart());
    try {
      const res = await axios.post("/api/auth/signin", { name: loginName, password: loginPassword });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong!";
      setLoginError(errorMessage); 
      dispatch(loginFailure());
    }
  };

 

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(null); 
    dispatch(loginStart()); 

    
    if (!registerName || !registerEmail || !registerPassword) {
      setRegisterError("Please fill in all registration fields.");
      dispatch(loginFailure()); 
      return;
    }

    try {
      
      const res = await axios.post("/api/auth/signup", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });
      
      
      if (res.status === 200 || res.status === 201) {
        dispatch(loginSuccess(res.data)); 
        navigate("/");
      } else {
        setRegisterError(res.data?.message || "Registration failed with unexpected status.");
        dispatch(loginFailure());
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed!";
      setRegisterError(errorMessage); 
      dispatch(loginFailure());
    }
  };


  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to VideoTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => { setLoginName(e.target.value); setLoginError(null); }} 
          value={loginName} 
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => { setLoginPassword(e.target.value); setLoginError(null); }} 
          value={loginPassword} 
        />
        {loginError && <Message>{loginError}</Message>} 
        <Button onClick={handleLogin}>Sign in</Button>
        
        
        
        
        
        <Title style={{marginTop: "15px"}}>or</Title> 
        <Input
          placeholder="username"
          onChange={(e) => { setRegisterName(e.target.value); setRegisterError(null); }} 
          value={registerName} 
        />
        <Input
          placeholder="email"
          onChange={(e) => { setRegisterEmail(e.target.value); setRegisterError(null); }} 
          value={registerEmail} 
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => { setRegisterPassword(e.target.value); setRegisterError(null); }} 
          value={registerPassword} 
        />
        {registerError && <Message>{registerError}</Message>} 
        <Button onClick={handleRegister}>Sign up</Button> 
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;