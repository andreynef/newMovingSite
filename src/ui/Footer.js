import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from "./Link";
import Hidden from "@material-ui/core/Hidden";


const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.lightBlue,
    padding: '20px 0',
    width: '100%',
    // zIndex: 1302,//как и в header'e чтоб футер был над меню дровера
    // position: 'relative',
  },
  socialIconImg: {
    width: '30px',
    height: '30px',
  },
  linkTel:{
    textDecoration: 'none',
    color:'black',
    fontSize: '1.1rem',
    position: 'relative',
    '&::before' : {
      position:'absolute',
      top:'10%',
      left:'-21px',
      content: '" "',
      width: 15,
      height: 15,
      alignItems: 'center',
      backgroundImage: `url('/assets/telephone.svg')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      [theme.breakpoints.down('xs')]: {
        width: 50,
        height: 50,
        top:'-20px',
        left:'-60px',
        borderRadius: '50%',
        border: '1px solid grey',
        backgroundSize: '80%',
        backgroundImage: `url('/assets/telephoneCall.svg')`,
        boxShadow: theme.shadows[5],
      },
    },
    '&:hover': {
      color: theme.palette.common.myGreen,
    },
    '&:hover::before': {
      transform: 'scale(1.3)',//Что? оптом моментальное изменение формы: сдвиг увеличение наклон и поворот.
      transition: 'all 0.2s cubic-bezier(0.25, 0.25, 0.56, 2)',//Как? логика перехода этого трансформа. какоеИменноСвойствоЧерЗапятую длительность схема задержка
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  },
  iconYelp:{
    marginLeft:10,
    marginBottom:10,
    width: '2em',
    height: '2em',
    backgroundImage: `url('/assets/yelp.png')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '7px',
    [theme.breakpoints.down('md')]: {
      boxShadow: theme.shadows[3],
    },
    '&:hover': {
      transform: 'scale(1.2)',//Что? оптом моментальное изменение формы: сдвиг увеличение наклон и поворот через пробел
      transition: 'all 0.2s cubic-bezier(0.25, 0.25, 0.56, 2)',//Как? логика перехода этого трансформа. какоеИменноСвойствоЧерЗапятую длительность схема задержка
    },
  },
  iconFacebook:{
    marginLeft:10,
    marginBottom:10,
    width: '2em',
    height: '2em',
    backgroundImage: `url('/assets/facebook.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '7px',
    [theme.breakpoints.down('md')]: {
      boxShadow: theme.shadows[3],
    },
    '&:hover': {
      transform: 'scale(1.2)',//Что? оптом моментальное изменение формы: сдвиг увеличение наклон и поворот.
      transition: 'all 0.2s cubic-bezier(0.25, 0.25, 0.56, 2)',//Как? логика перехода этого трансформа. какоеИменноСвойствоЧерЗапятую длительность схема задержка
    },
  },
  iconInstagram:{
    marginLeft:10,
    marginBottom:10,
    width: '2em',
    height: '2em',
    backgroundImage: `url('/assets/instagram.jpg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '7px',
    [theme.breakpoints.down('md')]: {
      boxShadow: theme.shadows[3],
    },
    '&:hover': {
      transform: 'scale(1.2)',//Что? оптом моментальное изменение формы: сдвиг увеличение наклон и поворот.
      transition: 'all 0.2s cubic-bezier(0.25, 0.25, 0.56, 2)',//Как? логика перехода этого трансформа. какоеИменноСвойствоЧерЗапятую длительность схема задержка
    },
  },
  iconSearch:{
    marginLeft:10,
    marginBottom:10,
    width: '2em',
    height: '2em',
    backgroundImage: `url('/assets/search.png')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // border:'1px solid grey',
    borderRadius: '7px',
    [theme.breakpoints.down('md')]: {
      boxShadow: theme.shadows[3],
    },
    '&:hover': {
      transform: 'scale(1.2)',//Что? оптом моментальное изменение формы: сдвиг увеличение наклон и поворот.
      transition: 'all 0.2s cubic-bezier(0.25, 0.25, 0.56, 2)',//Как? логика перехода этого трансформа. какоеИменноСвойствоЧерЗапятую длительность схема задержка
    },
  },
  iconTelMobile:{
    marginLeft:10,
    width: '2em',
    height: '2em',
    backgroundImage: `url('/assets/telephoneCall.svg')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '50%',
  },

}));

export default function Footer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива

  return (
    <footer className={classes.footer}>
      <Grid container justify={'center'} >
        <Grid item container justify={'center'} style={{marginTop:matchesXS?'15px':'5px'}}>
          <Link className={classes.iconYelp} target="_blank" href={'https://www.yelp.com/biz/konstant-movers-san-francisco-2?uid=lEB2o91jUL6XqN4brOYe7Q&utm_source=ishare'}> {}</Link>
          <Link className={classes.iconSearch} target="_blank" href={'https://www.google.com/search?sxsrf=ALeKk029WL91m4P1wrRscJALgUHxSZ00CA%3A1604100458766&ei=aqGcX_WjLuO10PEPzMOnqA4&q=konstant+movers&oq=Konstant&gs_lcp=CgZwc3ktYWIQARgAMgQIIxAnMg0ILhDHARCvARDJAxAnMgQIIxAnMgQIABBDMgIIADIFCAAQsQMyAggAMgIILjICCAAyCAguELEDEIMBOgQIABBHOhAILhDHARCvARDJAxAnEJMCOgQIABAeOgQIABAKOgcIABCxAxAKOgoIABCxAxCDARAKOgsILhCxAxDHARCjAlCcyQ5YvtkOYJHvDmgAcAJ4AIABkgKIAfcMkgEFMC42LjOYAQCgAQGqAQdnd3Mtd2l6yAEIwAEB&sclient=psy-ab'}> {}</Link>
          <Link className={classes.iconFacebook} target="_blank" href={'https://www.facebook.com/Konstant.movers.sf'}> {}</Link>
          <Link className={classes.iconInstagram} target="_blank" href={'https://www.instagram.com/konstantmovers/'}> {}</Link>
          <Hidden smUp>
            <Link href={'tel: 4158797194'} className={classes.iconTelMobile}> {}</Link>
          </Hidden>
        </Grid>
        <Grid item>
          <Typography variant={'body1'} align={'center'} style={{fontSize: '1rem'}}>
            <a href={'tel: +14154497888'} style={{textDecoration: 'none'}}>(888)259-0707</a>
          </Typography>
          <Typography variant={'body1'} align={'center'} style={{fontSize: '1rem'}}>
            <a href={'mailto: adhdmovers@gmail.com'}
               style={{textDecoration: 'none'}}> email@gmail.com</a>
          </Typography>
          <Typography style={{fontSize: matchesXS?'0.7rem':'0.8rem'}}>
            All in moving sistems . LLC
          </Typography>
          <Typography variant={'body1'} align={'center'} style={{fontSize: matchesXS?'0.7rem':'0.8rem'}}>
            All rights reserved
          </Typography>
        </Grid>
      </Grid>
    </footer>
  )
}
