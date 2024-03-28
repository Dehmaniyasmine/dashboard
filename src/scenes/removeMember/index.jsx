import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header";
import { Box } from "@mui/system";

const RemoveMember = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employees, setEmployees] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/fetchMembers");
      setEmployees(response.data.employees);
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/removeMember/${selectedEmployee._id}`
      );
      fetchEmployees();
      setConfirmDelete(false);
      if (selectedEmployee) {
        toast.success(
          `${selectedEmployee.firstName} ${selectedEmployee.lastName} removed successfully`
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleCancelDelete = () => {
    setSelectedEmployee(null);
    setConfirmDelete(false);
  };

  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Header
        title="Remove Member"
        subtitle="Remove a member from the system"
      />
      <Box
        sx={{
          borderRadius: "10px",
        }}
      >
        <List>
          {employees.map((employee) => (
            <ListItem
              key={employee._id}
              sx={{
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                borderRadius: "10px",
              }}
            >
              <ListItemText
                primary={`${employee.firstName} ${employee.lastName}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(employee)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
      <ToastContainer position="bottom-right" autoClose={5000} />

      <Dialog open={confirmDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          {selectedEmployee &&
            `${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
          ?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RemoveMember;
