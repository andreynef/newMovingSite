import React, {useState} from 'react';
import axios from "axios";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Head from "next/head";
import Link from "../src/ui/Link";
import NumberFormat from "react-number-format";


const useStyles = makeStyles(theme => ({
  message: {
    // border: `2px solid ${theme.palette.common.darkGrey}`,
    marginTop: '5em',
    // borderRadius: '5',
  },
  contactContainer: {
    paddingBottom: '40px',
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

  contactCard: {
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    // padding: '10em',
    width: '400px',
    [theme.breakpoints.down('xs')]: {
      // padding: '8em 0',
      // borderRadius: 0,
      width: '100%',
    },
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245,
    fontSize: '1rem',
    backgroundColor: theme.palette.common.blue,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 225,
    },
  },
}))

export default function Contacts(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));//вызываем библиотеку для адаптива
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));//вызываем библиотеку для адаптива

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');//ручная установка подсказки а не дефолт инпутовская

  const [phone, setPhone] = useState('');
  const [phoneHelper, setPhoneHelper] = useState('');

  const [message, setMessage] = useState('');

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({open: false, message: '', backgroundColor: ''});


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
    axios.get('https://us-central1-konstant-movers.cloudfunctions.net/sendMailFromKMovers', //запрос на URL
      {
        params: {//подробности дополняющие URL (query strings)
          name: name,
          email: email,
          phone: phone,
          message: message,
        }
      }
    )
      .then(res => {//выполнится когда поступит ответ
        setLoading(false);//выключаем индикатор загрузки
        setOpen(false);//закрыть диалоговое окно
        setName('');//сброс полей
        setEmail('');//сброс полей
        setPhone('');//сброс полей
        setMessage('');//сброс полей
        setAlert({open: true, message: 'Message sent successfully', backgroundColor: '#4bb543'})//показываем подтв окно
        console.log(res)
      })
      .catch(err => {//выдаст если вернулась ошибка
        setLoading(false);
        setAlert({open: true, message: 'Something went wrong, please try again!', backgroundColor: '#ff3232'})//показываем подтв окно c ошибкой
        console.log(err)
      })
  };

  const buttonContents = (
    <>
      Send Messagee
      <img src={'/assets/send.svg'} alt={'paper plane'} style={{marginLeft: '1em'}}/>
    </>
  )
console.log (NumberFormat);

  return (
    <Grid container alignItems={'center'} justify={'center'} className={classes.contactContainer}>
      <Head>
        <title key={'title'}>
          Contact Us | Konstant Movers
        </title>
        <meta
          name={'description'}
          key={'description'}
          content={'Let the moving be just moving. Send us a message with any of your ideas or questions to get started!'}
        />
        <meta property={'og:title'} content={'We are family owned, and our staff are experienced trained employees, so you get personalised,  professional service at an affordable price.| Contact Us'} key={'og:title'}/>
        {/*добавляем open graph превью для SEO. Подробности в www.ogp.me */}
        <meta property={'og:url'} content={'konstant-movers.com/contacts'} key={'og:url'}/>
        {/*добавляем ссылку на страницу сайта */}
        <link rel={'canonical'} key={'canonical'} href={'konstant-movers.com/contacts'}/>
        {/*дефолтный главный адрес страницы. Зависит от настроек DNS*/}
      </Head>
      <img src={'/assets/contact.png'} alt={'contactPic'} style={{width:'100%', marginBottom:'40px'}}/>
      <Card className={classes.contactCard}>
        <CardContent>
          <Grid container justify={'center'} style={{padding: '2em 0'}}>
            <Grid item container direction={'column'} alignItems={'center'}>
              <Typography variant={'h3'} style={{lineHeight: 1}}
                          align={matchesMD ? 'center' : undefined}>
                Contact
              </Typography>
              <Grid item container direction={'column'} style={{marginTop: '2em', marginBottom: '2em', width: '20em'}}>
                <Grid item container justify={'center'}>
                  {/*<Grid item>*/}
                  {/*  <img src={phoneIcon} alt={'phone'} style={{marginRight: '0.5em', verticalAlign: 'bottom'}}/>*/}
                  {/*</Grid>*/}
                  <Grid item >
                    <Link variant={'body1'} href={'tel: 415875697194'} style={{color: theme.palette.common.blue, fontSize: '1rem', textDecoration: 'none'}}>
                      (415)111-1111
                    </Link>
                  </Grid>
                </Grid>
                <Grid item container justify={'center'}>
                  {/*<Grid item>*/}
                  {/*  <img src={emailIcon} alt={'envelope'} style={{marginRight: '0.5em', verticalAlign: 'bottom'}}/>*/}
                  {/*</Grid>*/}
                  <Grid item>
                    <Link variant={'body1'} href={'mailto: email@gmail.com'} style={{color: theme.palette.common.blue, fontSize: '1rem', textDecoration: 'none'}}>
                      email@gmail.com
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container direction={'column'} style={{width: '20em'}}>
                <Grid item style={{marginBottom: '0.5em'}}>
                  <TextField
                    label={'Name'}
                    id={'name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item style={{marginBottom: '0.5em'}}>
                  <TextField
                    label={'Email'}
                    helperText={emailHelper}
                    id={'email'}
                    value={email}
                    onChange={onChange}
                    fullWidth
                  />
                </Grid>
                <Grid item style={{marginBottom: '0.5em'}}>
                  <TextField
                    label={'Phone'}
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
                  rows={10}
                  className={classes.message}
                  variant="outlined"
                  // inputProps={{disableUnderline:true}}//убрать палку через спец инпутовский метод
                  fullWidth
                  placeholder={'Please, type a message'}

                />
              </Grid>
              <Grid item container justify={'center'} style={{marginTop: '2em'}}>
                <Button
                  variant={'contained'}
                  className={classes.sendButton}
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
                  {loading ? <CircularProgress
                    size={30}/> : buttonContents}{/*показывать кнопку или индикатор загрузки во время работы axios*/}
                </Button>
              </Grid>
              <Snackbar//всплывающее окно подтверждения
                open={alert.open}
                message={alert.message}
                ContentProps={{style: {backgroundColor: alert.backgroundColor, fontFamily:'Raleway', fontWeight: 500, fontSize:'1rem'}}}//перепис завода кот хз где
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                onClose={() => setAlert({...alert, open: false})}
                autoHideDuration={4000}
              />
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
