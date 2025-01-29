import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export const NavArrows = ({
  prev,
  next,
  handlePrevious,
  handleNext,
}: {
  prev: string | null;
  next: string | null;
  handlePrevious: () => void;
  handleNext: () => void;
}) => {
  return (
    <Box display={"flex"} justifyContent={"center"} p={2}>
      {prev !== null && (
        <IconButton onClick={() => handlePrevious()}>
          <ArrowBackIosIcon sx={{ color: "primary.contrastText" }} />
        </IconButton>
      )}
      {next !== null && (
        <IconButton onClick={() => handleNext()}>
          <ArrowForwardIosIcon sx={{ color: "primary.contrastText" }} />
        </IconButton>
      )}
    </Box>
  );
};
