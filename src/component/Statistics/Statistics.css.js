import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  spaceTop: {
    marginTop: theme.spacing(1),
  },
  auctionLink: {
    marginTop: theme.spacing(3),
  },
  secondPaper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    marginTop: 15
  },
  header: {
    background: "#cacaca",
    textAlign: "center",
    fontWeight: "bold",
  },
  partOfSetList: {
    minHeight: 54,
  },
  itemsListFilter: {
    minHeight: 558,
  },
  list: {
    border: "1px solid #000",
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
  mini: {
    fontSize: '0.875rem',
  },
  miniStrong: {
    fontSize: '0.875rem',
    fontWeight: 'bold',
  },
  miniStrongSecond: {
    '&::before': {
      content: '" "',
    },
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.54)',
  }
}));