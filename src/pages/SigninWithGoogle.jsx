import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase"; // Assuming correct path to firebase config
import { signInWithPopup } from "firebase/auth";
// Removed: import { async } from "@firebase/util"; - This was a typo/unnecessary import
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
  border-radius: 8px; /* Added: slight border-radius */
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 10px; /* Added: spacing */
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
  width: 100%; /* Make buttons full width */
  margin-top: 5px; /* Add some space */
  
  &:disabled { /* Style for disabled button */
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
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignInWithGoogle = () => {
  // State for Login
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(null); // Added: for login errors

  // State for Registration
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState(null); // Added: for registration errors

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null); // Clear previous errors
    dispatch(loginStart());
    try {
      const res = await axios.post("/api/auth/signin", { name: loginName, password: loginPassword });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong!";
      setLoginError(errorMessage); // Set user-friendly error message
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    setLoginError(null); // Clear previous errors
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, provider);
      
      const res = await axios.post("/api/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL,
      });
      // console.log(res); // Remove this console.log in production
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Google Sign-in failed.";
      setLoginError(errorMessage); // Set user-friendly error message
      dispatch(loginFailure());
    }
  };

  // Implemented REGISTER FUNCTIONALITY
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(null); // Clear previous errors
    dispatch(loginStart()); // Use loginStart for registration too if it dispatches a loading state

    // Basic client-side validation
    if (!registerName || !registerEmail || !registerPassword) {
      setRegisterError("Please fill in all registration fields.");
      dispatch(loginFailure()); // Stop loading state if validation fails
      return;
    }

    try {
      // Assuming your backend has a /api/auth/signup endpoint
      const res = await axios.post("/api/auth/signup", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });
      
      // Assuming successful registration also logs the user in immediately
      if (res.status === 200 || res.status === 201) {
        dispatch(loginSuccess(res.data)); // Dispatch loginSuccess if backend returns user data
        navigate("/");
      } else {
        setRegisterError(res.data?.message || "Registration failed with unexpected status.");
        dispatch(loginFailure());
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed!";
      setRegisterError(errorMessage); // Set user-friendly error message
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
          onChange={(e) => { setLoginName(e.target.value); setLoginError(null); }} // Clear error on change
          value={loginName} // Controlled component
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => { setLoginPassword(e.target.value); setLoginError(null); }} // Clear error on change
          value={loginPassword} // Controlled component
        />
        {loginError && <Message>{loginError}</Message>} {/* Display login error */}
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => { setRegisterName(e.target.value); setRegisterError(null); }} // Separate state, clear error
          value={registerName} // Controlled component
        />
        <Input
          placeholder="email"
          onChange={(e) => { setRegisterEmail(e.target.value); setRegisterError(null); }} // Separate state, clear error
          value={registerEmail} // Controlled component
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => { setRegisterPassword(e.target.value); setRegisterError(null); }} // Separate state, clear error
          value={registerPassword} // Controlled component
        />
        {registerError && <Message>{registerError}</Message>} {/* Display registration error */}
        <Button onClick={handleRegister}>Sign up</Button> {/* Link to handleRegister */}
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

export default SignInWithGoogle;