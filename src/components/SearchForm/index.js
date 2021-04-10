import React, { useCallback } from "react";
import { useLocation } from "wouter";
import useForm from "./hook";
const RATINGS = ["g", "pg", "pg-13", "r"];

const SearchFormHome = ({ initialKeyword = "", initialRating = "g" }) => {
  const [path, pushLocation] = useLocation();

  // estos valores los recupero del state del reducer
  const {
    searchInput,
    rating,
    times,
    updateSearchInput,
    updateRating,
  } = useForm({
    initialKeyword,
    initialRating,
  });

  const manejarSubmit = useCallback(
    (event) => {
      //evito que no se refresque la pantalla
      event.preventDefault();

      //navegar a otra ruta
      pushLocation(`/gif/${searchInput}/${rating}`);
    },
    [pushLocation, rating, searchInput]
  );

  const manejarSearchInput = (event) => {
    updateSearchInput(event.target.value);
  };

  const manejarRating = (event) => {
    //setRating(event.target.value);

    updateRating(event.target.value);
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        placeholder="Ingresá un texto..."
        type="text"
        onChange={manejarSearchInput}
        value={searchInput}
      />

      <select onChange={manejarRating} value={rating}>
        <option disabled>Rating type</option>
        {RATINGS.map((rating) => (
          <option key={rating}>{rating}</option>
        ))}
      </select>

      <button>Buscar</button>
      <small>{times}</small>
    </form>
  );
};

//basicamente con el react.memo lo que hacemos es que solo se renderice este compoenente
// en el caso de que sus props se modifiquen
export default React.memo(SearchFormHome);
