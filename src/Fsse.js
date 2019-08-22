import {useSetBrowser, useSetup} from "./context/FsseContext";
import Mainframe from "./component/Mainframe/Mainframe";
import Grid from "@material-ui/core/Grid";
import Setup from "./component/Setup/Setup";
import SetupStatistics from "./component/SetupStatistics/SetupStatistics";
import Favourites from "./component/Favourites/Favourites";
import React from "react";

export default function Fsse() {
  const {state: setup} = useSetup();
  const {toggleSetBrowser} = useSetBrowser();
  return (
    <Mainframe>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Setup setup={setup}/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <SetupStatistics setup={setup} toggleSetBrowser={toggleSetBrowser}/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Favourites setup={setup}/>
        </Grid>
      </Grid>
    </Mainframe>
  );
};