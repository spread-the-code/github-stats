import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Form from '../Components/Form';
import RepoTable from '../Components/RepoTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: 40,
      paddingBottom: 40,
      backgroundColor: '#efefef'
    },
    title: {
      display: 'block',
      width: '100%',
      textAlign: 'center',
      marginBottom: 0
    },
    form: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

function Home() {
  const classes = useStyles();
  const [repositories, setRepositories] = React.useState({
    incomplete_results: false,
    items: [],
    total_count: 0
  });

  const handleSearch = (query:string) => {
    fetch(`https://api.github.com/search/repositories?q=${query}`)
      .then(res => res.json())
      .then((result) => {
          setRepositories(result);
        },
        (error) => {
          console.error(error)
        }
      )
  };

  const handleClear = () => {
    setRepositories({
      incomplete_results: false,
      items: [],
      total_count: 0
    });
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid container justify="center" alignItems="center">
          <h1 className={classes.title}>GitHub Stat</h1>
          <p>
            GitHub Stat is tool that let you visualize your repositories statatistics.
          </p>
        </Grid>
        <Grid container>
          <Form
            onSubmit={handleSearch}
            onClear={handleClear}
          />
        </Grid>
        <Grid container style={{ paddingTop: 20 }}>
          {
            repositories.items.length
            ? (<RepoTable data={repositories} />)
            : 'No item found!'
          }
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
