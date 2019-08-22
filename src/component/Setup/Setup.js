import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import ItemSlot from "../ItemSlot/ItemSlot"
import * as SetupUtil from "../../utils/SetupUtil";
import withClasses from "./Setup.css";
import ItemType from "../../model/ItemType";

export default function Setup({setup, title='Current Setup'}) {
  const classes = withClasses();

  return (
    <div>
      <Typography variant='h5' gutterBottom>{title}</Typography>
      <Divider/>
      <div className={classes.setup}>
        <div>
          <ItemSlot displayType="Gloves" item={SetupUtil.getItemFromSetup(setup, ItemType["Gloves"])}/>
          <ItemSlot displayType="Helmet" item={SetupUtil.getItemFromSetup(setup, ItemType["Helmet"])}/>
          <ItemSlot displayType="Amulet" item={SetupUtil.getItemFromSetup(setup, ItemType["Amulet"])}/>
        </div>
        <div>
          <ItemSlot displayType="Weapon" item={SetupUtil.getItemFromSetup(setup, ItemType["Weapon"])}/>
          <ItemSlot displayType="Armor" item={SetupUtil.getItemFromSetup(setup, ItemType["Armor"])}/>
          <ItemSlot displayType="Shield" item={SetupUtil.getItemFromSetup(setup, ItemType["Shield"])}/>
        </div>
        <div>
          <ItemSlot displayType="Ring" item={SetupUtil.getItemFromSetup(setup, ItemType["Ring"])}/>
          <ItemSlot displayType="Boots" item={SetupUtil.getItemFromSetup(setup, ItemType["Boots"])}/>
          <ItemSlot displayType="Rune" item={SetupUtil.getItemFromSetup(setup, ItemType["Rune"])}/>
        </div>
      </div>
    </div>
  );
};