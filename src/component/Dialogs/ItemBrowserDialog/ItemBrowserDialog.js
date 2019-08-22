import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from '@material-ui/core/Checkbox';
import {useTheme} from "@material-ui/core";

import withClasses from "./ItemBrowserDialog.css";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ItemType, {getWearableItemTypes} from "../../../model/ItemType"
import StatType, {getAllItemStatType} from "../../../model/StatType";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";
import Statistics from "../../Statistics/Statistics";
import ItemSlot from "../../ItemSlot/ItemSlot";
import ItemRarity, {getAllItemRarity} from "../../../model/ItemRarity";
import {useItemBrowser, useSetBrowser, useSetup} from "../../../context/FsseContext";
import {useDialog} from "../../../context/DialogContext";
import {itemConflictResolver} from "../../../utils/SetupUtil";

export default function ItemBrowserDialog() {
  const {state, setState, toggleItemBrowser, search, resetSearchCriteria} = useItemBrowser();
  const {toggleSetBrowser} = useSetBrowser();
  const {openDialog, closeDialog} = useDialog();
  const {addItem} = useSetup();

  const classes = withClasses();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

  const handleInSetChange = (event) => {
    const filter = {
      ...state.filter,
      inSet: event.target.checked
    };
    const result = search(filter);

    setState({
      ...state,
      filter,
      result
    });
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
    });
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
      addItem(state.selected, itemConflictResolver(openDialog, closeDialog));
      toggleItemBrowser(false);
    }
  };

  const ResultRow = ({index, style}) => {
    const item = state.result[index];
    return (
      <ListItem button style={style} key={index} onClick={() => setState({...state, selected: item})} selected={state.selected && state.selected.i === item.i}>
        <ListItemText primary={item.n} secondary={`Level ${item.l} - ${ItemType[item.t]}`}/>
      </ListItem>
    );
  };

  return (
    <Dialog maxWidth="md" scroll="body" fullScreen={fullScreen} open={state.open} onClose={() => toggleItemBrowser(false)}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => toggleItemBrowser(false)} aria-label="close">
            <CloseIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Item Browser
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
              <Grid item xs={12} sm={6} md={6}>
                <TextField id="name" label="Search" fullWidth value={state.filter.name} onChange={handleNameChange}/>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField id="minLevel" type="number" label="Min Level" fullWidth value={state.filter.minLevel} onChange={handleLevelChange("minLevel")}/>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField id="maxLevel" type="number" label="Max Level" fullWidth value={state.filter.maxLevel} onChange={handleLevelChange("maxLevel")}/>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControlLabel value={1} control={<Checkbox checked={state.filter.inSet} color="primary" onChange={handleInSetChange}/>} label="In set" labelPlacement="start"/>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3} justify="flex-end">
              <Grid item xs={12} sm={6} md={3}>
                <TextField id="most" label="Most" select fullWidth value={state.filter.most} onChange={handleInputChange("most")}>
                  <MenuItem value={-1}>None</MenuItem>
                  {getAllItemStatType().map(stat => (
                    <MenuItem key={stat} value={StatType[stat]}>
                      {stat}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField id="part" label="Part" select fullWidth value={state.filter.part} onChange={handleInputChange("part")}>
                  <MenuItem value={-1}>All</MenuItem>
                  {getWearableItemTypes().map(stat => (
                    <MenuItem key={stat} value={ItemType[stat]}>
                      {stat}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField id="rarity" label="Rarity" select fullWidth value={state.filter.rarity} onChange={handleInputChange("rarity")}>
                  <MenuItem value={-1}>All</MenuItem>
                  {getAllItemRarity().map(rarity => (
                    <MenuItem key={rarity} value={ItemRarity[rarity]}>
                      {rarity}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12} sm={12} md={5}>
                <AutoSizer>
                  {({height, width}) => (
                    <FixedSizeList className={classes.list} height={height} width={width} itemSize={72} itemCount={state.result.length}>
                      {ResultRow}
                    </FixedSizeList>
                  )}
                </AutoSizer>
              </Grid>
              <Grid item xs={12} sm={6} md={5} className={classes.statistics}>
                <Statistics header="Items Stats" item={state.selected} showAhLink partOfSet onSetClick={(setName) => toggleSetBrowser(true, setName)}/>
              </Grid>
              <Grid container item xs={12} sm={6} md={2} justify="center">
                <ItemSlot force="Weapon" displayType="Weapon" item={state.selected}/>
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