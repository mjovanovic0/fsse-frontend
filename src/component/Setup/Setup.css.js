import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  setup: {
    marginTop: 15,
    textAlign: 'center',
  },
  header: {
    display: 'flex',
  },
  title: {
    flex: 1,
  },
}));