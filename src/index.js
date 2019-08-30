import React from 'react';
import {render} from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Fsse from "./Fsse";
import DialogProvider from "./context/DialogContext";
import FsseProvider from "./context/FsseContext";

const app = (
  <DialogProvider>
    <FsseProvider>
      <Fsse/>
    </FsseProvider>
  </DialogProvider>
);

render(app, document.getElementById('root'));
serviceWorker.unregister();