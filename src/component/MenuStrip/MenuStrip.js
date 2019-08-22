import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FsseIcon from "../Icons/FsseIcon";
import ItemFinderIcon from "../Icons/ItemFinderIcon";
import SetFinderIcon from "../Icons/SetFinderIcon";
import SetBrowserIcon from "../Icons/SetBrowserIcon";
import ForgeIcon from "../Icons/ForgeIcon";
import withClasses from './MenuStrip.css';

import {useItemBrowser, useSetBrowser, useSetFinder} from "../../context/FsseContext";
import ForgeLevelDialog from "../Dialogs/ForgeLevelDialog/ForgeLevelDialog";
import AboutDialog from "../Dialogs/AboutDialog/AboutDialog";

export default function MenuStrip() {
  const classes = withClasses();
  const {toggleItemBrowser} = useItemBrowser();
  const {toggleSetBrowser} = useSetBrowser();
  const {toggleSetFinder} = useSetFinder();
  const [openForgeLevel, setOpenForgeLevel] = React.useState(false);
  const [openAbout, setOpenAbout] = React.useState(false);

  return (
    <div>
      <Divider/>
      <List>
        <ListItem button onClick={() => toggleSetFinder(true)}>
          <ListItemIcon><SetFinderIcon/></ListItemIcon>
          <ListItemText primary="Set Finder"/>
        </ListItem>
        <ListItem button onClick={() => toggleSetBrowser(true)}>
          <ListItemIcon><SetBrowserIcon/></ListItemIcon>
          <ListItemText primary="Set Browser"/>
        </ListItem>
        <ListItem button onClick={() => toggleItemBrowser(true)}>
          <ListItemIcon><ItemFinderIcon/></ListItemIcon>
          <ListItemText primary="Item Browser"/>
        </ListItem>
        <ListItem button onClick={() => setOpenForgeLevel(true)}>
          <ListItemIcon><ForgeIcon/></ListItemIcon>
          <ListItemText primary="Set Forge Level"/>
        </ListItem>
      </List>
      <div className={classes.bottomIcons}>
        <List>
          <ListItem button onClick={() => setOpenAbout(true)}>
            <ListItemIcon><FsseIcon/></ListItemIcon>
            <ListItemText primary='About'/>
          </ListItem>
        </List>
      </div>
      <ForgeLevelDialog open={openForgeLevel} handleClose={() => setOpenForgeLevel(false)}/>
      <AboutDialog open={openAbout} handleClose={() => setOpenAbout(false)}/>
    </div>
  );
};