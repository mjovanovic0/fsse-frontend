import uuid from "uuid";

const LocalStorageFavouriteKey = "FSSE_FAVOURITES";

export const loadFavouritesFromLocalStore = () => {
  const savedState = window.localStorage.getItem(LocalStorageFavouriteKey);
  if (savedState) {
    return JSON.parse(savedState);
  }
  return [];
};

export const FavouritesInitialState = loadFavouritesFromLocalStore();

export const createFavourite = (state, setState) => (name, setup) => {
  const newState = [
    ...state, {
      id: uuid.v4(),
      name,
      parts: [...setup.parts.map(part => part.i)]
    }
  ];
  window.localStorage.setItem(LocalStorageFavouriteKey, JSON.stringify(newState));
  setState(newState);
};

export const deleteFavourite = (state, setState) => (id) => {
  const toRemove = state.findIndex(f => f.id === id);
  const newState = [
    ...state.slice(0, toRemove),
    ...state.slice(toRemove + 1)
  ];
  window.localStorage.setItem(LocalStorageFavouriteKey, JSON.stringify(newState));
  setState(newState);
};