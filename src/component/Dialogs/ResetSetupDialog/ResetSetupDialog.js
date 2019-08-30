import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import withClasses from "./ResetSetupDialog.css";

export default function ResetSetupDialog() {
  const classes = withClasses();

  return (
    <DialogContent className={classes.root}>
      <DialogContentText id="alert-dialog-description">
        Are you sure that you want to reset current setup?
      </DialogContentText>
    </DialogContent>
  );
};