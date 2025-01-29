import { Box, Typography } from "@mui/material";

export const Header = ({ brand }: { brand: string }) => {
  return (
    <Box sx={{ bgcolor: "black", color: "primary.contrastText", p: 2, display: "flex", justifyContent: "center" }}>
      <Typography variant="h5">{brand} <span style={{fontSize:"1rem"}}>exercise by Jona</span></Typography>
    </Box>
  );
};
