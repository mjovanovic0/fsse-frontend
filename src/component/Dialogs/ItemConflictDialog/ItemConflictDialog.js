import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import Statistics from "../../Statistics/Statistics";
import ItemSlot from "../../ItemSlot/ItemSlot";
import withClasses from './ItemConflictDialog.css';

export default function ItemConflictDialog({oldItem, newItem}) {
  const classes = withClasses();
  return (
    <DialogContent className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <Statistics header="Item in Setup" item={oldItem} partOfSet/>
        </Grid>
        <Grid item xs={2}>
          <ItemSlot force="Weapon" displayType="Weapon" item={oldItem}/>
        </Grid>
        <Grid item xs={10}>
          <Statistics header="New Item" item={newItem} partOfSet/>
        </Grid>
        <Grid item xs={2}>
          <ItemSlot force="Weapon" displayType="Weapon" item={newItem}/>
        </Grid>
      </Grid>
    </DialogContent>
  );
};