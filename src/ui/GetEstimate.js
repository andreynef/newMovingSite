import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import Link from "./Link";
import ProgressiveImage from "react-progressive-graceful-image";


const useStyles = makeStyles(theme => ({

  mainContainer: {
    backgroundColor: '#ffffff',
  },
  paperContainer:{
    backgroundColor: 'transparent',
  },
  img :{
    width:'100%',
    borderRadius:'20px',
  },
  quickViewContainer: {
    position: 'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    color: 'white',
    backgroundColor: `black`,
    opacity: 0,
    '&:hover': {
      opacity: 0.5,
      transition: 'all 0.5s ease 0s'
    },
  },

  imgContainer: {
    width:'50%',
    padding:'40px',
    // border: '1px solid red',
    [theme.breakpoints.down('sm')]: {
      width:'100%',
    },

  },
  exampleContainer: {
    width:'50%',
    padding:'40px',
    [theme.breakpoints.down('sm')]: {
      width:'100%',
      marginBottom: '30px'
    },

  },
  pic: {
    borderRadius: '50%',
    // width:'50%',
  },
  firstButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 55,
    width: 230,
    fontSize: '1.3rem',
    backgroundColor: theme.palette.common.blue,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
  },
  bottomQuote: {
    // border: '1px solid red',
    padding: '4em 0',
    backgroundImage: 'url(/assets/bl-7.png)',
    backgroundSize: 'contain',
    [theme.breakpoints.down('md')]: {
    },
  },

}))

export default function GetEstimate(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива

  return (
    <>
    <Grid container className={classes.bottomQuote} justify={'space-around'}>
      <Grid item>
        <Typography variant={'h3'} style={{marginBottom: '4%', color: 'black'}}>
          Get a <span style={{color: '#4f87dc', fontStyle: 'italic'}}>Free Estimate</span> Today!
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant={'contained'}
          className={classes.firstButton}
          component={Link}
          href={'/reservation'}
          style={{marginLeft: '20px'}}
        >
          Get free estimate
        </Button>
      </Grid>
    </Grid>
  {/*<img src={'/assets/bl-7.png'} alt={'roadPic'} style={{width:'100%', height:'100%'}}/>*/}
  </>

  )
}
