import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      display: 'block',
      width: '100%',
      textAlign: 'center',
      marginBottom: 0
    },
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center">
      <h1 className={classes.title}>GitHub Stat</h1>
      <p>
        GitHub Stat is tool that let you visualize your repositories statatistics.
      </p>
    </Grid>
  );
}

export default Header;
