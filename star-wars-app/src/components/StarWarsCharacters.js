import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import { getData } from "../api"; // getData is the component making the API call
import "./star-wars-characters.css";

export default function StarWarsCharacters() {
  const [url, setUrl] = useState("https://swapi.co/api/people");
  const [previous, setPrevious] = useState();
  const [next, setNext] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  // This code
  useEffect(() => {
    setIsLoading(true);
    const getCharacters = async () => {
      const characters = await getData(url);
      console.log(characters);
      setNext(characters.next);
      setPrevious(characters.previous);
      setCharacters(characters.results);
      setIsLoading(false);
    };
    getCharacters();
  }, [url]);

  const goToNext = e => {
    e.preventDefault();
    setUrl(next);
  };

  const goToPrevious = e => {
    e.preventDefault();
    setUrl(previous);
  };

  return (
    <div>
      {isLoading ? (
        <Loader
          type="ThreeDots"
          color="#FFC402"
          height={30}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <React.Fragment>
          {characters.map(character => (
            <div key={character.url}>{character.name}</div>
          ))}
        </React.Fragment>
      )}
      <div className="buttons">
        <button onClick={goToPrevious} disabled={!previous}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!next}>
          Next
        </button>
      </div>
    </div>
  );
}
