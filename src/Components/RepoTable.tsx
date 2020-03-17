import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tdName: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    flexDirection: 'row',
  }
});


interface IProps {
  data: any
}

const RepoTable: React.FC<IProps> = ({ data }) => {
  const classes = useStyles();
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Author</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items.map((row:any) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <strong>{row.name}</strong><br />
                {row.description}
              </TableCell>
              <TableCell align="left" className={classes.tdName}>
                <Avatar alt={row.owner.login} src={row.owner.avatar_url} />
                {' '}
                {row.owner.login}
              </TableCell>
              <TableCell align="left">
                <Link to={`/stat/${row.full_name}`} >
                  <Button  variant="contained" color="primary" >
                    View Stat
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RepoTable;