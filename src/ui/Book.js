import React, {useState} from 'react';
import axios from "axios";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import businessCard from '../assets/businessCard.jpg';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ProgressiveImage from "react-progressive-graceful-image";
import Link from "./Link";


const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: '4em 0',
    backgroundImage: 'url(/assets/titleCut.jpg)',
    backgroundSize: 'cover',
    [theme.breakpoints.down('md')]: {
    },
  },
  message: {
    marginTop: '5em',
  },
  cardContainer: {
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: '1rem',
    backgroundColor: theme.palette.common.brown,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 225,
    },

  },
  bookContainer: {
    // border:'1px solid red',
    maxWidth:'1240px',
    padding: '10em 0',
    [theme.breakpoints.down('md')]: {
      padding: '0 20px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },

  },
  firstButton: {
    ...theme.typography.estimate,
    marginTop: '5em',
    borderRadius: 50,
    height: 35,
    width: 210,
    fontSize: '1.2rem',
    backgroundColor: theme.palette.common.pink,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
  },
}))

export default function Contact(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));//вызываем библиотеку для адаптива
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');//ручная установка подсказки а не дефолт инпутовская
  const [phone, setPhone] = useState('');
  const [phoneHelper, setPhoneHelper] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({open: false, message: '', backgroundColor: ''})

  const onChange = e => {
    let valid;
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)//тру фолс тест рег вырвжения
        if (!valid) {
          setEmailHelper('invalid email')
        } else {
          setEmailHelper('')
        }
        break;
      case 'phone':
        setPhone(e.target.value);
        valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(e.target.value)//тру фолс тест рег вырвжения
        if (!valid) {
          setPhoneHelper('invalid phone')
        } else {
          setPhoneHelper('')
        }
        break;
      default:
        break;
    }
  };
  const onConfirm = () => {//нажатие на кнопку 'отправить'
    setLoading(true);//включаем индикатор загрузки
    axios.get('https://us-central1-adhdmoversapp.cloudfunctions.net/sendMailFromADHDMovers', //запрос на URL
      {
        params: {//подробности дополняющие URL (query strings)
          name: name,
          email: email,
          phone: phone,
          message: message,
        }
      }
    )
      .then(res => {
        setLoading(false);//выключаем индикатор загрузки
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');//сброс полей
        setAlert({open: true, message: 'Message sent successfully!', backgroundColor: '#4bb543'})//показываем подтв окно
        console.log(res)
      })
      .catch(err => {
        setLoading(false);
        setAlert({open: true, message: 'Something went wrong, please try again!', backgroundColor: '#ff3232'})//показываем подтв окно c ошибкой
        console.log(err)
      })
  };


  return (
    <Grid container direction={matchesMD?'column-reverse':null} justify={'center'} className={classes.mainContainer}>
      <Grid item container className={classes.bookContainer} >
        <Grid item>
          <Typography
            variant={'h1'}
            style={{color:'white', lineHeight:1.3, fontSize:matchesXS?'1.8rem':matchesSM? '2.1rem':null}}
          >
            LUCKY MOVING SERVICE
          </Typography>
          <Typography variant={'h6'} style={{color:'white', marginTop:'20px'}}>ANYTIME ANYWHERE</Typography>
        </Grid>
        <Grid item container style={{marginTop: '2em'}}>
          <Button
            variant={'contained'}
            className={classes.firstButton}
            component={Link}
            href={'/quote'}
          >
            Get free quote
          </Button>
        </Grid>

      </Grid>

    </Grid>
  )
}
