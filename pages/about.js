import React, {useState} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import ProgressiveImage from "react-progressive-graceful-image";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const useStyles = makeStyles(theme => ({

  aboutContainer: {
    padding: '40px',
    backgroundImage: `url('/assets/fon_body.png')`,
    backgroundColor: '#ffffff',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // backgroundAttachment: 'fixed',//фикс картинка при прокрутке
    backgroundRepeat: 'repeat',
    width: '100%',
    [theme.breakpoints.down('md')]: {
    },
  },
  card: {
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    // padding: '10em',
    marginBottom: '2em',
    width: '20%',
    [theme.breakpoints.down('sm')]: {
      width: '45%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  img: {
    width: '30%',
    // height: 'auto',
    // minHeight: '13em',
    marginBottom: '2em',
    alignSelf: 'flex-start',//исправление бага высоты на iOs потому что родитель флекс. Походу на остальных все раб автоматом.
    boxShadow: theme.shadows[7],
    [theme.breakpoints.down('sm')]: {
      width: '45%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },

  }
}))

export default function About(props) {
  const classes = useStyles();
  const theme = useTheme();//вызываем библиотеку для адаптива
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));//вызываем библиотеку для адаптива


  return (
    <>
      <Head>
        <title key={'title'}>
          About | Konstant Movers
        </title>
      </Head>
      <img src={'/assets/about.png'} alt={'aboutPic'} style={{width:'100%'}}/>
      <Grid container className={classes.aboutContainer} justify={'center'}>
        <Grid item container style={{maxWidth:'1240px'}}>
          <Grid item container justify={'center'}>
            <Typography variant={'h3'} align={'center'} style={{margin: '1em 0'}}>
              About Us
            </Typography>
          </Grid>
          <Typography variant={'body2'} style={{marginBottom: '2em'}}>
            All in Moving Systems has been in the moving business for more than 10 years with hundreds of repeat customers. We concentrate on making the process seamless, putting your priorities first. All in Moving Systems has a legacy of creating special client-business relationships that last for years. Perhaps this is why a significant amount of our customers have moved with us in the past.
          </Typography>
          <Grid container justify={'space-around'} style={{width:'100%', marginBottom:'40px'}}>
            <Card className={classes.card}>
              <CardContent>
                <Grid container justify={'center'} style={{padding: '2em 0'}}>
                  <Grid item container direction={'column'} alignItems={'center'}>
                    <img src={'/assets/w1.png'} alt={'contactPic'} style={{width:'100%', marginBottom:'40px'}}/>

                    <Typography variant={'h5'} style={{lineHeight: 1, marginBottom:'40px'}}
                                align={matchesMD ? 'center' : undefined}>
                      Full licensed movers
                    </Typography>
                    <Typography variant={'body1'} style={{lineHeight: 1}}
                                align={matchesMD ? 'center' : undefined}>
                      We understand all of your moving needs. Our professional movers are friendly and attentive
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card className={classes.card}>
              <CardContent>
                <Grid container justify={'center'} style={{padding: '2em 0'}}>
                  <Grid item container direction={'column'} alignItems={'center'}>
                    <img src={'/assets/w2.png'} alt={'contactPic'} style={{width:'100%', marginBottom:'40px'}}/>

                    <Typography variant={'h5'} style={{lineHeight: 1, marginBottom:'40px'}}
                                align={matchesMD ? 'center' : undefined}>
                      Affordable rates
                    </Typography>
                    <Typography variant={'body1'} style={{lineHeight: 1}}
                                align={matchesMD ? 'center' : undefined}>
                      We keep our fees affordable, while delivering great quality
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Grid container justify={'center'} style={{padding: '2em 0'}}>
                  <Grid item container direction={'column'} alignItems={'center'}>
                    <img src={'/assets/w3.png'} alt={'contactPic'} style={{width:'100%', marginBottom:'40px'}}/>

                    <Typography variant={'h5'} style={{lineHeight: 1, marginBottom:'40px'}}
                                align={matchesMD ? 'center' : undefined}>
                      Moving protection & qualified drivers
                    </Typography>
                    <Typography variant={'body1'} style={{lineHeight: 1}}
                                align={matchesMD ? 'center' : undefined}>
                      And insured company. Our license number: MTR 191064
                      US DOT 2417086
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Grid container justify={'center'} style={{padding: '2em 0'}}>
                  <Grid item container direction={'column'} alignItems={'center'}>
                    <img src={'/assets/w4.png'} alt={'contactPic'} style={{width:'100%', marginBottom:'40px'}}/>

                    <Typography variant={'h5'} style={{lineHeight: 1, marginBottom:'40px'}}
                                align={matchesMD ? 'center' : undefined}>
                      Packing/ storage/ customer service
                    </Typography>
                    <Typography variant={'body1'} style={{lineHeight: 1}}
                                align={matchesMD ? 'center' : undefined}>
                      We pack all your things with care and efficiency in the best packaging materials
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

          </Grid>
          <Typography variant={'body2'} style={{marginBottom: '1em'}}>
            In 2007, our founder Dimitry has been innovating the moving business by streamlining the booking process, making jobs go faster. That saves money for our customers and allows us to provide more services to more people and businesses.
          </Typography>
          <Grid container style={{padding: '40px'}} justify={'space-evenly'}>
            <ProgressiveImage
              src={'/assets/1.jpg'}
              placeholder={'/assets/img-placeholder.png'}
            >
              {src => <img src={src} alt={'photo1'} className={classes.img}/>}
            </ProgressiveImage>
            <ProgressiveImage
              src={'/assets/2.jpg'}
              placeholder={'/assets/img-placeholder.png'}
            >
              {src => <img src={src} alt={'photo2'} className={classes.img}/>}
            </ProgressiveImage>
            <ProgressiveImage
              src={'/assets/3.jpg'}
              placeholder={'/assets/img-placeholder.png'}
            >
              {src => <img src={src} alt={'photo3'} className={classes.img}/>}
            </ProgressiveImage>
            <ProgressiveImage
              src={'/assets/4.jpg'}
              placeholder={'/assets/img-placeholder.png'}
            >
              {src => <img src={src} alt={'photo4'} className={classes.img}/>}
            </ProgressiveImage>
            <ProgressiveImage
              src={'/assets/6.jpg'}
              placeholder={'/assets/img-placeholder.png'}
            >
              {src => <img src={src} alt={'photo6'} className={classes.img}/>}
            </ProgressiveImage>
          </Grid>
          <Typography variant={'body2'} style={{marginBottom: '1em'}}>
            Nothing is better than waking up in your new home or starting the day in your new office. We know that feeling, and we want you to feel that way. How much better will your move be when you know you have the most reputable and affordable moving company in San Jose. In fact, of all Bay Area movers, we shine the brightest and set the standards for other companies to follow, disrupting the moving industry one happy customer after another.
          </Typography>
        </Grid>
      </Grid>

    </>
  )
}
