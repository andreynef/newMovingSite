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
    backgroundImage: 'url(/assets/bl1.webp)',
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
    padding: '0',
    [theme.breakpoints.down('md')]: {
      padding: '0 20px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },

  },
  firstButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 35,
    width: 210,
    fontSize: '1.2rem',
    backgroundColor: theme.palette.common.blue,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
  },
}))

export default function Contact(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));//вызываем библиотеку для адаптива

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
      <Grid item container justify={'flex-end'} className={classes.bookContainer} >
        <Card className={classes.cardContainer}>
          <CardContent>
            <Grid container justify={'center'} style={{padding: '2em 0'}}>
              <Grid item container direction={'column'} alignItems={'center'}>
                  <Button
                  variant={'contained'}
                  className={classes.firstButton}
                  component={Link}
                  href={'/quote'}
                  style={{marginLeft: '20px'}}
                >
                    Get free quote
                </Button>
                <Typography variant={'body1'} style={{lineHeight: 1, padding: '20px 40px 20px 40px'}} align={'center'}>
                  or
                </Typography>
                <Typography variant={'body1'} style={{lineHeight: 1, padding: '0 40px 20px 40px'}} align={'center'}>
                  send us a message
                </Typography>
                <Grid item container direction={'column'} style={{width: '20em'}}>
                  <Grid item style={{marginBottom: '0.5em'}}>
                    <TextField
                      label={'Full Name*'}
                      id={'name'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item style={{marginBottom: '0.5em'}}>
                    <TextField
                      label={'Email*'}
                      helperText={emailHelper}
                      id={'email'}
                      value={email}
                      onChange={onChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item style={{marginBottom: '0.5em'}}>
                    <TextField
                      label={'Phone number*'}
                      helperText={phoneHelper}
                      id={'phone'}
                      value={phone}
                      onChange={onChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item style={{width: '20em'}}>
                  <TextField
                    id={'message'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    multiline
                    rows={5}
                    className={classes.message}
                    variant="outlined"
                    // inputProps={{disableUnderline:true}}//убрать палку через спец инпутовский метод
                    fullWidth
                    placeholder={'Message'}

                  />
                </Grid>
                <Grid item container justify={'center'} style={{marginTop: '2em'}}>
                  <Button
                    variant={'contained'}
                    className={classes.sendButton}
                    color={"secondary"}
                    disabled={//кнопка не рабочая если true эти условия
                      phone.length === 0 ||
                      email.length === 0 ||
                      name.length === 0 ||
                      message.length === 0 ||
                      phoneHelper.length !== 0 ||
                      emailHelper.length !== 0
                    }
                    onClick={onConfirm}//для диалога
                  >
                    {loading ? <CircularProgress size={30}/> : <span>Send</span>}{/*показывать кнопку или индикатор загрузки во время работы axios*/}
                  </Button>
                </Grid>
                <Snackbar//всплывающее окно подтверждения
                  open={alert.open}
                  message={alert.message}
                  ContentProps={{style: {backgroundColor: alert.backgroundColor}}}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                  onClose={() => setAlert({...alert, open: false})}
                  autoHideDuration={4000}
                />
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}
