import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import {useTheme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import withClasses from "./SetBrowserDialog.css";

import StatType, {getAllItemStatType} from "../../../model/StatType";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SetPreview from "../../SetPreview/SetPreview";

import Statistics from "../../Statistics/Statistics";
import {useItemBrowser, useSetBrowser, useSetFinder, useSetup} from "../../../context/FsseContext";
import {itemConflictResolver} from "../../../utils/SetupUtil";
import {useDialog} from "../../../context/DialogContext";

export default function SetBrowserDialog() {
  const {state, setState, toggleSetBrowser, search, resetSearchCriteria} = useSetBrowser();
  const classes = withClasses();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
  const {openDialog, closeDialog} = useDialog();
  const {toggleItemBrowser} = useItemBrowser();
  const {toggleSetFinder} = useSetFinder();
  const {addSet} = useSetup();

  const handlePartsChange = (type) => (event) => {
    const value = parseInt(event.target.value);
    if (value > 1 && value < 10) {
      handleInputChange(type)(event);
    }
  };

  const handleLevelChange = (type) => (event) => {
    const value = parseInt(event.target.value);
    if (value > -1 && value < 999999) {
      handleInputChange(type)(event);
    }
  };

  const handleNameChange = (event) => {
    const filter = {
      ...state.filter,
      name: event.target.value
    };
    const result = search(filter);

    setState({
      ...state,
      filter,
      result
    })
  };

  const handleInputChange = (type) => (event) => {
    const parsedValue = parseInt(event.target.value);
    const filter = {
      ...state.filter,
      [type]: isNaN(parsedValue) ? undefined : parsedValue,
    };
    const result = search(filter);

    setState({
      ...state,
      filter,
      result
    });
  };

  const handleSelect = () => {
    if (state.selected) {
      addSet(state.selected, itemConflictResolver(openDialog, closeDialog));
      toggleSetBrowser(false);
      toggleSetFinder(false);
    }
  };

  const ResultRow = ({index, style}) => {
    const set = state.result[index];
    return (
      <ListItem button style={style} key={index} onClick={() => setState({...state, selected: set})} selected={state.selected && state.selected.i === set.i}>
        <ListItemText primary={set.n} secondary={`Level ${set.l} - ${set.p.length} parts - ${set.st.length} stats`}/>
      </ListItem>
    );
  };

  return (
    <Dialog scroll="body" maxWidth="lg" fullScreen={fullScreen} open={state.open} onClose={() => toggleSetBrowser(false)}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => toggleSetBrowser(false)} aria-label="close">
            <CloseIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Set Browser
          </Typography>
          <Button color="inherit" onClick={resetSearchCriteria}>
            Reset
          </Button>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <div className={classes.container}>
          <Grid container spacing={3}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField id="name" label="Search" fullWidth value={state.filter.name} onChange={handleNameChange}/>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField id="minLevel" type="number" label="Min Level" fullWidth value={state.filter.minLevel} onChange={handleLevelChange("minLevel")}/>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField id="maxLevel" type="number" label="Max Level" fullWidth value={state.filter.maxLevel} onChange={handleLevelChange("maxLevel")}/>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField id="most" label="Most" select fullWidth value={state.filter.most} onChange={handleInputChange("most")}>
                  <MenuItem value={-1}>None</MenuItem>
                  {getAllItemStatType().map(stat => (
                    <MenuItem key={stat} value={StatType[stat]}>
                      {stat}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField id="maxParts" type="number" label="Max Parts" fullWidth value={state.filter.maxParts} onChange={handlePartsChange("maxParts")}
                           InputProps={{inputProps: {min: 2, max: 9}}}/>
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12} sm={12} md={4}>
                <AutoSizer>
                  {({height, width}) => (
                    <FixedSizeList className={classes.list} height={height} width={width} itemSize={72} itemCount={state.result.length}>
                      {ResultRow}
                    </FixedSizeList>
                  )}
                </AutoSizer>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Statistics header="Set Bonuses + Items Stats" setItems item={state.selected} onItemClick={(item) => toggleItemBrowser(true, item.n)}/>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <SetPreview set={state.selected}/>
                <div className={classes.spaceTop}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleSelect}>Select</Button>
                </div>
              </Grid>
            </Grid>


          </Grid>
        </div>
      </DialogContent>
    </Dialog>
  );
}