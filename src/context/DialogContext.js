import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const DialogContext = React.createContext({});
export const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context
};

export const DialogInitialState = {
  open: false,
  title: "",
  maxWidth: "md",
  component: null,
  buttons: []
};

const DialogProvider = ({children}) => {
  const [state, setState] = React.useState(DialogInitialState);
  const openDialog = (options) => setState({
    open: true,
    title: options.title || "",
    component: options.component || null,
    buttons: options.buttons || [],
  });
  const closeDialog = () => setState({...DialogInitialState});

  return (
    <DialogContext.Provider value={{state, openDialog, closeDialog}}>
      {children}
      <Dialog
        open={state.open}
        onClose={closeDialog}
        maxWidth="md"
        scroll="body"
      >
        <DialogTitle id="alert-dialog-title">{state.title}</DialogTitle>
        {state.component}
        <DialogActions>
          {state.buttons && state.buttons.map((button, index) => (
            <Button key={index} onClick={button.onClick} color={button.color} autoFocus>{button.text}</Button>
          ))}
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};

export default DialogProvider;