import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  spaceTop: {
    marginTop: theme.spacing(1),
  },
  separator: {
    marginTop: theme.spacing(3),
  },
  list: {
    border: "1px solid #000",
    borderColor: "rgba(0, 0, 0, 0.12)",
    minHeight: 162,
  },
  miniStrong: {
    fontWeight: 'bold',
  },
}));