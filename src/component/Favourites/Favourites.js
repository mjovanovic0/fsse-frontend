import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import DeleteIcon from '@material-ui/icons/Delete';

import NewFavouriteDialog from "../Dialogs/NewFavouriteDialog/NewFavouriteDialog";

import withClasses from "./Favourites.css";
import FavouritePreviewDialog from "../Dialogs/FavouritePreviewDialog/FavouritePreviewDialog";
import {useFavourites, useSetup} from "../../context/FsseContext";
import {useDialog} from "../../context/DialogContext";

export default function Favourites({setup}) {
  const {state: favourites, createFavourite, deleteFavourite} = useFavourites();
  const {createSetupFromParts, loadSetup} = useSetup();
  const {openDialog, closeDialog} = useDialog();
  const classes = withClasses();

  const [openNewFavouriteDialog, setOpenNewFavouriteDialog] = React.useState(false);
  const [newFavouriteName, setNewFavouriteName] = React.useState("");

  const handleOpenNewFavouriteDialog = () => {
    setNewFavouriteName("");
    setOpenNewFavouriteDialog(true);
  };

  const handleCloseNewFavouriteDialog = () => {
    setOpenNewFavouriteDialog(false);
    if (newFavouriteName && newFavouriteName !== "") {
      createFavourite(newFavouriteName, setup);
    }
  };

  const peekFavourite = async (id) => {
    const favourite = favourites[favourites.findIndex(f => f.id === id)];
    const setup = await createSetupFromParts(favourite.parts);

    openDialog({
      title: "Peeking at favourite",
      component: <FavouritePreviewDialog favourite={favourite} setup={setup} title={`Viewing favourite with name: "${favourite.name}" `}/>,
      buttons: [
        {text: "Cancel", color: "primary", onClick: () => closeDialog()},
        {
          text: "Load", color: "secondary", onClick: () => {
            loadSetup(setup);
            closeDialog();
          }
        },
      ]
    });
  };

  const alertDeleteFavourite = async (id) => {
    const favourite = favourites[favourites.findIndex(f => f.id === id)];
    const setup = await createSetupFromParts(favourite.parts);

    openDialog({
      title: "Delete favourite?",
      component: <FavouritePreviewDialog favourite={favourite} setup={setup} title={`Are you sure that you want to delete favourite with name: "${favourite.name}" ?`}/>,
      buttons: [
        {text: "No", color: "primary", onClick: () => closeDialog()},
        {
          text: "Yes", color: "secondary", onClick: () => {
            closeDialog();
            deleteFavourite(id);
          }
        },
      ]
    });
  };

  return (
    <div>
      <div className={classes.sets}>
        <Typography variant="h5" gutterBottom>Favourites</Typography>
        <List dense className={classes.list}>
          {favourites.length > 0 ? favourites.map((favourite, index) => {
            return <div key={favourite.id}>
              <ListItem>
                <ListItemText primary={favourite.name}/>
                <RemoveRedEyeIcon color="primary" onClick={() => peekFavourite(favourite.id)}/>
                <DeleteIcon color="secondary" onClick={() => alertDeleteFavourite(favourite.id)}/>
              </ListItem>
              {index < (favourites.length - 1) && (
                <Divider/>
              )}
            </div>
          }) : (
            <Typography align="center" color="textSecondary"> - No saved favourite yet! -</Typography>
          )}
        </List>
        <Button variant="contained" color="primary" fullWidth onClick={handleOpenNewFavouriteDialog}>
          Add Current Setup to Favourites
        </Button>
      </div>
      <NewFavouriteDialog favouriteName={newFavouriteName}
                          open={openNewFavouriteDialog}
                          handleNameChange={(name) => setNewFavouriteName(name)}
                          handleClose={handleCloseNewFavouriteDialog}/>
    </div>
  );
};