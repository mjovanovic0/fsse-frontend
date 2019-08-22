import ItemType, {getWearableItemTypes} from "../model/ItemType";
import StatType, {getWearableItemStatType} from "../model/StatType";
import {equalArrays, getSets, levelComparatorAsc, levelComparatorDesc} from "./DataUtil";

export const SetFinderInitialState = {
  open: false,
  types: getWearableItemTypes().sort(),
  stats: getWearableItemStatType().sort(),
  filter: {
    min: 0,
    max: 999999,
    types: [],
    stats: [],
    descending: true,
  },
  result: [],
};

export const toggleSetFinder = (state, setState) => (isOpen) => setState({...state, open: isOpen});

export const resetSetFinderSearchCriteria = (state, setState) => () => {
  setState({...SetFinderInitialState, open: true});
};

export const performSetFinderSearch = (filter = {
  min: 0,
  max: 999999,
  types: [],
  stats: [],
  descending: true,
}) => {
  const shouldSearch = filter.types.length > 1 || filter.stats.length > 1;
  if (shouldSearch) {
    const minLevel = filter.min || -1;
    const maxLevel = filter.max || -1;
    const itemTypes = filter.types.map(type => ItemType[type]).sort();
    const statTypes = filter.stats.map(stat => StatType[stat]).sort();
    const partsCount = filter.types.length;
    const statsCount = filter.stats.length;
    const descending = filter.descending;

    let result = getSets();
    if (minLevel !== -1) {
      result = result.filter(set => set.l >= minLevel);
    }
    if (maxLevel !== -1) {
      result = result.filter(set => set.l <= maxLevel);
    }
    if (partsCount > 0) {
      result = result
        .filter(set => set.it.length === partsCount)
        .filter(set => equalArrays(itemTypes, set.it))
    }
    if (statsCount > 0) {
      result = result
        .filter(set => set.st.length === statsCount)
        .filter(set => equalArrays(statTypes, set.st))
    }
    result.sort(descending ? levelComparatorDesc : levelComparatorAsc);
    return result;
  }
  return [];
};