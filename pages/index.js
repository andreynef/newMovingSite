import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import Book from "../src/ui/Book";
import GoodWords from "../src/ui/GoodWords";
import GetEstimate from "../src/ui/GetEstimate";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    // padding: '1em 0 0 0',
    // backgroundColor:'#b8e0bc',
  },
}))

export default function Index(props) {
  const classes = useStyles();
  const theme = useTheme();//теперь есть доступ к стрелке learnMore из этого комполнента

  return (
    <Grid container direction={'column'} className={classes.mainContainer}>
      <Head>
        <title key={'title'}>
          Moving Service Company in San-Francisco | Konstant Movers
        </title>
        <meta
          name={'description'}
          key={'description'}
          content={'Easy moving within San-Francisco'}
        />
        <meta property={'og:title'} content={'Moving Service Company in San-Francisco | Konstant Movers'} key={'og:title'}/>{/*добавляем open graph превью для SEO. Подробности в www.ogp.me */}
        <meta property={'og:url'} content={'konstant-movers.com'} key={'og:url'}/>{/*добавляем ссылку на страницу сайта */}
        <link rel={'canonical'} key={'canonical'} href={'konstant-movers.com'}/>{/*дефолтный главный адрес страницы. Зависит от настроек DNS*/}
      </Head>
      {/*--------Book Block--------*/}
      <Book/>
      {/*--------GoodWords Block--------*/}
      <GoodWords/>
      {/*--------Get free estimate Block--------*/}
      {/*<GetEstimate/>*/}
      {/*/!*--------Quote--------*!/*/}
      {/*<Grid item className={classes.quoteContainer}>*/}
      {/*  <Order/>*/}
      {/*</Grid>*/}
      {/*<img src={"/assets/best2.jpg"} alt={'pic'} className={classes.pic}/>*/}
    </Grid>
  );
}
