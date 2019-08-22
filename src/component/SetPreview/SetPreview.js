import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import ItemSlot from "../ItemSlot/ItemSlot"
import * as SetupUtil from "../../utils/SetupUtil";
import withClasses from "./SetPreview.css";
import ItemType from "../../model/ItemType";

export default function SetPreview({set}) {
  const classes = withClasses();

  return (
    <div>
      <Typography className={classes.header}>Parts</Typography>
      <Divider/>
      <div className={classes.setup}>
        <div>
          <ItemSlot displayType="Gloves" item={set && SetupUtil.getItemFromSet(set, ItemType["Gloves"])}/>
          <ItemSlot displayType="Helmet" item={set && SetupUtil.getItemFromSet(set, ItemType["Helmet"])}/>
          <ItemSlot displayType="Amulet" item={set && SetupUtil.getItemFromSet(set, ItemType["Amulet"])}/>
        </div>
        <div>
          <ItemSlot displayType="Weapon" item={set && SetupUtil.getItemFromSet(set, ItemType["Weapon"])}/>
          <ItemSlot displayType="Armor" item={set && SetupUtil.getItemFromSet(set, ItemType["Armor"])}/>
          <ItemSlot displayType="Shield" item={set && SetupUtil.getItemFromSet(set, ItemType["Shield"])}/>
        </div>
        <div>
          <ItemSlot displayType="Ring" item={set && SetupUtil.getItemFromSet(set, ItemType["Ring"])}/>
          <ItemSlot displayType="Boots" item={set && SetupUtil.getItemFromSet(set, ItemType["Boots"])}/>
          <ItemSlot displayType="Rune" item={set && SetupUtil.getItemFromSet(set, ItemType["Rune"])}/>
        </div>
      </div>
    </div>
  );
};