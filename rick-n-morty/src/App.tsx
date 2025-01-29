import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import "./index.css";
import rickNMortyService from "./services/rickNMortyService";
import { CharacterGrid } from "./components/CharacterGrid";
import { Character, CharacterResponse } from "./types/CharactersTypes";
import { NavArrows } from "./components/NavArrows";
import { Box } from "@mui/material";

const App = () => {
  const [characters, setCharacters] = useState([] as Character[]);
  const [prev, setPrev] = useState(null as string | null);
  const [next, setNext] = useState(null as string | null);

  const getCharacters = async (baseUrl: string) => {
    rickNMortyService.getCharacters(baseUrl).then((data: CharacterResponse) => {
      setCharacters(data.results);
      setNext(data.info.next);
      setPrev(data.info.prev);
    });
  };

  useEffect(() => {
    const baseUrl = "https://rickandmortyapi.com/api/character";
    getCharacters(baseUrl);
  }, []);

  const handlePrevious = () => {
    getCharacters(prev as string);
  };
  const handleNext = () => {
    getCharacters(next as string);
  };

  return (
    <Box sx={{ bgcolor: "primary.main", minHeight: "100vh" }}>
      <Header brand="Rick and Morty" />
      <NavArrows
        prev={prev}
        next={next}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
      <CharacterGrid characters={characters} />
    </Box>
  );
};

export default App;
