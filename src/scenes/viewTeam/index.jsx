import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import Header from "../../components/header";
import { ToastContainer, toast } from "react-toastify";
import { Box } from "@mui/system";

const ViewTeam = () => {
  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [fetchedEmployees, setFetchedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store the selected employee
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog open/close

  useEffect(() => {
    // Fetch all employees initially
    fetchEmployees();
  }, []);

  // Function to fetch all employees
  const fetchEmployees = () => {
    axios.get("/fetchMembers").then((response) => {
      setFetchedEmployees(response.data.employees);
    });
  };

  // Function to fetch employees based on department
  const fetchEmployeesByDepartment = (department) => {
    try {
      axios.get(`/fetchMembers?department=${department}`).then((response) => {
        setFetchedEmployees(response.data.employees);
      });
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
    setSelectedDepartment(department); // Update selected department
  };

  const handleCardClick = (employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true); // Open the dialog when a card is clicked
  };

  const handleCloseDialog = () => {
    setSelectedEmployee(null);
    setDialogOpen(false); // Close the dialog
  };

  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Header title="View Team" subtitle="Monitor your team here!" />
      <Box>
        <Stack direction="row" spacing={2}>
          {["Research", "Development", "Marketing", "HR", "Finance"].map(
            (department) => (
              <Button
                key={department}
                color="secondary"
                variant={
                  selectedDepartment === department ? "contained" : "outlined"
                }
                onClick={() => fetchEmployeesByDepartment(department)}
              >
                {department} Department
              </Button>
            )
          )}
        </Stack>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={2}
        sx={{ marginTop: 2 }}
      >
        {fetchedEmployees.map((employee) => (
          <Card
            key={employee._id}
            variant="outlined"
            sx={{ marginBottom: 2, position: "relative" }}
            onClick={() => handleCardClick(employee)} // Call handleCardClick when a card is clicked
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h5" component="div">
                  {`${employee.firstName} ${employee.lastName}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Department: {employee.department}
                </Typography>
                <Typography
                  variant="body2"
                  color={employee.onSite ? "#39e75f" : "#fb3b1e"}
                >
                  {employee.onSite ? "On Site" : "Off Site"}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      {/* Dialog for displaying further information about the selected employee */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Employee Information</DialogTitle>
        <DialogContent>
          {/* Render additional information about the selected employee */}
          {selectedEmployee && (
            <>
              <Typography>
                Name:{" "}
                {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
              </Typography>
              <Typography>Department: {selectedEmployee.department}</Typography>
              <Typography>
                Status: {selectedEmployee.onSite ? "On Site" : "Off Site"}
              </Typography>
              <Typography>Email: {selectedEmployee.email}</Typography>
                <Typography>Contact: {selectedEmployee.contact}</Typography>
                <Typography>Clearance Level: {selectedEmployee.clearanceLevel}</Typography>
                <Typography>Joined since: {selectedEmployee.addedAt}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </Box>
  );
};

export default ViewTeam;
