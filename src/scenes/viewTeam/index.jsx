import Header from "../../components/header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";
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
            console.log(response.data);
            setFetchedEmployees(response.data.employees); // Update fetched employees state
        });
    };

    // Function to fetch employees based on department
    const fetchEmployeesByDepartment = (department) => {
        axios.get(`/fetchMembers?department=${department}`).then((response) => {
            console.log(response.data);
            setFetchedEmployees(response.data.employees); // Corrected line: update fetched employees state
        });
        console.log(`Fetching data for ${department} department`);
        setSelectedDepartment(department); // Update selected department
    };

    return (
        <Box display="flex" flexDirection="column" m="20px">
            <Header title="View Team" subtitle="Monitor your team here!" />
            <Box>
                <Stack direction="row" spacing={2}>
                    <Button
                        color="secondary"
                        variant={
                            selectedDepartment === "Research" ? "contained" : "outlined"
                        }
                        onClick={() => fetchEmployeesByDepartment("Research")}
                    >
                        Research Department
                    </Button>
                    <Button
                        color="secondary"
                        variant={
                            selectedDepartment === "Development" ? "contained" : "outlined"
                        }
                        onClick={() => fetchEmployeesByDepartment("Development")}
                    >
                        Development Department
                    </Button>
                    <Button
                        color="secondary"
                        variant={
                            selectedDepartment === "Marketing" ? "contained" : "outlined"
                        }
                        onClick={() => fetchEmployeesByDepartment("Marketing")}
                    >
                        Marketing Department
                    </Button>
                    <Button
                        color="secondary"
                        variant={selectedDepartment === "RD" ? "contained" : "outlined"}
                        onClick={() => fetchEmployeesByDepartment("RD")}
                    >
                        RD Department
                    </Button>
                    <Button
                        color="secondary"
                        variant={
                            selectedDepartment === "Finance" ? "contained" : "outlined"
                        }
                        onClick={() => fetchEmployeesByDepartment("Finance")}
                    >
                        Finance Department
                    </Button>
                </Stack>
            </Box>
            <Box>
                <List>
                    {fetchedEmployees.map((employee) => (
                        <ListItem key={employee._id}>
                            <ListItemText
                                primary={`${employee.firstName} ${employee.lastName}`}
                                secondary={employee.department}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default ViewTeam;
