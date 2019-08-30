import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: "inline-block",
    margin: 0.5,
    textAlign: "center",
    verticalAlign: "top",
    position: 'relative'
  },
  slot: {
    background: 'url(\'https://cdn2.fallensword.com/ui/inventory/1x1.png\')',
    position: 'absolute',
    margin: 'auto',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  image: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  "slot-s": {
    width: 30,
    height: 30
  },
  "slot-s-wrapper": {
    width: 60,
    height: 60
  },
  "slot-m": {
    width: 60,
    height: 60
  },
  "slot-m-wrapper": {
    width: 60,
    height: 60
  },
  "slot-l": {
    width: 60,
    height: 90
  },
  "slot-l-wrapper": {
    width: 60,
    height: 90
  },
  slotEmpty: {
    background: "rgba(0,0,0,0.3)"
  },
}));