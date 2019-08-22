import React from 'react';
import Typography from '@material-ui/core/Typography';

import withClasses from "./Statistics.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";

export default function Statistics({header, item, setItems, onItemClick, partOfSet, onSetClick, showAhLink}) {
  const classes = withClasses();
  const name = item ? (item.n ? item.n : "") : "";
  const level = item ? (item.l ? item.l : 0) : 0;
  const itemStats = item ? (item.is ? item.is : {}) : {};
  const setStats = item ? (item.ss ? item.ss : {}) : {};
  const setName = item ? (item.sn ? item.sn : "") : "";

  const setBonus = {
    attack: setStats.at || 0,
    defense: setStats.de || 0,
    armor: setStats.ar || 0,
    damage: setStats.da || 0,
    hp: setStats.h || 0,
    stamina: setStats.s || 0,
    staminaGain: setStats.sg || 0,
    xpGain: setStats.x || 0,
    goldGain: setStats.g || 0,
  };

  const stats = {
    attack: (itemStats.at || 0) + setBonus.attack,
    defense: (itemStats.de || 0) + setBonus.defense,
    armor: (itemStats.ar || 0) + setBonus.armor,
    damage: (itemStats.da || 0) + setBonus.damage,
    hp: (itemStats.h || 0) + setBonus.hp,
    level: level,
    stamina: (itemStats.s || 0) + setBonus.stamina,
    staminaGain: (itemStats.sg || 0) + setBonus.staminaGain,
    xpGain: (itemStats.x || 0) + setBonus.xpGain,
    goldGain: (itemStats.g || 0) + setBonus.goldGain,
  };

  return (
    <div>
      <Typography className={classes.header}>{header}</Typography>
      <div className={classes.spaceTop}>
        <table>
          <tbody>
          <tr>
            <td width="10%"><Typography className={classes.mini} align="right">Attack:</Typography></td>
            <td width="25%" align="right">
              <span className={classes.miniStrong}>{stats.attack}</span>
              {setItems && (<span className={classes.miniStrongSecond}>({setBonus.attack})</span>)}
            </td>
            <td width="10%"><Typography className={classes.mini} align="right">Defense:</Typography></td>
            <td width="25%" align="right">
              <span className={classes.miniStrong}>{stats.defense}</span>
              {setItems && (<span className={classes.miniStrongSecond}>({setBonus.defense})</span>)}
            </td>
          </tr>
          <tr>
            <td><Typography className={classes.mini} align="right">Armor:</Typography></td>
            <td align="right">
              <span className={classes.miniStrong}>{stats.armor}</span>
                {setItems && (<span className={classes.miniStrongSecond}>({setBonus.armor})</span>)}
            </td>
            <td><Typography className={classes.mini} align="right">Damage:</Typography></td>
            <td align="right">
              <span className={classes.miniStrong}>{stats.damage}</span>
                {setItems && (<span className={classes.miniStrongSecond}>({setBonus.damage})</span>)}
            </td>
          </tr>
          <tr>
            <td><Typography className={classes.mini} align="right">HP:</Typography></td>
            <td align="right">
              <span className={classes.miniStrong}>{stats.hp}</span>
                {setItems && (<span className={classes.miniStrongSecond}>({setBonus.hp})</span>)}
            </td>
            <td><Typography className={classes.mini} align="right">Min. Level:</Typography></td>
            <td><Typography className={classes.miniStrong} align="right">{level}</Typography></td>
          </tr>
          <tr>
            <td><Typography className={classes.mini} align="right">Stamina:</Typography></td>
            <td align="right">
              <span className={classes.miniStrong}>{stats.stamina}</span>
                {setItems && (<span className={classes.miniStrongSecond}>({setBonus.stamina})</span>)}
            </td>
            <td><Typography className={classes.mini} align="right">Stamina Gain:</Typography></td>
            <td align="right">
              <span className={classes.miniStrong}>{stats.staminaGain}</span>
                {setItems && (<span className={classes.miniStrongSecond}>({setBonus.staminaGain})</span>)}
            </td>
          </tr>
          <tr>
            <td><Typography className={classes.mini} align="right">XP Gain:</Typography></td>
            <td align="right">
              <span className={classes.miniStrong}>{stats.xpGain}</span>
                {setItems && (<span className={classes.miniStrongSecond}>({setBonus.xpGain})</span>)}
            </td>
            <td><Typography className={classes.mini} align="right">Gold Gain:</Typography></td>
            <td align="right">
              <span className={classes.miniStrong}>{stats.goldGain}</span>
                {setItems && (<span className={classes.miniStrongSecond}>({setBonus.goldGain})</span>)}
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      {partOfSet && (
        <div className={classes.spaceTop}>
          <Typography className={classes.header}>Part of Set</Typography>
          <div className={classes.spaceTop}>
            <List dense className={clsx(classes.list, classes.partOfSetList)}>
              {setName && (
                <ListItem button onClick={() => onSetClick ? onSetClick(setName) : () => {}}>
                  <ListItemText primary={setName}/>
                </ListItem>
              )}
            </List>
          </div>
        </div>
      )}

      {showAhLink && name && (
        <div className={classes.auctionLink}>
          <a href={"https://fallensword.com/index.php?cmd=auctionhouse&search=" + name} target="_blank" rel="noopener noreferrer">Find '{name}' on Auction House</a>
        </div>
      )}

      {setItems && (
        <div className={classes.spaceTop}>
          <Typography className={classes.header}>Set Items</Typography>
          <div className={classes.spaceTop}>
            <List dense className={clsx(classes.list, classes.itemsListFilter)}>
              {item && item.p && item.p.map(part => {
                const itemStats = [];
                part.is && part.is.at && itemStats.push(`At: ${part.is.at}`);
                part.is && part.is.de && itemStats.push(`De: ${part.is.de}`);
                part.is && part.is.ar && itemStats.push(`Ar: ${part.is.ar}`);
                part.is && part.is.da && itemStats.push(`Da: ${part.is.da}`);
                part.is && part.is.h && itemStats.push(`Hp: ${part.is.h}`);
                part.is && part.is.s && itemStats.push(`S: ${part.is.s}`);
                part.is && part.is.sg && itemStats.push(`SG: ${part.is.sg}`);
                part.is && part.is.g && itemStats.push(`G: ${part.is.g}`);
                part.is && part.is.x && itemStats.push(`X: ${part.is.x}`);
                return (
                  <div key={part.i}>
                    <ListItem button onClick={() => onItemClick ? onItemClick(part) : () => {}}>
                      <ListItemText primary={part.n} secondary={itemStats.join(' ')}/>
                    </ListItem>
                  </div>
              )})}
            </List>
          </div>
        </div>
      )}
    </div>
  );
};