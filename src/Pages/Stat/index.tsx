import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Card,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  CardHeader,
  CardContent,
  Avatar,
  IconButton
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Header from '../../Components/Header';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const default_options: Highcharts.Options =  {
    chart: {
      type: 'column'
    },
    title: {
      text: ' '
    },
    xAxis: {
      categories: []
    },
    yAxis: {
        min: 0,
        title: {text: ' '}
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
      shared: true
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false      
    },
    plotOptions: {
        column: {
            dataLabels: {
                enabled: true
            }
        }
    },
    series: []
};


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

interface IExtension {
  name: string,
  color: string
}

const validExt:Record<string, IExtension> = {
  '.AppImage': {
    name: 'Linux',
    color: '#A88C46'
  },
  '.exe': {
    name: 'Windows',
    color: '#F2C62E'
  },
  '.dmg': {
    name: 'Mac',
    color: '#E27827'
  }
};

const nameFilter = (name:string) => (Object.keys(validExt).find(x => name.indexOf(x) !== -1) || '');
const Stat: React.FC<IProps> = ({ match, history }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);  
  const [releases, setReleases] = React.useState([]);
  const [model, setModel] = React.useState({
    user: '',
    repo: '',
    avatar: '',
    version: 0,
    data: [[]]
  });
  const [chartOption, setChartOption] = React.useState(default_options);

  const handleBack = () => history.push('/');

  const handleVersionChange = (event: React.ChangeEvent<{ value: unknown }>) => prepareAsset(event.target.value as number);

  const prepareAsset = (id:number) => {
    const release:any = releases.find((item:any) => item.id === id);

    if (release) {
      prepareChartData(id, release.author.avatar_url, release.assets);
    }
  }

  const prepareChartData = (id:number, avatar:string, assets:any) => {
    const { user, repo } = match.params;

    const data = assets
      .filter((item:any) => (!item.name.includes('.exe.blockmap') && nameFilter(item.name)))
      .map((item:any) => {
        const extension_name:string = nameFilter(item.name);
        const extension:IExtension = validExt[extension_name];
        return {
          name: (extension.name || item.ext),
          y: item.download_count,
          color: (extension.color || '#34595A')
        };
      });

    setChartOption(prevStat => ({
      ...prevStat,
      xAxis: {
        categories: data.map(({ name }: { name: string}) => name)
      },
      series: [{
        type: 'column',
        name: 'Download',
        data: data.map(({y, color}: { y: number, color: string}) => ({ y, color }))
      }]
    }));

    setModel({
      user: user,
      repo: repo,
      avatar: avatar,
      version: id,
      data: [
        ['OS', 'Download', { role: "style" }],
        ...data
      ]
    });
    setIsLoading(false);
  }


  const fetchReleases = (user:string, repo: string) => {
    setIsLoading(true);
    fetch(`https://api.github.com/repos/${user}/${repo}/releases`)
      .then(res => res.json())
      .then(
        result => setReleases(result),
        error => setIsLoading(false)
      )
  };

  React.useEffect(()=> {
    const { user, repo } = match.params;

    if (user && repo ){
      fetchReleases(user, repo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.user, match.params.repo]);

  React.useEffect(()=> {
    if (releases && releases.length){
      const release:any = releases[0];
      prepareAsset(release.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [releases.length]);

  return (
    <Container className={classes.root} maxWidth="md">
      <Header />
      {
        isLoading 
        ? (<Grid container justify="center">
          <CircularProgress />
        </Grid>)
        : (
          <Grid container style={{ paddingTop: 20 }}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src={model.avatar}
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
                      value={model.version}
                      onChange={handleVersionChange}
                    >
                      {releases.map((item:any)=> (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))}
                    </Select>
                  </FormControl>
                  </>
                }
                title={model.user}
                subheader={model.repo}
              />
              <CardContent>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOption}
                />
              </CardContent>
            </Card>
          </Grid>
        )
      }
    </Container>
  );
}

export default Stat;
