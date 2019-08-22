import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from "@material-ui/core/Grid";
import Setup from "../../Setup/Setup";
import SetupStatistics from "../../SetupStatistics/SetupStatistics";
import withClasses from "./FavouritePreviewDialog.css";

export default function FavouritePreviewDialog({favourite, setup, title}) {
  const classes = withClasses();

  return (
    <DialogContent className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DialogContentText id="alert-dialog-description">
            {title}
          </DialogContentText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Setup setup={setup} title={'Setup'}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SetupStatistics setup={setup}/>
        </Grid>
      </Grid>
    </DialogContent>
  );
};