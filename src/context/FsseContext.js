import React from 'react';
import produce from 'immer';

import {addItem, addSet, createSetupFromParts, setForgeLevel, SetupInitialState} from "../utils/SetupUtil";
import {createFavourite, deleteFavourite, FavouritesInitialState} from "../utils/FavouritesUtil";
import {ItemBrowserInitialState, performItemBrowserSearch, resetItemBrowserSearchCriteria, toggleItemBrowser} from "../utils/ItemBrowserUtil";
import {performSetBrowserSearch, resetSetBrowserSearchCriteria, SetBrowserInitialState, toggleSetBrowser} from "../utils/SetBrowserUtil";
import {performSetFinderSearch, resetSetFinderSearchCriteria, SetFinderInitialState, toggleSetFinder} from "../utils/SetFinderUtil";

import ItemBrowserDialog from "../component/Dialogs/ItemBrowserDialog/ItemBrowserDialog";
import SetBrowserDialog from "../component/Dialogs/SetBrowserDialog/SetBrowserDialog";
import SetFinderDialog from "../component/Dialogs/SetFinderDialog/SetFinderDialog";

const FsseContext = React.createContext({});
const {Provider} = FsseContext;

export const useSetup = () => {
  const {setupState: state, setSetupState: setState} = useFsse("useSetup");
  return {
    state,
    setState,
    createSetupFromParts,
    setForgeLevel: async (level) => setState(await produce(state, draft => setForgeLevel(draft, level))),
    addItem: async (item, onItemConflict) => setState(await produce(state, draft => addItem(draft, item, onItemConflict))),
    addSet: async (set, onItemConflict) => setState(await produce(state, draft => addSet(draft, set, onItemConflict))),
    loadSetup: (newState) => setState(newState),
  };
};

export const useFavourites = () => {
  const {favouritesState: state, setFavouritesState: setState} = useFsse("useFavourites");
  return {
    state,
    setState,
    createFavourite: createFavourite(state, setState),
    deleteFavourite: deleteFavourite(state, setState),
  };
};

export const useItemBrowser = () => {
  const {itemBrowserState: state, setItemBrowserState: setState} = useFsse("useItemBrowser");
  return {
    state,
    setState,
    search: performItemBrowserSearch,
    toggleItemBrowser: toggleItemBrowser(state, setState),
    resetItemBrowserSearchCriteria: resetItemBrowserSearchCriteria(state, setState),
  };
};

export const useSetBrowser = () => {
  const {setBrowserState: state, setSetBrowserState: setState} = useFsse("useSetBrowser");
  return {
    state,
    setState,
    search: performSetBrowserSearch,
    toggleSetBrowser: toggleSetBrowser(state, setState),
    resetSetBrowserSearchCriteria: resetSetBrowserSearchCriteria(state, setState),
  };
};

export const useSetFinder = () => {
  const {setFinderState: state, setSetFinderState: setState} = useFsse("useSetFinder");
  return {
    state,
    setState,
    toggleSetFinder: toggleSetFinder(state, setState),
    search: performSetFinderSearch,
    resetSetFinderSearchCriteria: resetSetFinderSearchCriteria(state, setState),
  };
};

const FsseProvider = ({children}) => {
  const [setupState, setSetupState] = React.useState(SetupInitialState);
  const [favouritesState, setFavouritesState] = React.useState(FavouritesInitialState);
  const [itemBrowserState, setItemBrowserState] = React.useState(ItemBrowserInitialState);
  const [setBrowserState, setSetBrowserState] = React.useState(SetBrowserInitialState);
  const [setFinderState, setSetFinderState] = React.useState(SetFinderInitialState);

  return (
    <Provider value={{
      setupState, setSetupState,
      favouritesState, setFavouritesState,
      itemBrowserState, setItemBrowserState,
      setBrowserState, setSetBrowserState,
      setFinderState, setSetFinderState,
    }}>
      {children}
      <ItemBrowserDialog/>
      <SetBrowserDialog/>
      <SetFinderDialog/>
    </Provider>
  );
};

const useFsse = (hookName) => {
  const context = React.useContext(FsseContext);
  if (context === undefined) {
    throw new Error(`${hookName} must be used within FsseProvider`);
  }
  return context
};

export default FsseProvider;