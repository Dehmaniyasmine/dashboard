import { Box, Button, TextField, Stack, Grid, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/header";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useRef } from 'react';
import Webcam from "react-webcam";

const addMember = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)"); 
  const [webcamOpen, setWebcamOpen] = useState(false);
  const webcamRef = useRef(null);
  const [picture, setPicture] = useState(null);

  //handle form data
  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/addMember', values);

      if (response.status === 200) {
        toast.success('Member added successfully'); // Show success notification
      } else {
        toast.error('Failed to add member'); // Show error notification
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPicture(imageSrc);
    setWebcamOpen(false); // Close webcam after taking picture
  };

  return(
    <Box
    display='flex'
    flexDirection='column'
    m="20px"
    >
    <Header title="Add Member" subtitle="Add a new member to the system" />
    <Box
    display='flex'
    flexDirection='row'
    >
    <Box
        sx = {{width: '60%'}}
    >
    <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.department}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Clearance Level"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clearanceLevel}
                name="clearanceLevel"
                error={!!touched.clearanceLevel && !!errors.clearanceLevel}
                helperText={touched.clearanceLevel && errors.clearanceLevel}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Stack spacing={2} direction="row" justifyContent="flex-end" mt={2}>
                  {!webcamOpen && (
                    <Button onClick={() => setWebcamOpen(true)} color="secondary" variant="contained">
                      Scan Face
                    </Button>
                  )}
                  {webcamOpen && (
                    <Button onClick={capture} color="secondary" variant="contained">
                      Take Picture
                    </Button>
                  )}
                  <Button type="submit" color="secondary" variant="contained">
                    Create New User
                  </Button>
                </Stack>
        <ToastContainer position="bottom-right" autoClose={5000} />
          </form>
        )}
      </Formik>
    </Box> 
    <Box sx={{ width: '40%', borderRadius: 8, overflow: 'hidden', marginLeft: '20px' }}>
  {/* Open Webcam Here */}
  {webcamOpen && (
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
    />
  )}
</Box> 
    </Box>
    </Box>
  );

};
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  clearanceLevel: yup.number().typeError("invalid Clearance Level").required("required"),
  department: yup.string().required("required"),

});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  clearanceLevel: "",
  department: "",
};
export default addMember;