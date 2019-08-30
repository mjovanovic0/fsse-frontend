import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';

import ItemSlot from "../ItemSlot/ItemSlot"
import * as SetupUtil from "../../utils/SetupUtil";
import withClasses from "./Setup.css";
import ItemType from "../../model/ItemType";
import {useDialog} from "../../context/DialogContext";
import ResetSetupDialog from "../Dialogs/ResetSetupDialog/ResetSetupDialog";

export default function Setup({setup, title = 'Current Setup', resetSetup}) {
  const classes = withClasses();
  const {openDialog, closeDialog} = useDialog();

  const onSetupReset = () => {
    openDialog({
      title: "Reset setup",
      component: <ResetSetupDialog/>,
      buttons: [
        {text: "Cancel", color: "primary", onClick: () => closeDialog()},
        {
          text: "Reset", color: "secondary", onClick: () => {
            closeDialog();
            resetSetup(setup);
          }
        },
      ]
    });
  };

  return (
    <div>
      <div className={classes.header}>
        <Typography variant='h5' gutterBottom className={classes.title}>
          {title}
        </Typography>
        {resetSetup && (<Button onClick={onSetupReset}><RefreshIcon/></Button>)}
      </div>
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