import React from "react";
import ItemConflictDialog from "../component/Dialogs/ItemConflictDialog/ItemConflictDialog";
import {calculateItemForgeStats, findItemById, findSetByName} from "./DataUtil";
import produce from "immer";

export const getItemFromSetup = (setup, type) => setup.parts.find(item => item.t === type);
export const getItemFromSet = (set, type) => set.p.find(part => part.t === type);

export const setupHasType = (setup, type) => setup.parts.some(item => item.t === type);

export const SetupInitialState = {
  level: 0,
  forgeBonus: {
    attack: 0,
    defense: 0,
    armor: 0,
    damage: 0,
    hp: 0,
  },
  itemStats: {
    attack: 0,
    defense: 0,
    armor: 0,
    damage: 0,
    hp: 0,
    stamina: 0,
    staminaGain: 0,
    xpGain: 0,
    goldGain: 0
  },
  setStats: {
    attack: 0,
    defense: 0,
    armor: 0,
    damage: 0,
    hp: 0,
    stamina: 0,
    staminaGain: 0,
    xpGain: 0,
    goldGain: 0
  },
  forge: 5,
  parts: [],
  completedSets: []
};

export const setForgeLevel = (draft, level) => {
  draft.forge = level;
  draft.forgeBonus.attack = 0;
  draft.forgeBonus.defense = 0;
  draft.forgeBonus.armor = 0;
  draft.forgeBonus.damage = 0;
  draft.forgeBonus.hp = 0;

  draft.parts.forEach(part => {
    const forgedStats = calculateItemForgeStats(part, level);

    draft.forgeBonus.attack += forgedStats.attack;
    draft.forgeBonus.defense += forgedStats.defense;
    draft.forgeBonus.armor += forgedStats.armor;
    draft.forgeBonus.damage += forgedStats.damage;
    draft.forgeBonus.hp += forgedStats.hp;
  });
};

export const createSetupFromParts = (parts) => {
  const items = parts.map(itemId => findItemById(itemId));
  return produce(SetupInitialState, async draft => {
    for (let idx = 0; idx < items.length; idx++) {
      const item = items[idx];
      await addItem(draft, item);
    }
  });
};

export const addItem = async (draft, item, onItemConflict) => {
  if (hasType(draft, item.t)) {
    const oldItem = getItemByType(draft, item.t);
    if (oldItem.i !== item.i) {
      await onItemConflict(oldItem, item).then(() => {
        removeSetBonusForItem(draft, oldItem);
        removeItem(draft, oldItem);
        assignItem(draft, item);
      });
    }
  } else {
    assignItem(draft, item);
  }
  if (isSetCompleted(draft, item)) {
    addCompletedSet(draft, item, onItemConflict);
  }
  recalculateMinLevel(draft);
};

/*eslint no-loop-func: "off"*/
export const addSet = async (draft, set, onItemConflict) => {
  // Set already added, skipping re-adding
  if (draft.completedSets.findIndex((completed => completed.i === set.i)) > -1) {
    return;
  }

  let wholeSetAdded = true;
  for (let idx = 0; idx < set.p.length; idx++) {
    const newSetItem = set.p[idx];
    if (hasType(draft, newSetItem.t)) {
      const oldItem = getItemByType(draft, newSetItem.t);
      if (newSetItem.i !== oldItem.i) {
        await onItemConflict(oldItem, newSetItem)
          .then(() => {
            removeSetBonusForItem(draft, oldItem);
            removeItem(draft, oldItem);
            assignItem(draft, newSetItem);
          })
          .catch(() => {
            wholeSetAdded = false;
          });
      }
    } else {
      assignItem(draft, newSetItem);
    }
  }

  if (wholeSetAdded) {
    draft.setStats.attack += (set.ss.at || 0);
    draft.setStats.defense += (set.ss.de || 0);
    draft.setStats.armor += (set.ss.ar || 0);
    draft.setStats.damage += (set.ss.da || 0);
    draft.setStats.hp += (set.ss.h || 0);
    draft.setStats.stamina += (set.ss.s || 0);
    draft.setStats.staminaGain += (set.ss.sg || 0);
    draft.setStats.xpGain += (set.ss.x || 0);
    draft.setStats.goldGain += (set.ss.g || 0);

    draft.completedSets.push(set);
  }
  recalculateMinLevel(draft);
};

