import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Card,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Chart from "react-google-charts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingTop: 40,
      paddingBottom: 40,
      backgroundColor: '#efefef'
    },
    card: {
      width: '100%',
      backgroundColor: '#fff'
    },
    title: {
      display: 'block',
      width: '100%',
      textAlign: 'center',
      marginBottom: 0
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface IProps {
  match: any
  history: any
}

const validExt = {'.AppImage': 'Linux', '.exe': 'Windows', '.dmg': 'Mac'};
const nameFilter = (name:string) => (Object.keys(validExt).find(x => name.indexOf(x) !== -1) || '');

const Stat: React.FC<IProps> = ({ match, history }) => {
  const classes = useStyles();
  const [releases, setReleases] = React.useState([]);
  const [chartData, setChartData] = React.useState({
    user: '',
    repo: '',
    avatar: '',
    version: 0,
    data: [[]]
  });


  const handleBack = () => history.push('/');

  const handleVersionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    prepareAsset(event.target.value as number);
  };

  const prepareAsset = (id:number) => {
    const release:any = releases.find((item:any) => item.id === id);

    if (release) {
      prepareChartData(id, release.author.avatar_url, release.assets);
    }
  }

  const prepareChartData = (id:number, avatar:string, assets:any) => {
    const { user, repo } = match.params;

    const data = assets
      .filter((item:any) => (item.name.indexOf('.exe.blockmap') === -1 && nameFilter(item.name)))
      .map((item:any) => ({...item, ext: nameFilter(item.name)}))
      .map((item:any) => ([item.ext, item.download_count]));

    setChartData({
      user: user,
      repo: repo,
      avatar: avatar,
      version: id,
      data: [
        ['OS', 'Download'],
        ...data
      ]
    });
  }


  const fetchReleases = (user:string, repo: string) => {
    fetch(`https://api.github.com/repos/${user}/${repo}/releases`)
      .then(res => res.json())
      .then((result) => {
          setReleases(result);
        },
        (error) => {
        }
      )
  };

  React.useEffect(()=> {
    const { user, repo } = match.params;

    if (user && repo )
      fetchReleases(user, repo);
  }, [match.params.user, match.params.repo]);

  React.useEffect(()=> {
    if (releases && releases.length){
      const release:any = releases[0];
      prepareAsset(release.id);
    }
  }, [releases.length]);

  return (
    <Container maxWidth="md">
      <Grid container justify="center" alignItems="center">
        <h1 className={classes.title}>GitHub Stat</h1>
        <p>
          GitHub Stat is tool that let you visualize your repositories statatistics.
        </p>
      </Grid>
      <Grid container style={{ paddingTop: 20 }}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={chartData.avatar}
              >
                R
              </Avatar>
            }
            action={
              <>
              <IconButton aria-label="back" onClick={() => handleBack()}>
                <ArrowBackIcon />
              </IconButton>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={chartData.version}
                  onChange={handleVersionChange}
                >
                  {releases.map((item:any)=> (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))}
                </Select>
              </FormControl>
              </>
            }
            title={chartData.user}
            subheader={chartData.repo}
          />
          <CardContent>
              <Chart
                width="100%"
                height={300}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={chartData.data}
                options={{
                  title: ' ',
                  chartArea: { width: '100%' },
                  hAxis: {
                    title: '',
                    minValue: 0,
                  },
                  vAxis: {
                    title: ' ',
                  },
                }}
                legendToggle
              />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}

export default Stat;
