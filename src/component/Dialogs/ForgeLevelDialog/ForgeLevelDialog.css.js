import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    marginBottom: theme.spacing(2),
  },
}));