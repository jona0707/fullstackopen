import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Character } from "../types/CharactersTypes";
import { useState } from "react";
import { CharacterModal } from "./CharacterModal";

export default function CharacterGridItem({
  character,
}: {
  character: Character;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          backgroundColor: "secondary.main",
          color: "primary.contrastText",
        }}
        onClick={() => setOpen(true)}
      >
        <CardMedia
          component="img"
          image={character.image}
          alt={character.name}
          sx={{
            width: { xs: "100%", sm: 200 },
            maxHeight: { xs: "100%", sm: 200 },
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {character.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor:
                    character.status === "Alive" ? "green" : "red",
                }}
              ></Box>
              <Typography variant="body2">
                {character.status} - {character.species}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ color: "#9a9b9d" }}>
              Last known location:
            </Typography>
            <Typography variant="body2">{character.location.name}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: "#9a9b9d" }}>
              First seen in:
            </Typography>
            <Typography variant="body2">{character.origin.name}</Typography>
          </Box>
        </CardContent>
      </Card>
      <CharacterModal
        open={open}
        handleClose={handleClose}
        character={character}
      />
    </>
  );
}
