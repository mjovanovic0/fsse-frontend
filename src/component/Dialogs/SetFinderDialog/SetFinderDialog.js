import React from 'react';
import AutoSizer from "react-virtualized-auto-sizer";
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FixedSizeList} from 'react-window';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Sort from '@material-ui/icons/Sort';

import withClasses from "./SetFinderDialog.css";

import DialogContent from "@material-ui/core/DialogContent";
import {useSetBrowser, useSetFinder} from "../../../context/FsseContext";

export default function SetFinderDialog() {
  const {state, setState, toggleSetFinder, search, resetSearchCriteria} = useSetFinder();
  const classes = withClasses();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {toggleSetBrowser} = useSetBrowser();

  const handleLevelChange = (type) => (event) => {
    const value = parseInt(event.target.value);
    if (!(value > -1 && value < 999999)) {
      return;
    }

    const filter = {
      ...state.filter,
      [type]: parseInt(event.target.value)
    };
    const result = search(filter);

    setState({
      ...state,
      filter,
      result
    });
  };

  const handleSortOrderChange = () => {
    const filter = {
      ...state.filter,
      descending: !state.filter.descending
    };
    const result = search(filter);

    setState({
      ...state,
      filter,
      result
    });
  };

  const handleAttributeSearch = (isAdd, attributeType, attribute) => {
    const {newSource, newDestination} = isAdd ?
      moveItemToOtherList(state[attributeType], state.filter[attributeType], attribute) :
      moveItemToOtherList(state.filter[attributeType], state[attributeType], attribute);

    const filter = {
      ...state.filter,
      [attributeType]: isAdd ? newDestination : newSource
    };
    const result = search(filter);

    setState({
      ...state,
      [attributeType]: isAdd ? newSource : newDestination,
      filter,
      result
    });
  };

  const moveItemToOtherList = (sourceList, destinationList, item) => {
    const index = sourceList.findIndex(i => i === item);
    return {
      newSource: [
        ...sourceList.slice(0, index),
        ...sourceList.slice(index + 1)
      ].sort(),
      newDestination: [
        ...destinationList,
        item
      ].sort()
    }
  };

  const ResultRow = ({index, style}) => {
    const set = state.result[index];
    return (
      <ListItem button style={style} key={index} onClick={() => toggleSetBrowser(true, set.n)}>
        <ListItemText primary={set.n} secondary={`Level ${set.l} - ${set.p.length} parts - ${set.st.length} stats`}/>
      </ListItem>
    );
  };

  return (
    <Dialog maxWidth="md" scroll="body" fullScreen={fullScreen} open={state.open} onClose={() => toggleSetFinder(false)}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => toggleSetFinder(false)} aria-label="close">
            <CloseIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Set Finder
          </Typography>
          <Button color="inherit" onClick={resetSearchCriteria}>
            Reset
          </Button>
        </Toolbar>
      </AppBar>


      <DialogContent>
        <div className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <AutoSizer>
                {({height, width}) => (
                  <FixedSizeList className={classes.list} height={height} width={width} itemSize={72} itemCount={state.result.length}>
                    {ResultRow}
                  </FixedSizeList>
                )}
              </AutoSizer>
            </Grid>

            <Grid container item xs={12} sm={6} md={7}>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField id="minLevel" type="number" label="Min Level" fullWidth value={state.filter.min} onChange={handleLevelChange("min")}/>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField id="maxLevel" type="number" label="Max Level" fullWidth value={state.filter.max} onChange={handleLevelChange("max")}/>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Button onClick={handleSortOrderChange}>
                    <Sort className={clsx(state.filter.descending ? classes.descending : classes.ascending)}/>
                  </Button>
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.spaceTop}>Available Types:</Typography>
                  <List className={clsx(classes.list, classes.typesListFilter)} dense>
                    {state.types.map((type, idx) => (
                      <ListItem button key={idx} onClick={() => handleAttributeSearch(true, "types", type)}>
                        <ListItemText primary={type}/>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.spaceTop}>Sets with types:</Typography>
                  <List className={clsx(classes.list, classes.typesListFilter)} dense>
                    {state.filter.types.map((type, idx) => (
                      <ListItem button key={idx} onClick={() => handleAttributeSearch(false, "types", type)}>
                        <ListItemText primary={type}/>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.spaceTop}>Available Stats:</Typography>
                  <List className={clsx(classes.list, classes.statsListFilter)} dense>
                    {state.stats.map((stat, idx) => (
                      <ListItem button key={idx} onClick={() => handleAttributeSearch(true, "stats", stat)}>
                        <ListItemText primary={stat}/>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.spaceTop}>Sets with stats:</Typography>
                  <List className={clsx(classes.list, classes.statsListFilter)} dense>
                    {state.filter.stats.map((stat, idx) => (
                      <ListItem button key={idx} onClick={() => handleAttributeSearch(false, "stats", stat)}>
                        <ListItemText primary={stat}/>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </div>
      </DialogContent>


    </Dialog>
  );
}