import Header from "../../components/header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ViewTeam = () => {
  // State to keep track of the selected department and fetched employees
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [fetchedEmployees, setFetchedEmployees] = useState([]);

  useEffect(() => {
    // Fetch all employees initially
    fetchEmployees();
  }, []);

  // Function to fetch all employees
  const fetchEmployees = () => {
    axios.get("/fetchMembers").then((response) => {
      setFetchedEmployees(response.data.employees); // Update fetched employees state
    });
  };

  // Function to fetch employees based on department
  const fetchEmployeesByDepartment = (department) => {
    axios.get(`/fetchMembers?department=${department}`).then((response) => {
      setFetchedEmployees(response.data.employees); // Corrected line: update fetched employees state
    });
    setSelectedDepartment(department); // Update selected department
  };

  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Header title="View Team" subtitle="Monitor your team here!" />
      <Box>
      <Stack direction="row" spacing={2}>
          {["Research", "Development", "Marketing", "HR", "Finance"].map((department) => (
            <Button
              key={department}
              color="secondary"
              variant={selectedDepartment === department ? "contained" : "outlined"}
              onClick={() => fetchEmployeesByDepartment(department)}
            >
              {department} Department
            </Button>
          ))}
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
            sx={{ marginBottom: 2, position: "relative" }}
          >
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
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ViewTeam;
