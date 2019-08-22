import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import withClasses from "./NewFavouriteDialog.css";

export default function NewFavouriteDialog({favouriteName, open, handleNameChange, handleClose}) {
  const classes = withClasses();

  const handleChange = event => {
    handleNameChange(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            New Favourite
          </Typography>
          <Button color="inherit" onClick={handleClose}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <TextField
          id="standard-name"
          label="Favourite Name"
          className={classes.textField}
          value={favouriteName}
          onChange={handleChange}
          margin="normal"
        />
      </div>
    </Dialog>
  );
};