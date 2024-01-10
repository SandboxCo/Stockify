import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  ButtonGroup,
  LinearProgress,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const FormContainer = styled(Container)({
  width: '50%',
  margin: 'auto',
  marginTop: '2rem',
  padding: '2rem',
});

const FormWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const BackButton = styled(Button)({
  marginRight: '1rem',
});

const ImageUpload = styled('div')({
  border: '2px dashed #007BFF',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  marginTop: '1rem',
});

const Title = styled(Typography)({
  fontFamily: 'Montserrat',
  fontSize: '2rem',
  fontWeight: 'bold',
});

const ProgressBar = styled(LinearProgress)({
  width: '100%',
  marginTop: '1rem',
});

const defaultAvatar =
  'https://res.cloudinary.com/your-cloud-name/image/upload/v1624557161/default-avatar.png';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [profilePicture, setProfilePicture] = useState(null);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    favoriteStock: '',
    bio: '',
    city: '',
    financialInterest: '',
    socialMediaLink: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Cloudinary if a file is selected
    if (profilePicture) {
      const formData = new FormData();
      formData.append('file', profilePicture);

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/your-cloud-name/image/upload?upload_preset=your-preset',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const cloudinaryUrl = data.secure_url;
          setUserData((prevData) => ({ ...prevData, profilePicture: cloudinaryUrl }));
        } else {
          console.error('Failed to upload image to Cloudinary:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading image to Cloudinary', error);
      }
    }

    // Proceed with the rest of your form submission logic
    // ...

    // For the example, let's just reset the form data
    setStep(1);
    setProfilePicture(null);
    setUserData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      favoriteStock: '',
      bio: '',
      city: '',
      financialInterest: '',
      socialMediaLink: '',
      agreeTerms: false,
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <FormWrapper>
            <Title variant="h5">Account Information</Title>
            <ProgressBar variant="determinate" value={(1 / 8) * 100} />
            <TextField
              label="Full Name"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={userData.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <ButtonGroup>
              <Button variant="contained" color="primary" onClick={() => setStep(2)}>
                Next
              </Button>
            </ButtonGroup>
          </FormWrapper>
        );

      case 2:
        return (
          <FormWrapper>
            <Title variant="h5">Profile Picture</Title>
            <ProgressBar variant="determinate" value={(2 / 8) * 100} />
            <ImageUpload>
              <input type="file" onChange={handleFileChange} />
              <Typography variant="body1">Upload your profile picture</Typography>
              {profilePicture && (
                <Avatar
                  alt="Profile Picture"
                  src={URL.createObjectURL(profilePicture)}
                  sx={{ width: 100, height: 100, marginTop: '1rem' }}
                />
              )}
            </ImageUpload>
            <ButtonGroup>
              <BackButton variant="contained" color="primary" onClick={() => setStep(1)}>
                Back
              </BackButton>
              <Button variant="contained" color="primary" onClick={() => setStep(3)}>
                Next
              </Button>
            </ButtonGroup>
          </FormWrapper>
        );

      case 3:
        return (
          <FormWrapper>
            <Title variant="h5">E Details</Title>
            <ProgressBar variant="determinate" value={(3 / 8) * 100} />

            <TextField
              label="Favorite Stock"
              name="favoriteStock"
              value={userData.favoriteStock}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="City"
              name="city"
              value={userData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Bio"
              name="bio"
              value={userData.bio}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
            />
            <ButtonGroup>
              <BackButton variant="contained" color="primary" onClick={() => setStep(2)}>
                Back
              </BackButton>
              <Button variant="contained" color="primary" onClick={() => setStep(4)}>
                Next
              </Button>
            </ButtonGroup>
          </FormWrapper>
        );

      case 4:
        return (
          <FormWrapper>
            <Title variant="h5">Location Details</Title>
            <ProgressBar variant="determinate" value={(4 / 8) * 100} />
            <TextField
              label="City"
              name="city"
              value={userData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <ButtonGroup>
              <BackButton variant="contained" color="primary" onClick={() => setStep(3)}>
                Back
              </BackButton>
              <Button variant="contained" color="primary" onClick={() => setStep(5)}>
                Next
              </Button>
            </ButtonGroup>
          </FormWrapper>
        );

      case 5:
        return (
          <FormWrapper>
            <Title variant="h5">Financial Information</Title>
            <ProgressBar variant="determinate" value={(5 / 8) * 100} />
            <TextField
              label="Financial Interest"
              name="financialInterest"
              value={userData.financialInterest}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <ButtonGroup>
              <BackButton variant="contained" color="primary" onClick={() => setStep(4)}>
                Back
              </BackButton>
              <Button variant="contained" color="primary" onClick={() => setStep(6)}>
                Next
              </Button>
            </ButtonGroup>
          </FormWrapper>
        );

      case 6:
        return (
          <FormWrapper>
            <Title variant="h5">Social Media Details</Title>
            <ProgressBar variant="determinate" value={(6 / 8) * 100} />
            <TextField
              label="Social Media Link"
              name="socialMediaLink"
              value={userData.socialMediaLink}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={userData.agreeTerms}
                  onChange={handleChange}
                  name="agreeTerms"
                  color="primary"
                />
              }
              label="I agree to the terms and conditions"
            />
            <ButtonGroup>
              <BackButton variant="contained" color="primary" onClick={() => setStep(5)}>
                Back
              </BackButton>
              <Button variant="contained" color="primary" onClick={() => setStep(7)}>
                Next
              </Button>
            </ButtonGroup>
          </FormWrapper>
        );

      case 7:
        return (
          <FormWrapper>
            <Title variant="h5">Confirmation</Title>
            {profilePicture && (
              <Avatar
                alt="Profile Picture"
                src={URL.createObjectURL(profilePicture)}
                sx={{ width: 100, height: 100, marginTop: '1rem' }}
              />
            )}
            <ProgressBar variant="determinate" value={(7 / 8) * 100} />
            <Typography variant="body1">Review your information before submission:</Typography>
            <Typography variant="body1">Username: {userData.username}</Typography>
            <Typography variant="body1">Email: {userData.email}</Typography>
            <Typography variant="body1">Full Name: {userData.fullName}</Typography>
            <Typography variant="body1">Favorite Stock: {userData.favoriteStock}</Typography>
            <Typography variant="body1">Bio: {userData.bio}</Typography>
            <Typography variant="body1">City: {userData.city}</Typography>
            <Typography variant="body1">Financial Interest: {userData.financialInterest}</Typography>
            <Typography variant="body1">Social Media Link: {userData.socialMediaLink}</Typography>
            <ButtonGroup>
              <BackButton variant="contained" color="primary" onClick={() => setStep(6)}>
                Back
              </BackButton>
              <Button variant="contained" color="primary" onClick={() => setStep(8)}>
                Submit
              </Button>
            </ButtonGroup>
          </FormWrapper>
        );

      case 8:
        return (
          <FormWrapper>
            <Title variant="h5">Submission Successful</Title>
            <ProgressBar variant="determinate" value={100} />
            <Typography variant="body1">Thank you for submitting your information!</Typography>
          </FormWrapper>
        );

      default:
        return null;
    }
  };

  return (
    <FormContainer>
      <Paper elevation={3} sx={{ padding: '2rem', boxSizing: 'border-box' }}>
        {renderStep()}
      </Paper>
    </FormContainer>
  );
};

export default MultiStepForm;
