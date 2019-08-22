import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slider from '@material-ui/core/Slider';
import withClasses from "./ForgeLevelDialog.css";
import {useSetup} from "../../../context/FsseContext";

export default function ForgeLevelDialog({open, handleClose}) {
  const classes = withClasses();
  const {state: setup, setForgeLevel} = useSetup();

  return (
    <Dialog open={open} onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Forge Level
          </Typography>
          <Button color="inherit" onClick={handleClose}>
            Set
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Slider
          onChange={(e, val) => setForgeLevel(val)}
          defaultValue={setup.forge}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          step={1}
          marks
          min={0}
          max={5}
        />
      </div>
    </Dialog>
  );
};