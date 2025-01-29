import { Box, Grid2 } from "@mui/material";
import { CharacterGridProps } from "../types/CharactersTypes";
import CharacterGridItem from "./CharacterGridItem";

export const CharacterGrid = ({ characters }: CharacterGridProps) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      pb={5}
    >
      <Grid2 container spacing={3} size={16} width={"80%"}>
        {characters.map((character) => (
          <Grid2 size={{xs: 12, lg:6}} key={character.id}>
            <CharacterGridItem character={character} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
