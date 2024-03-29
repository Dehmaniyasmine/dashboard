import Header from "../../components/header";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { Box } from "@mui/system";

const ViewCenter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const streamFeedByDepartment = (department) => {
    setSelectedDepartment(department);
  };


  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Header title="View Center" subtitle="Monitor your facility here!" />
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
                onClick={() => streamFeedByDepartment(department)}
              >
                {department} Department
              </Button>
            )
          )}
        </Stack>
      </Box>
    </Box>
  );
};
export default ViewCenter;
