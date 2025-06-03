import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'; 

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; 
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border-radius: 8px; 
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px; 
  color: ${({ theme }) => theme.textSoft}; 
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px; 
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;

  &:disabled { 
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  resize: vertical; 

  &:disabled { 
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};

  &:disabled { 
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  font-size: 14px;
  margin-top: 5px; 
`;


const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [uploadError, setUploadError] = useState(null); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    
    setTags(e.target.value.split(",").map(tag => tag.trim()));
  };

  
  const uploadFile = (file, urlType) => {
    setUploadError(null); 
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
      },
      (error) => {
        
        setUploadError(`Failed to upload ${urlType === "imgUrl" ? "image" : "video"}: ${error.message}`);
        console.error("Firebase upload error:", error);
        
        if (urlType === "imgUrl") { setImgPerc(0); setImg(undefined); }
        else { setVideoPerc(0); setVideo(undefined); }
      },
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        }).catch(err => {
         
          setUploadError(`Failed to get download URL for ${urlType === "imgUrl" ? "image" : "video"}: ${err.message}`);
          console.error("Error getting download URL:", err);
          
          if (urlType === "imgUrl") { setImgPerc(0); setImg(undefined); }
          else { setVideoPerc(0); setVideo(undefined); }
        });
      }
    );
  };

  
  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);


  
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError(null); 

    if (!inputs.title || !inputs.desc || tags.length === 0 || videoPerc < 100 || imgPerc < 100 || !inputs.videoUrl || !inputs.imgUrl) {
      setUploadError("Please fill all fields and ensure both video and image are fully uploaded.");
      return;
    }
    
    try {
      const res = await axios.post("/api/videos", { ...inputs, tags });
      
      if (res.status === 200 || res.status === 201) {
        setOpen(false); 
        navigate(`/video/${res.data._id}`); 
      } else {
        setUploadError(`Video upload failed with status: ${res.status}`);
      }
    } catch (err) {
      setUploadError(`Failed to upload video: ${err.response?.data?.message || err.message}`);
      console.error("Backend API upload error:", err);
    }
  };

  
  const isUploadButtonDisabled = 
    videoPerc < 100 || 
    imgPerc < 100 || 
    !inputs.videoUrl || 
    !inputs.imgUrl || 
    !inputs.title || 
    !inputs.desc || 
    tags.length === 0; 

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>

        {/* Display upload errors if any */}
        {uploadError && <p style={{ color: "red", textAlign: "center" }}>{uploadError}</p>}

        {/* Video Upload Input */}
        <Label>Video:</Label>
        {videoPerc > 0 && videoPerc < 100 ? ( // Show progress only if actively uploading
          `Uploading Video: ${videoPerc}%`
        ) : videoPerc === 100 && inputs.videoUrl ? ( 
          <span style={{ color: "green", fontWeight: "bold" }}>Video Uploaded: Done!</span>
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            // Disable video input once a video is selected and has started uploading
            disabled={videoPerc > 0} 
          />
        )}
        
        {/* Title Input */}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={inputs.title || ''} 
        />

        {/* Description Input */}
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
          value={inputs.desc || ''} 
        />

        {/* Tags Input */}
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
          value={tags.join(', ') || ''} 
        />

        {/* Image Upload Input */}
        <Label>Image (Thumbnail):</Label> 
        {imgPerc > 0 && imgPerc < 100 ? ( 
          `Uploading Image: ${imgPerc}%`
        ) : imgPerc === 100 && inputs.imgUrl ? ( 
          <span style={{ color: "green", fontWeight: "bold" }}>Image Uploaded: Done!</span>
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
            
            disabled={imgPerc > 0} 
          />
        )}

        {/* Final Upload Button */}
        <Button onClick={handleUpload} disabled={isUploadButtonDisabled}>
          Upload
        </Button>
      </Wrapper>
    </Container>
  );
};

Upload.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default Upload;