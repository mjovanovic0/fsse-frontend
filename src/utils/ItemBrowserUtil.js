import {StatTypeShort} from "../model/StatType";
import {findItemByName, getItems, itemStatsComparator} from "./DataUtil";

export const ItemBrowserInitialState = {
  open: false,
  filter: {
    name: "",
    minLevel: 0,
    maxLevel: 999999,
    inSet: false,
    part: -1,
    rarity: -1,
    most: -1,
  },
  result: getItems(),
  selected: null,
};

export const toggleItemBrowser = (state, setState) => (isOpen, preloadItemName) => {
  if (preloadItemName) {
    const filter = {
      ...state.filter,
      name: preloadItemName
    };
    setState({
      ...state,
      open: true,
      filter,
      result: performItemBrowserSearch(filter),
      selected: findItemByName(preloadItemName),
    })
  } else {
    setState({...state, open: isOpen});
  }
};

export const resetItemBrowserSearchCriteria = (state, setState) => () => {
  setState({...ItemBrowserInitialState, open: true});
};

export const performItemBrowserSearch = (filter = {
  name: "",
  minLevel: 0,
  maxLevel: 999999,
  inSet: false,
  part: -1,
  rarity: -1,
  most: -1,
}) => {
  const name = (filter.name || "").toLowerCase();
  const minLevel = filter.minLevel || -1;
  const maxLevel = filter.maxLevel || -1;
  const inSet = filter.inSet || false;
  const part = filter.part; // 0 is valid option
  const rarity = filter.rarity || -1;
  const most = filter.most; // 0 is valid option

  let result = getItems();
  if (minLevel !== -1) {
    result = result.filter(item => item.l >= minLevel);
  }
  if (maxLevel !== -1) {
    result = result.filter(item => item.l <= maxLevel);
  }
  if (inSet) {
    result = result.filter(item => typeof (item.sn) !== "undefined");
  }
  if (part !== -1) {
    result = result.filter(item => item.t === part);
  }
  if (rarity !== -1) {
    result = result.filter(item => item.r === rarity);
  }
  if (name) {
    result = result.filter(item => item.n.toLowerCase().indexOf(name) > -1)
  }
  if (most !== -1) {
    const stat = StatTypeShort[most];
    result.sort(itemStatsComparator(stat));
  }

  return result;
};