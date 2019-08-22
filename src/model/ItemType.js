const ItemType = [];
ItemType[ItemType["Helmet"] = 0] = "Helmet";
ItemType[ItemType["Armor"] = 1] = "Armor";
ItemType[ItemType["Gloves"] = 2] = "Gloves";
ItemType[ItemType["Boots"] = 3] = "Boots";
ItemType[ItemType["Weapon"] = 4] = "Weapon";
ItemType[ItemType["Shield"] = 5] = "Shield";
ItemType[ItemType["Ring"] = 6] = "Ring";
ItemType[ItemType["Amulet"] = 7] = "Amulet";
ItemType[ItemType["Rune"] = 8] = "Rune";
ItemType[ItemType["Unknown"] = -1] = "Unknown";
export default ItemType;

export const getWearableItemTypes = () => ["Gloves", "Helmet", "Amulet", "Weapon", "Armor", "Shield", "Ring", "Boots", "Rune"];