import React, {useState} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Head from "next/head";


const useStyles = makeStyles(theme => ({
  contactCard: {
    [theme.breakpoints.down('xs')]: {
    },
  },
  serviceContainer: {
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

}))

export default function Services(props) {
  const classes = useStyles();
  const theme = useTheme();//теперь есть доступ к стрелке learnMore из этого комполнента
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива
  return (
    <>
      <Head>
        <title key={'title'}>
          Services | Konstant Movers
        </title>
        <meta
          name={'description'}
          key={'description'}
          content={'Various moving!'}
        />
        <meta property={'og:title'} content={'Consider adding packing/unpacking to your moving request.| Services'} key={'og:title'}/>
        {/*добавляем open graph превью для SEO. Подробности в www.ogp.me */}
        <meta property={'og:url'} content={'konstant-movers.com/services'} key={'og:url'}/>
        {/*добавляем ссылку на страницу сайта */}
        <link rel={'canonical'} key={'canonical'} href={'konstant-movers.com/services'}/>
        {/*дефолтный главный адрес страницы. Зависит от настроек DNS*/}
      </Head>
      {/*<img src={'/assets/service.png'} alt={'servicePic'} style={{width:'100%'}}/>*/}
      <Grid container direction={'column'} className={classes.serviceContainer}>

      <Typography variant={'body1'} style={{fontSize:matchesXS?'0.8rem': undefined, textIndent: '1.5em', textAlign: 'justify', width:matchesSM?'100%':'80%', margin:'0 auto'}}>
        Packing and Unpacking Life is busy! Do you really have the time and energy to pack your entire house, and to do it well?
        If the answer is no, you might consider adding packing/unpacking to your moving request. <br/>
      </Typography>
      <Typography variant={'body1'} style={{fontSize:matchesXS?'0.8rem': undefined, textIndent: '1.5em', textAlign: 'justify', width:matchesSM?'100%':'80%', margin:'1em auto 0 auto'}}>
        Professional movers will ensure that your belongings are protected and safe for their upcoming journey. Disassembly and Reassembly Large furniture, electronics, or anything that has been wall-mounted will need to be taken apart and packed before it can be transported. Save yourself the time and head-scratching by hiring your movers to do it for you. They will come prepared with the correct tools, bag up all of those tiny screws, and make sure it goes back together properly in your new home. How much is your sanity worth to you? Handling Special Items Fragile items, antiques, art, wine collections, you name it -- sometimes there are things in your home that need more than just your average packing job. When you want to be absolutely sure that your precious items make it to your new home intact, enlist the support of your moving company to create a custom wood crate or other custom packaging to get you from here to there.
      </Typography>
      <Typography variant={'h3'} align={'center'} style={{margin: '1em 0', color: "#F16FA6"}}>
        Services: (либо списком либо карточками как на макете)
      </Typography>
      <Typography variant={'body2'} align={'center'}>
        Local Moving, <br/>
        Large and Heavy Item Moving, <br/>
        Commercial Services, <br/>
        Furniture Assembly, <br/>
        Furniture Moving, <br/>
        Senior Moving, <br/>
        Packing, Unpacking, & Crating<br/>
        Service with materials (shrink wrap, blankets, tape, mattress bags, paper, wardrobe box, bubble wrap) <br/>
        pack and move <br/>
        inside moves <br/>
        professional packing and unpacking<br/>
        same day service <br/>
        serve in holidays <br/>
        assemble furniture <br/>
        loading and unloading service
      </Typography>
      </Grid>
    </>
  )
}
