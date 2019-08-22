import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    padding: theme.spacing(2),
  },
  spaceTop: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  list: {
    border: "1px solid #000",
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
  typesListFilter: {
    minHeight: 342,
  },
  statsListFilter: {
    minHeight: 198,
  },
  ascending: {
    transform: 'rotate(180deg)',
  },
  descending: {
    transform: 'rotate(0deg)',
  }
}));