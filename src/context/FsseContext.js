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

export const useSetup = () => {
  const {setupState: state, setSetupState: setState, setForgeLevel, addItem, addSet, loadSetup, createSetupFromParts} = useFsse("useSetup");
  return {state, setState, setForgeLevel, addItem, addSet, loadSetup, createSetupFromParts};
};

export const useFavourites = () => {
  const {favouritesState: state, setFavouritesState: setState, createFavourite, deleteFavourite} = useFsse("useFavourites");
  return {state, setState, createFavourite, deleteFavourite};
};

export const useItemBrowser = () => {
  const {itemBrowserState: state, setItemBrowserState: setState, toggleItemBrowser, performItemBrowserSearch: search, resetItemBrowserSearchCriteria: resetSearchCriteria} = useFsse("useItemBrowser");
  return {state, setState, toggleItemBrowser, search, resetSearchCriteria};
};

export const useSetBrowser = () => {
  const {setBrowserState: state, setSetBrowserState: setState, toggleSetBrowser, performSetBrowserSearch: search, resetSetBrowserSearchCriteria: resetSearchCriteria} = useFsse("useSetBrowser");
  return {state, setState, toggleSetBrowser, search, resetSearchCriteria};
};

export const useSetFinder = () => {
  const {setFinderState: state, setSetFinderState: setState, toggleSetFinder, performSetFinderSearch: search, resetSetFinderSearchCriteria: resetSearchCriteria} = useFsse("useSetFinder");
  return {state, setState, toggleSetFinder, search, resetSearchCriteria};
};

const FsseProvider = ({children}) => {
  const [setupState, setSetupState] = React.useState(SetupInitialState);
  const [favouritesState, setFavouritesState] = React.useState(FavouritesInitialState);
  const [itemBrowserState, setItemBrowserState] = React.useState(ItemBrowserInitialState);
  const [setBrowserState, setSetBrowserState] = React.useState(SetBrowserInitialState);
  const [setFinderState, setSetFinderState] = React.useState(SetFinderInitialState);

  return (
    <FsseContext.Provider value={{
      setupState, setSetupState,
      setForgeLevel: async (level) => setSetupState(await produce(setupState, draft => setForgeLevel(draft, level))),
      addItem: async (item, onItemConflict) => setSetupState(await produce(setupState, draft => addItem(draft, item, onItemConflict))),
      addSet: async (set, onItemConflict) => setSetupState(await produce(setupState, draft => addSet(draft, set, onItemConflict))),
      loadSetup: (setupState) => setSetupState(setupState),

      favouritesState, setFavouritesState,
      createSetupFromParts,
      createFavourite: createFavourite(favouritesState, setFavouritesState),
      deleteFavourite: deleteFavourite(favouritesState, setFavouritesState),

      itemBrowserState, setItemBrowserState,
      performItemBrowserSearch,
      toggleItemBrowser: toggleItemBrowser(itemBrowserState, setItemBrowserState),
      resetItemBrowserSearchCriteria: resetItemBrowserSearchCriteria(itemBrowserState, setItemBrowserState),

      setBrowserState, setSetBrowserState,
      performSetBrowserSearch,
      toggleSetBrowser: toggleSetBrowser(setBrowserState, setSetBrowserState),
      resetSetBrowserSearchCriteria: resetSetBrowserSearchCriteria(setBrowserState, setSetBrowserState),

      setFinderState, setSetFinderState,
      performSetFinderSearch,
      toggleSetFinder: toggleSetFinder(setFinderState, setSetFinderState),
      resetSetFinderSearchCriteria: resetSetFinderSearchCriteria(setFinderState, setSetFinderState)
    }}>
      {children}
      <ItemBrowserDialog/>
      <SetBrowserDialog/>
      <SetFinderDialog/>
    </FsseContext.Provider>
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