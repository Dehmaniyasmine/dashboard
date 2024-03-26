import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Dialog, DialogActions, DialogTitle, DialogContent, Button } from '@mui/material';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from "../../theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/header";


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
      const response = await axios.get('http://localhost:3000/fetchMembers');
      setEmployees(response.data.employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/removeMember/${selectedEmployee._id}`);
      fetchEmployees();
      setConfirmDelete(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleCancelDelete = () => {
    setSelectedEmployee(null);
    setConfirmDelete(false);
  };

  return (
    
    <Box
    display='flex'
    flexDirection='column'
    m="20px"
    >
    <Header title="Remove Member" subtitle="Remove a member from the system" />
    <Box
    sx = {{
        borderRadius : "10px",
        padding : "10px",
        marginTop : "20px",
    }}
    >
      <List>
        {employees.map((employee) => (
          <ListItem key={employee._id}
          sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          borderRadius : "10px",
        }}
          >
            <ListItemText primary={`${employee.firstName} ${employee.lastName}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(employee)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      </Box>

      <Dialog open={confirmDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedEmployee && `${selectedEmployee.firstName} ${selectedEmployee.lastName}`}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
};

export default RemoveMember;