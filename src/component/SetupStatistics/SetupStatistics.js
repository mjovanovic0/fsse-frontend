import React from 'react';
import Typography from '@material-ui/core/Typography';

import withClasses from "./SetupStatistics.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

export default function SetupStatistics({setup, toggleSetBrowser}) {
  const classes = withClasses();
  const stats = {
    attack: setup.itemStats.attack + setup.setStats.attack + setup.forgeBonus.attack,
    defense: setup.itemStats.defense + setup.setStats.defense + setup.forgeBonus.defense,
    armor: setup.itemStats.armor + setup.setStats.armor + setup.forgeBonus.armor,
    damage: setup.itemStats.damage + setup.setStats.damage + setup.forgeBonus.damage,
    hp: setup.itemStats.hp + setup.setStats.hp + setup.forgeBonus.hp,
    level: setup.itemStats.level,
    stamina: setup.itemStats.stamina + setup.setStats.stamina,
    staminaGain: setup.itemStats.staminaGain + setup.setStats.staminaGain,
    xpGain: setup.itemStats.xpGain + setup.setStats.xpGain,
    goldGain: setup.itemStats.goldGain + setup.setStats.goldGain,
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Setup Statistics</Typography>
      <Divider/>
      <div className={classes.spaceTop}>
        <table>
          <tbody>
          <tr>
            <td width="10%"><Typography className={classes.mini} align="right">Attack:</Typography></td>
            <td width="25%"><Typography className={classes.miniStrong} align="right">{stats.attack}</Typography></td>
            <td width="25%"><Typography className={classes.mini} align="right">Defense:</Typography></td>
            <td width="25%"><Typography className={classes.miniStrong} align="right">{stats.defense}</Typography></td>
          </tr>
          <tr>
            <td><Typography className={classes.mini} align="right">Armor:</Typography></td>
            <td><Typography className={classes.miniStrong} align="right">{stats.armor}</Typography></td>
            <td><Typography className={classes.mini} align="right">Damage:</Typography></td>
            <td><Typography className={classes.miniStrong} align="right">{stats.damage}</Typography></td>
          </tr>
          <tr>
            <td><Typography className={classes.mini} align="right">HP:</Typography></td>
            <td><Typography className={classes.miniStrong} align="right">{stats.hp}</Typography></td>
            <td><Typography className={classes.mini} align="right">Min. Level:</Typography></td>
            <td><Typography className={classes.miniStrong} align="right">{setup.level}</Typography></td>
          </tr>
          <tr>
            <td><Typography className={classes.mini} align="right">Stamina:</Typography></td>
            <td><Typography className={classes.miniStrong} align="right">{stats.stamina}</Typography></td>
            <td><Typography className={classes.mini} align="right">Stamina Gain:</Typography></td>
            <td><Typography className={classes.miniStrong} align="right">{stats.staminaGain}</Typography></td>
          </tr>
          <tr>
            <td><Typography className={classes.mini} align="right">XP Gain:</Typography></td>
            <td><Typography className={classes.miniStrong} align="right">{stats.xpGain}</Typography></td>
            <td><Typography className={classes.mini} align="right">Gold Gain:</Typography></td>
            <td><Typography className={classes.miniStrong} align="right">{stats.goldGain}</Typography></td>
          </tr>
          </tbody>
        </table>
      </div>

      <div className={classes.separator}>
        <Typography variant="h5" gutterBottom>Completed sets in setup</Typography>
        <div className={classes.spaceTop}>
          <List dense className={classes.list}>
            {setup.completedSets.map(set => (
              <div key={set.i}>
                <ListItem button onClick={() => toggleSetBrowser && toggleSetBrowser(true, set.n)}>
                  <ListItemText primary={set.n}/>
                </ListItem>
              </div>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};