import { Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Box } from "@mui/system";

const Item = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="10px" mt="5px">
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
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