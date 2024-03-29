import Header from "../../components/header";
import { Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { Box } from "@mui/system";

const ViewCenter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" m="20px">
      <Header title="View Center" subtitle="Monitor your facility here!" />
      <Box>
        <Stack direction="row" spacing={2}>
          <Button color="secondary" variant="outlined">
            Research Departement
          </Button>
          <Button color="secondary" variant="outlined">
            Development Departement
          </Button>
          <Button color="secondary" variant="outlined">
            Marketing Departement
          </Button>
          <Button color="secondary" variant="outlined">
            HR Departement
          </Button>
          <Button color="secondary" variant="outlined">
            Finance Departement
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default ViewCenter;
