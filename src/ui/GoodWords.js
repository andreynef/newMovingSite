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
    backgroundImage: `url('/assets/fon_body.png')`,
    backgroundColor: '#ffffff',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    // backgroundAttachment: 'fixed',//фикс картинка при прокрутке
    backgroundRepeat: 'repeat',
  },
  centralContainer: {
    maxWidth: '1240px',
    // border: '1px solid red',
    padding: '40px',
  },

  textContainer: {
    width:'45%',
    // padding:'40px',
    [theme.breakpoints.down('sm')]: {
      width:'100%',
      marginBottom: '30px'
    },
  },
  imgContainer: {
    width: '45%',
    // padding:'40px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  pic: {
    borderRadius: '50%',
    // width:'50%',
  },
}))

export default function GoodWords(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива


  return (
    <Grid container direction={matchesSM?'column':null} className={classes.mainContainer} justify={'center'}>
      <Grid item container className={classes.centralContainer} justify={"space-between"}>
        <Grid item container className={classes.textContainer} >
          <Typography variant={'h3'} style={{marginBottom: '4%', color: 'black'}}>
            Move With <span style={{color: '#4f87dc', fontStyle: 'italic'}}>the Best</span> Moving Company
          </Typography>
          <Typography variant={'body1'} style={{marginTop: '10px', marginBottom: '2%'}}>
            Our Moving Company has been a highly successful local moving business for over 10 years. And all because we just set a goal:
          </Typography>
          <Typography variant={'body1'} style={{marginTop: '10px', marginBottom: '2%'}}>
            &#10004; &nbsp;From the first call to the very last box our well trained courteous team provides a superb moving experience
          </Typography>
          <Typography variant={'body1'} style={{marginTop: '10px', marginBottom: '2%'}}>
            &#10004; &nbsp;We use a simple and completely transparent billing system for payment
          </Typography>
          <Typography variant={'body1'} style={{marginTop: '10px', marginBottom: '2%'}}>
            &#10004; &nbsp;Our number one priority is YOU. We strive to make our customers 101% satisfied no matter what
          </Typography>
          <Typography variant={'body1'} style={{marginTop: '10px', marginBottom: '2%'}}>
            Our Moving Company has been a highly successful local moving business for over 10 years. And all because we just set a goal:
          </Typography>
        </Grid>
        <Grid item className={classes.imgContainer}>
          {/*<ProgressiveImage*/}
          {/*  src={"/assets/bl2.webp"}*/}
          {/*  placeholder={"/assets/bl2.webp"}*/}
          {/*>*/}
          {/*  {src => <img src={src} className={classes.pic} alt={'ava img'} />}*/}
          {/*</ProgressiveImage>*/}
          <img src={"/assets/bl2.webp"} alt={'pic'} style={{width: '100%'}}/>
        </Grid>
      </Grid>
    </Grid>


  )
}
