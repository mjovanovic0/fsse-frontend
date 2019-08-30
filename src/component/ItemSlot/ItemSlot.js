import React from 'react';
import withClasses from "./ItemSlot.css";
import ItemType from "../../model/ItemType";
import {useItemBrowser} from "../../context/FsseContext";

const typeSizeMap = {
  Gloves: "m",
  Helmet: "m",
  Amulet: "s",
  Weapon: "l",
  Armor: "l",
  Shield: "l",
  Ring: "s",
  Boots: "m",
  Rune: "s"
};

export default function ItemSlot({displayType, item, force}) {
  const classes = withClasses();
  const {toggleItemBrowser} = useItemBrowser();
  const type = ItemType[item && item.t] || displayType;
  const holderSize = typeSizeMap[force || type];
  const wrapperClasses = [classes.root, classes["slot-" + holderSize + "-wrapper"]];
  const holderClasses = [classes.slot];
  holderClasses.push(classes["slot-" + holderSize]);

  let itemImageHolder;
  let onClickHandler;
  if (item) {
    const itemUrl = "https://cdn2.fallensword.com/items/" + item.i + ".gif";
    itemImageHolder = <img className={classes.image} src={itemUrl} alt={item.n}/>;
    onClickHandler = () => toggleItemBrowser(true, item.n);
  } else {
    holderClasses.push(classes.slotEmpty);
    onClickHandler = () => {
    };
  }

  return (
    <div className={wrapperClasses.join(' ')} onClick={onClickHandler}>
      <div className={holderClasses.join(' ')}>
        {itemImageHolder}
      </div>
    </div>
  );
};