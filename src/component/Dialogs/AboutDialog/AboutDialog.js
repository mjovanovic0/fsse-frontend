import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';

import withClasses from "./AboutDialog.css";

export default function AboutDialog({open, handleClose}) {
  const classes = withClasses();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog fullScreen={fullScreen} maxWidth="md" open={open} onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            About
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        <h1>About</h1>
        <Typography paragraph>
          Fallen Sword Set Editor is free online tool for building in-game gear setups.
        </Typography>
        <Typography paragraph>
          Always wanted to check all possible layouts but didn't have in-game money to buy all variants? Not anymore.
        </Typography>
        <Typography paragraph>
          With <span role="img" aria-label="heart">❤️</span> by <a href="https://fallensword.com/index.php?cmd=profile&player_id=2956423">bizzpu17</a>.
        </Typography>
        <Typography paragraph>
          Donations are welcomed but only with in-game currency. Did not create this to profit in real life :)
        </Typography>
      </div>
    </Dialog>
  );
}