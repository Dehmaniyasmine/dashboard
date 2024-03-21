import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";

const RemoveMember = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box 
        display="flex" 
        flexDirection="column"
        alignItems="flex-end">
            <Typography variant="h2" color={colors.grey[800]} mt={10}>
                Remove Member
            </Typography>
        </Box>
    );
};
export default RemoveMember;