import { Box, IconButton, Modal, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Character } from "../types/CharactersTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: { xs: "20rem", sm: "30rem" },
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export const CharacterModal = ({
  open,
  handleClose,
  character,
}: {
  open: boolean;
  handleClose: () => void;
  character: Character;
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <IconButton onClick={handleClose}>
            <CancelIcon />
          </IconButton>
        </Box>
        <Typography variant="h5" fontWeight={"bold"}>
          {character.name}
        </Typography>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", sm: "row" }}
          gap={2}
        >
          <Box sx={{ borderRadius: "0.5rem" }}>
            <img
              src={character.image}
              alt={character.name}
              style={{ width: "100%" }}
            />
          </Box>
          <Box width={"100%"}>
            <Typography variant="body1">
              <strong> Status:</strong> {character.status}{" "}
            </Typography>
            <Typography variant="body1">
              <strong> Specie:</strong> {character.species}{" "}
            </Typography>
            <Typography variant="body1">
              <strong> Type:</strong> {character.type}{" "}
            </Typography>
            <Typography variant="body1">
              <strong> Gender:</strong> {character.gender}{" "}
            </Typography>
            <Typography variant="body1">
              <strong> Origin:</strong> {character.origin.name}{" "}
            </Typography>
            <Typography variant="body1">
              <strong> Location:</strong> {character.location.name}{" "}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
