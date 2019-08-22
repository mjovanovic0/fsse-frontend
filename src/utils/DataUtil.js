import items from "../data/fsse-items.min";
import sets from "../data/fsse-sets.min";

export const getItems = () => items;
export const getSets = () => sets;

export const findItemById = (id) => items.find(i => i.i === id);
export const findItemByName = (name) => items.find(i => i.n === name);
export const findSetByName = (name) => sets.find(s => s.n === name);

export const levelComparatorAsc = (l, r) => statsComparator("l")(r, l);
export const levelComparatorDesc = (l, r) => statsComparator("l")(l, r);
export const itemStatsComparator = (stat) => (l, r) => statsComparator(stat)(l.is, r.is);
export const setStatsComparator = (stat) => (l, r) => statsComparator(stat)(l.ss, r.ss);

const forgeLevelBonusMap = [0, 5, 10, 15, 25, 50];

export const calculateItemForgeStats = (item, level) => {
  const statsCount = Object.keys(item.is).length;
  const bonusBase = forgeLevelBonusMap[level]
  const bonus = Math.ceil(bonusBase / statsCount);
  return {
    attack: item.is.at ? bonus : 0,
    defense: item.is.de ? bonus : 0,
    armor: item.is.ar ? bonus : 0,
    damage: item.is.da ? bonus : 0,
    hp: item.is.h ? bonus : 0,
  };
};

export const equalArrays = (left, right) => {
  if (left === right) return true;
  if (left == null || right == null) return false;
  if (left.length !== right.length) return false;
  for (let i = 0; i < left.length; ++i) {
    if (left[i] !== right[i]) return false;
  }
  return true;
};

const statsComparator = (stat) => (l, r) => {
  if (l[stat] && r[stat]) {
    if (l[stat] > r[stat]) {
      return -1;
    }
    if (l[stat] < r[stat]) {
      return 1;
    }
    return 0;
  }
  if (l[stat]) {
    return -1;
  }
  if (r[stat]) {
    return 1;
  }
  return 0;
};