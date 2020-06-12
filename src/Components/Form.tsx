import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import GitHubIcon from '@material-ui/icons/GitHub';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
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

interface IProps {
  onSubmit: any,
  onClear: any
}

const Form: React.FC<IProps> = ({ onSubmit, onClear }) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const handleSubmit:any = (event:React.MouseEvent<HTMLElement>) => {
    onSubmit(query);
    setSearched(true);
    event.preventDefault();
  }
  const handleClear:any = (event:React.MouseEvent<HTMLElement>) => {
    setQuery('');
    setSearched(false);
    onClear();
  }

  return (
    <Paper
      component="form"
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <IconButton className={classes.iconButton} aria-label="GitHub">
        <GitHubIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        autoFocus
        placeholder="Search in GitHub repositories"
        inputProps={{ 'aria-label': 'Search in GitHub repositories and press Enter' }}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      {
        searched 
        && (
          <>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              type="button"
              className={classes.iconButton}
              aria-label="close"
              onClick={handleClear}
            >
              <CloseIcon />
            </IconButton>
          </>
        )
      }
    </Paper>
  );
}

export default Form;