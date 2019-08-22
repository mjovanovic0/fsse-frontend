const ItemRarity = [];
ItemRarity[ItemRarity["Common"] = 0] = "Common";
ItemRarity[ItemRarity["Rare"] = 1] = "Rare";
ItemRarity[ItemRarity["Unique"] = 2] = "Unique";
ItemRarity[ItemRarity["Legendary"] = 3] = "Legendary";
ItemRarity[ItemRarity["Super Elite"] = 4] = "Super Elite";
ItemRarity[ItemRarity["Crystalline"] = 5] = "Crystalline";
ItemRarity[ItemRarity["Epic"] = 6] = "Epic";
ItemRarity[ItemRarity["Unknown"] = 0] = "Unknown";
export default ItemRarity;

export const getAllItemRarity = () => ["Common", "Rare", "Unique", "Legendary", "Super Elite", "Crystalline", "Epic"];