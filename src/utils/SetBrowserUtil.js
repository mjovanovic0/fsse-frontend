import {findSetByName, getSets, setStatsComparator} from "./DataUtil";
import {StatTypeShort} from "../model/StatType";

export const SetBrowserInitialState = {
  open: false,
  filter: {
    name: "",
    minLevel: 0,
    maxLevel: 999999,
    most: -1,
    maxParts: 9,
  },
  result: getSets(),
  selected: null,
};

export const toggleSetBrowser = (state, setState) => (isOpen, preloadSetName) => {
  if (preloadSetName) {
    const filter = {
      ...state.filter,
      name: preloadSetName
    };
    setState({
      ...state,
      open: true,
      filter,
      result: performSetBrowserSearch(filter),
      selected: findSetByName(preloadSetName),
    })
  } else {
    setState({...state, open: isOpen});
  }
};

export const resetSetBrowserSearchCriteria = (state, setState) => () => {
  setState({...SetBrowserInitialState, open: true});
};


export const performSetBrowserSearch = (filter = {
  name: "",
  minLevel: 0,
  maxLevel: 999999,
  most: -1,
  maxParts: 9,
}) => {
  const name = (filter.name || "").toLowerCase();
  const minLevel = filter.minLevel || -1;
  const maxLevel = filter.maxLevel || -1;
  const most = filter.most; // 0 is valid option
  const maxParts = filter.maxParts || 9;

  let result = getSets();
  if (minLevel !== -1) {
    result = result.filter(set => set.l >= minLevel);
  }
  if (maxLevel !== -1) {
    result = result.filter(set => set.l <= maxLevel);
  }
  if (maxParts > 0) {
    result = result.filter(set => set.p.length <= maxParts)
  }
  if (name) {
    result = result.filter(set => set.n.toLowerCase().indexOf(name) > -1)
  }
  if (most !== -1) {
    const stat = StatTypeShort[most];
    result.sort(setStatsComparator(stat));
  }
  return result;
};