import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  list: {
    border: "1px solid #000",
    borderColor: "rgba(0, 0, 0, 0.12)",
    marginBottom: theme.spacing(2),
  },
}));