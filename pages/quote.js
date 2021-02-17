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
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Head from "next/head";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { DropzoneArea } from 'material-ui-dropzone';
import Resizer from 'react-image-file-resizer';
import {storage} from '../firebase/index';

const useStyles = makeStyles(theme => ({
  message: {
    border: `2px solid ${theme.palette.common.darkGrey}`,
    marginTop: '5em',
    borderRadius: '5',
  },
  item: {
    // width:'100%',
    marginBottom:'10px'
  },
  quoteContainer: {
    padding: '40px 0',
      backgroundImage: `url('/assets/orderbox.jpg')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      // backgroundAttachment: 'fixed',//фикс картинка при прокрутке
      backgroundRepeat: 'no-repeat',
      width: '100%',
      [theme.breakpoints.down('md')]: {
    },
    },
  quoteCard: {
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    // padding: '10em',
    width: '500px',
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
    backgroundColor: theme.palette.common.myGreen,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down('sm')]: {
      height: 40,
      width: 225,
    },

  },
  button: {
    borderRadius: 50,
    color: '#fff',
    textTransform: 'none',
    backgroundColor: theme.palette.common.myGreen,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',

  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },


}))

export default function Quote(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));//вызываем библиотеку для адаптива
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));//вызываем библиотеку для адаптива

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');//ручная установка подсказки а не дефолт инпутовская
  const [phone, setPhone] = useState('');
  const [phoneHelper, setPhoneHelper] = useState('');
  const [items, setItems] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date(2020, 11, 31));
  const [time, setTime] = useState(new Date());
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [moveSize, setMoveSize] = useState('');
  const [stairsFrom, setStairsFrom] = useState('');
  const [stairsTo, setStairsTo] = useState('');
  const [elevatorFrom, setElevatorFrom] = useState('');
  const [elevatorTo, setElevatorTo] = useState('');
  const [parkingFrom, setParkingFrom] = useState('');
  const [parkingTo, setParkingTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({open: false, message: '', backgroundColor: ''});
  // const [image, setImage] = useState(null);
  // const [uploadedImages, setUploadedImages] = useState([]);
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [progress, setProgress] = useState(0);


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

  function getDateWithLongMonth(date) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return date.toLocaleString("en-US", options);
  };

  function getDateWithShortMonth(date) {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return date.toLocaleString("en-US", options);
  };

  function getTime(date) {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleString("en-US", options);
  };
//------------uploding---------------
  const handleChangeFile = (e)=>{
    if (e.target.files[0]){
      // setImage(e.target.files[0])
    }
  }
  const handleUploadFile = (e)=>{
    const uploadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
    uploadTask.on(
      "state_changed",
      snapshot =>{
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes)*100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      ()=> {
        storage
          .ref("images")
          .child(e.target.files[0].name)
          .getDownloadURL()
          .then(url =>{
            if(e.target.id==='imageInput1'){
              setImageUrl1(url);
              console.log('setting image 1')
            }
            if(e.target.id==='imageInput2'){
              setImageUrl2(url);
              console.log('setting image 2')
            }
            if(e.target.id==='imageInput3'){
              setImageUrl3(url);
              console.log('setting image 3')
            }
            console.log('image url--->:', url)
          })
      }
    )
  }
//-------------------------------------------------


  const onChangeDropzone = (files) => {
    if (files[0]){
      setUploadedImages(files)
    }
  }

  const compressToCanvas = (file, handler)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => handler(e.target.result.toString());
    console.log('compressed')
  }
//---------------resizer--------------------
//---------------1 вариант-----------
  const fileChangedHandler = (event) => {//in input ( onChange etc)
    let fileInput = false
    if(event.target.files[0]) {
      fileInput = true
    }
    if(fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        300,
        300,
        'JPEG',
        100,
        0,// Is the degree of clockwise rotation to apply to uploaded image.
        uri => {// Is the callBack function of the resized new image URI.
          console.log(uri)
        },
        'blob',
        200,
        200,
      );
    }
  }
//---------------2 вариант-----------
  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
      uri => {
        resolve(uri);
      },
      'base64'
    );
  });
  const onChangeInput = async (event) => {
    const file = event.target.files[0];
    const image = await resizeFile(file);
    console.log(image);
  }
  //-------------------------------------------

  const onConfirm = () => {//нажатие на кнопку 'отправить'
    setLoading(true);//включаем индикатор загрузки
    const dateWithShortMonth = getDateWithShortMonth(date);//преобразуем дату в читабельный вид
    const dateWithLongMonth = getDateWithLongMonth(date);
    const formattedTime = getTime(time);
    axios.get('https://us-central1-konstant-movers.cloudfunctions.net/sendMailFromKMovers', //запрос на URL
      {
        params: {//подробности дополняющие URL (query strings)
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          to: to,
          from: from,
          moveSize: moveSize,
          dateShort: dateWithShortMonth,
          dateLong: dateWithLongMonth,
          formattedTime: formattedTime,
          elevatorFrom: elevatorFrom,
          elevatorTo: elevatorTo,
          stairsFrom: stairsFrom,
          stairsTo: stairsTo,
          parkingFrom: parkingFrom,
          parkingTo: parkingTo,
          items: items,
          notes: notes,
          imageUrl1: imageUrl1,
          imageUrl2: imageUrl2,
          imageUrl3: imageUrl3,
        }
      }
    )
      .then(res => {//выполнится когда поступит ответ
        setLoading(false);//выключаем индикатор загрузки
        setFirstName('');//сброс полей
        setLastName('');
        setPhone('');//сброс полей
        // setDate('');//сброс полей
        // setTime('');//сброс полей
        setFrom('');//сброс полей
        setTo('');//сброс полей
        setElevatorFrom('');//сброс полей
        setElevatorTo('');//сброс полей
        setStairsFrom('');//сброс полей
        setStairsTo('');//сброс полей
        setParkingFrom('');//сброс полей
        setParkingTo('');//сброс полей
        setItems('');//сброс полей
        setNotes('');//сброс полей
        setAlert({open: true, message: 'Message sent successfully!', backgroundColor: '#4bb543'});//показываем подтв окно
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
      Get Quote
      <img src={'/assets/send.svg'} alt={'paper plane'} style={{marginLeft: '1em'}}/>
    </>
  );

  return (
    <Grid container alignItems={'center'} justify={'center'} className={classes.quoteContainer}>
      <Head>
        <title key={'title'}>
          Moving Service Company in San-Francisco | Konstant Movers
        </title>
        <meta
          name={'description'}
          key={'description'}
          content={'Send us a message to get free quote and we will respond to you within an hour'}
        />
        <meta property={'og:title'} content={'Our teams are experienced professional movers; they love what they do and they are good at it! We take pride in offering the best equipment, personnel and services for your moving needs both residential and commercial.| Free quote'} key={'og:title'}/>{/*добавляем open graph превью для SEO. Подробности в www.ogp.me */}
        <meta property={'og:url'} content={'konstant-movers.com/quote'} key={'og:url'}/>{/*добавляем ссылку на страницу сайта */}
        <link rel={'canonical'} key={'canonical'} href={'konstant-movers.com/quote'}/>{/*дефолтный главный адрес страницы. Зависит от настроек DNS*/}
      </Head>
      <Card className={classes.quoteCard}>
        <CardContent>
          <Grid container justify={'center'} style={{padding: '2em 0'}}>
            <Grid item container direction={'column'} alignItems={'center'}>
              <Typography variant={'h1'} style={{lineHeight: 1, color: '#696969', marginBottom: '20px'}}
                          align={matchesMD ? 'center' : undefined}>
                Request Quote
              </Typography>
              <Grid item container direction={'column'} style={{width: matchesSM ? '90%' : '20em'}}>
                <Grid item container className={classes.item} justify={'space-between'}>
                  <Grid item style={{width: '48%'}}>
                    <TextField
                      color={'secondary'}
                      label={'Firstname'}
                      id={'firstname'}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item style={{width: '48%'}}>
                    <TextField
                      color={'secondary'}
                      label={'Lastname'}
                      id={'lastname'}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item className={classes.item}>
                  <TextField
                    color={'secondary'}
                    label={'Phone (example: 4058797194)'}
                    helperText={phoneHelper}
                    id={'phone'}
                    value={phone}
                    onChange={onChange}
                    fullWidth
                    // helperText="Some important text"
                  />
                </Grid>
                <Grid item className={classes.item}>
                  <TextField
                    color={'secondary'}
                    label={'Email'}
                    id={'email'}
                    value={email}
                    helperText={emailHelper}
                    onChange={onChange}
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.item}>
                  <TextField
                    label={'Moving from'}
                    id={'Moving from'}
                    value={from}
                    color={'secondary'}
                    onChange={(e) => setFrom(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.item}>
                  <TextField
                    label={'Moving to'}
                    color={'secondary'}
                    id={'Moving to'}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    // inputProps={{disableUnderline:true}}//убрать палку через спец инпутовский метод
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.item}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="move size">Move size</InputLabel>
                    <Select
                      labelId="move size"
                      id="move size"
                      value={moveSize}
                      onChange={(e) => setMoveSize(e.target.value)}
                    >
                      <MenuItem value={'Studio'}>Studio</MenuItem>
                      <MenuItem value={'1 Bedroom'}>1 Bedroom</MenuItem>
                      <MenuItem value={'2 Bedroom'}>2 Bedroom</MenuItem>
                      <MenuItem value={'3+ Bedroom'}>3+ Bedroom</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item className={classes.item}>
                  {/*альтернатива*/}
                  {/*<TextField*/}
                  {/*  id="datetime-local"*/}
                  {/*  label="Date & Time of moving"*/}
                  {/*  type="datetime-local"*/}
                  {/*  // defaultValue={date}*/}
                  {/*  // className={classes.textField}*/}
                  {/*  fullWidth*/}
                  {/*  onChange={e => setDate(e.target.value)}*/}
                  {/*  InputLabelProps={{*/}
                  {/*    shrink: true,*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      color={'secondary'}
                      id="date-picker-dialog"
                      label="Moving date"
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={newDate => setDate(newDate)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item className={classes.item}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Moving time"
                      value={time}
                      onChange={newTime => setTime(newTime)}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                {/*elevators*/}
                <Grid item container className={classes.item} justify={'space-between'}>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="stairs from">Elevator (from)</InputLabel>
                      <Select
                        labelId="elevator from"
                        id="elevator from"
                        value={elevatorFrom}
                        onChange={(e)=>setElevatorFrom(e.target.value)}
                      >
                        <MenuItem value={'no'}>No</MenuItem>
                        <MenuItem value={'yes'}>Yes</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="stairs to">Elevator (to)</InputLabel>
                      <Select
                        labelId="elevator to"
                        id="elevator to"
                        value={elevatorTo}
                        onChange={(e) => setElevatorTo(e.target.value)}
                      >
                        <MenuItem value={'no'}>No</MenuItem>
                        <MenuItem value={'yes'}>Yes</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                {/*stairs*/}
                <Grid item container className={classes.item} justify={'space-between'}>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="stairs from">Stairs (from)</InputLabel>
                      <Select
                        labelId="stairs from"
                        id="stairs from"
                        value={stairsFrom}
                        onChange={(e) => setStairsFrom(e.target.value)}
                      >
                        <MenuItem value={'No'}>No</MenuItem>
                        <MenuItem value={'1flight'}>1 flight</MenuItem>
                        <MenuItem value={'2flight'}>2 flight</MenuItem>
                        <MenuItem value={'3flight'}>3 flight</MenuItem>
                        <MenuItem value={'other'}>other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="stairs to">Stairs (to)</InputLabel>
                      <Select
                        labelId="stairs to"
                        id="stairs to"
                        value={stairsTo}
                        onChange={(e) => setStairsTo(e.target.value)}
                      >
                        <MenuItem value={'No'}>No</MenuItem>
                        <MenuItem value={'1flight'}>1 flight</MenuItem>
                        <MenuItem value={'2flight'}>2 flight</MenuItem>
                        <MenuItem value={'3flight'}>3 flight</MenuItem>
                        <MenuItem value={'other'}>other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                {/*parking*/}
                <Grid item container className={classes.item} justify={'space-between'}>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="parking from">Parking (from)</InputLabel>
                      <Select
                        labelId="parking from"
                        id="parking from"
                        value={parkingFrom}
                        onChange={(e) => setParkingFrom(e.target.value)}
                      >
                        <MenuItem value={'street parking'}>street parking</MenuItem>
                        <MenuItem value={'garage'}>garage</MenuItem>
                        <MenuItem value={'loading dock'}>loading dock</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item style={{width: '48%'}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="parking to">Parking (to)</InputLabel>
                      <Select
                        labelId="parking to"
                        id="parking to"
                        value={parkingTo}
                        onChange={(e) => setParkingTo(e.target.value)}
                      >
                        <MenuItem value={'street parking'}>street parking</MenuItem>
                        <MenuItem value={'garage'}>garage</MenuItem>
                        <MenuItem value={'loading dock'}>loading dock</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                {/*items*/}
                <Grid item className={classes.item} style={{marginTop:20}}>
                  <TextField
                    variant="outlined"
                    label={'Inventory list'}
                    id={'Inventory list'}
                    value={items}
                    onChange={(e) => setItems(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                  />
                </Grid>
                {/*notes*/}
                <Grid item className={classes.item} style={{marginTop:20}}>
                  <TextField
                    variant="outlined"
                    label={'Notes'}
                    id={'Notes'}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.item} style={{marginTop:20}}>
                  {/*<DropzoneArea //https://yuvaleros.github.io/material-ui-dropzone/*/}
                  {/*  acceptedFiles={['image/*']}*/}
                  {/*  dropzoneText={"drop an image (max 3)"}*/}
                  {/*  onChange={(files) => onChangeDropzone(files)}*/}
                  {/*  filesLimit={3}*/}
                  {/*  maxFileSize={5000000}*/}
                  {/*/>*/}
                  <p style={{marginBottom: '20px'}}>Photos (optional):</p>
                  <input type="file" id="imageInput1" name="image1" onChange={handleUploadFile} accept=".jpg, .jpeg, .png" style={{marginBottom: '20px'}}/>
                  <input type="file" id="imageInput2" name="image2" onChange={handleUploadFile} accept=".jpg, .jpeg, .png" style={{marginBottom: '20px'}} />
                  <input type="file" id="imageInput3" name="image3" onChange={handleUploadFile} accept=".jpg, .jpeg, .png" style={{marginBottom: '20px'}}/>
                  <Grid container justify={'center'}>
                    {imageUrl1 !=='' && <img src={imageUrl1} alt={'preview pic 1'} style={{width:'30%'}}/>}
                    {imageUrl2 !=='' && <img src={imageUrl2} alt={'preview pic 2'} style={{width:'30%'}}/>}
                    {imageUrl3 !=='' && <img src={imageUrl3} alt={'preview pic 3'} style={{width:'30%'}}/>}
                  </Grid>
                  <progress value={progress} max={'100'} style={{width:'100%'}}/>
                  {/*<Button variant={'contained'} onClick={handleUploadFile} disabled >upload pics</Button>*/}
                </Grid>
              </Grid>
              <Grid item container justify={'space-around'} style={{marginTop: '2em'}}>
                <Button
                  variant={'contained'}
                  className={classes.sendButton}
                  disabled={//кнопка не рабочая если true эти условия
                    phone.length === 0
                    // email.length === 0 ||
                    // name.length === 0 ||
                    // message.length === 0 ||
                    // phoneHelper.length !== 0 ||
                    // emailHelper.length !== 0
                  }
                  onClick={onConfirm}
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
