import { Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Box } from "@mui/system";

const Item = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color={colors.grey[600]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Item;