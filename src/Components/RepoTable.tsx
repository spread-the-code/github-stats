import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
// import Icon from '@material-ui/core/Icon';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    author: {
      display: 'flex',
    },
    authorAvatar: {
      backgroundColor: '#dedede',
      color: '#fff'
    },
    authorInfo: {
      paddingLeft: 10,
      display: 'flex',
      flexDirection: 'column'
    }
  }),
);


const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      padding: '8px'
    },
    body: {
      fontSize: 14,
      padding: '4px 8px',
      minHeight: '60px',
    },
  }),
)(TableCell);


interface IProps {
  data: any
}


const RepoTableHead: React.FC = () => (
  <TableHead>
    <TableRow>
      <StyledTableCell>Name</StyledTableCell>
      <StyledTableCell align="left"></StyledTableCell>
    </TableRow>
  </TableHead>
);

const RepoTable: React.FC<IProps> = ({ data }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <RepoTableHead />
        <TableBody>
          {data.items.map((row:any) => (
            <TableRow key={row.id}>
              <StyledTableCell component="td" scope="row">
                <div className={classes.author}>
                  <Avatar className={classes.authorAvatar} alt={row.owner.login} src={row.owner.avatar_url} />
                  <div className={classes.authorInfo}>
                    <strong>{row.owner.login} / {row.name}</strong>
                    <small>{row.description}</small>
                  </div>
                </div>
              </StyledTableCell>
              <StyledTableCell component="td" align="left">
                <Link to={`/stat/${row.full_name}`} >
                  <IconButton color="primary" aria-label="view stats" component="span">
                    <AssessmentIcon />
                  </IconButton>
                </Link>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RepoTable;