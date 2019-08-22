const StatType = [];
StatType[StatType["Attack"] = 0] = "Attack";
StatType[StatType["Defense"] = 1] = "Defense";
StatType[StatType["Armor"] = 2] = "Armor";
StatType[StatType["HP"] = 3] = "HP";
StatType[StatType["Damage"] = 4] = "Damage";
StatType[StatType["Stamina"] = 5] = "Stamina";
StatType[StatType["Stamina Gain"] = 6] = "Stamina Gain";
StatType[StatType["Gold Gain"] = 7] = "Gold Gain";
StatType[StatType["XP Gain"] = 8] = "XP Gain";
StatType[StatType["Unknown"] = -1] = "Unknown";
export default StatType;

export const StatTypeShort = [];
StatTypeShort[StatTypeShort["at"] = 0] = "at";
StatTypeShort[StatTypeShort["de"] = 1] = "de";
StatTypeShort[StatTypeShort["ar"] = 2] = "ar";
StatTypeShort[StatTypeShort["h"] = 3] = "h";
StatTypeShort[StatTypeShort["da"] = 4] = "da";
StatTypeShort[StatTypeShort["s"] = 5] = "s";
StatTypeShort[StatTypeShort["sg"] = 6] = "sg";
StatTypeShort[StatTypeShort["g"] = 7] = "g";
StatTypeShort[StatTypeShort["x"] = 8] = "x";
StatTypeShort[StatTypeShort["u"] = -1] = "u";

export const getWearableItemStatType = () => ["Attack", "Defense", "Armor", "Damage", "HP"];
export const getAllItemStatType = () => ["Attack", "Defense", "Armor", "Damage", "HP", "Stamina", "Stamina Gain", "Gold Gain", "XP Gain"];