const assignItem = (draft, item) => {
  const forgedStats = calculateItemForgeStats(item, draft.forge);

  draft.forgeBonus.attack += forgedStats.attack;
  draft.forgeBonus.defense += forgedStats.defense;
  draft.forgeBonus.armor += forgedStats.armor;
  draft.forgeBonus.damage += forgedStats.damage;
  draft.forgeBonus.hp += forgedStats.hp;

  draft.itemStats.attack += (item.is.at || 0);
  draft.itemStats.defense += (item.is.de || 0);
  draft.itemStats.armor += (item.is.ar || 0);
  draft.itemStats.damage += (item.is.da || 0);
  draft.itemStats.hp += (item.is.h || 0);
  draft.itemStats.stamina += (item.is.s || 0);
  draft.itemStats.staminaGain += (item.is.sg || 0);
  draft.itemStats.xpGain += (item.is.x || 0);
  draft.itemStats.goldGain += (item.is.g || 0);

  draft.parts.push(item);
};

const removeItem = (draft, item) => {
  const partIndex = draft.parts.findIndex(part => part.i === item.i);
  if (partIndex > -1) {
    const forgedStats = calculateItemForgeStats(item, draft.forge);

    draft.forgeBonus.attack -= forgedStats.attack;
    draft.forgeBonus.defense -= forgedStats.defense;
    draft.forgeBonus.armor -= forgedStats.armor;
    draft.forgeBonus.damage -= forgedStats.damage;
    draft.forgeBonus.hp -= forgedStats.hp;

    draft.itemStats.attack -= (item.is.at || 0);
    draft.itemStats.defense -= (item.is.de || 0);
    draft.itemStats.armor -= (item.is.ar || 0);
    draft.itemStats.damage -= (item.is.da || 0);
    draft.itemStats.hp -= (item.is.h || 0);
    draft.itemStats.stamina -= (item.is.s || 0);
    draft.itemStats.staminaGain -= (item.is.sg || 0);
    draft.itemStats.xpGain -= (item.is.x || 0);
    draft.itemStats.goldGain -= (item.is.g || 0);

    draft.parts = [
      ...draft.parts.slice(0, partIndex),
      ...draft.parts.slice(partIndex + 1)
    ];
  }
};

const removeSetBonusForItem = (draft, item) => {
  const setIndex = draft.completedSets.findIndex(set => set.n === item.sn);
  if (setIndex > -1) {
    const set = draft.completedSets[setIndex];

    draft.setStats.attack -= (set.ss.at || 0);
    draft.setStats.defense -= (set.ss.de || 0);
    draft.setStats.armor -= (set.ss.ar || 0);
    draft.setStats.damage -= (set.ss.da || 0);
    draft.setStats.hp -= (set.ss.h || 0);
    draft.setStats.stamina -= (set.ss.s || 0);
    draft.setStats.staminaGain -= (set.ss.sg || 0);
    draft.setStats.xpGain -= (set.ss.x || 0);
    draft.setStats.goldGain -= (set.ss.g || 0);

    draft.completedSets = [
      ...draft.completedSets.slice(0, setIndex),
      ...draft.completedSets.slice(setIndex + 1)
    ];
  }
};

const isSetCompleted = (draft, item) => {
  if (typeof (item.sn) !== "undefined") {
    const set = findSetByName(item.sn);
    let setCompleted = true;
    set.p.forEach(part => {
      if (part.i !== item.i && (!hasType(draft, part.t) || getItemByType(draft, part.t).i !== part.i)) {
        setCompleted = false;
      }
    });
    return setCompleted;
  }
  return false;
};

const addCompletedSet = (draft, item, onItemConflict) => addSet(draft, findSetByName(item.sn), onItemConflict);

const getItemByType = (draft, type) => draft.parts.find(part => part.t === type);

const hasType = (draft, type) => draft.parts.findIndex(part => part.t === type) > -1;

const recalculateMinLevel = (draft) => draft.level = Math.max(...draft.parts.map(part => part.l));

export const itemConflictResolver = (openDialog, closeDialog) => (oldItem, newItem) => new Promise((resolve, reject) => {
  openDialog({
    title: "Item Conflict",
    component: <ItemConflictDialog oldItem={oldItem} newItem={newItem}/>,
    buttons: [
      {
        text: "Keep old", color: "primary", onClick: () => {
          closeDialog();
          reject();
        }
      },
      {
        text: "Use new", color: "secondary", onClick: () => {
          closeDialog();
          resolve();
        }
      },
    ]
  });
});