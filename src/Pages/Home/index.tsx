import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container, Grid, CircularProgress } from '@material-ui/core';
import Form from '../../Components/Form';
import { RepoTable } from '../../Components/Table';
import Header from '../../Components/Header';

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [repositories, setRepositories] = React.useState({
    incomplete_results: false,
    items: [],
    total_count: 0
  });

  const handleSearch = (query:string) => {
    setIsLoading(true);
    fetch(`https://api.github.com/search/repositories?q=${query}`)
      .then(res => res.json())
      .then((result) => {
          setRepositories(result);
          setIsLoading(false);
        },
        (error) => {
          console.error(error)
          setIsLoading(false);
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
        <Header />
        <Grid container>
          <Form
            onSubmit={handleSearch}
            onClear={handleClear}
          />
        </Grid>
        <Grid container style={{ paddingTop: 20 }}>
          {(repositories.items.length && !isLoading) ? (<RepoTable data={repositories} />) : ''}
          {isLoading && (<CircularProgress />)}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
