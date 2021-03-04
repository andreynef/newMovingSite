import { createMuiTheme } from '@material-ui/core/styles';

//some my custom variables

const darkGrey = '#696969';
const myGreen = '#008000';
const lightGrey = '#868686';
const fon = '#E9F4FE';
const pink = '#F16FA6';
const blue = '#4f87dc';
const lightBrown = '#F0EBE6';
const lightBlue = '#eff8ff';

const theme = createMuiTheme({
//  my options here. Default theme can be seen there : -> https://material-ui.com/customization/default-theme/#default-theme
  palette: {
    common: {
      darkGrey: darkGrey,
      myGreen: myGreen,
      fon:fon,
      pink: pink,
      blue: blue,
      lightBlue: lightBlue,
    },
    primary :{// хз но генерируются black and light versions тобишь есть primary.dark and primary.light
      main: pink,
    },
    secondary: {// хз но генерируются black and light versions тобишь есть secondary.dark and secondary.light
      main: pink,
    }
  },
  typography: {
    tab: {
      // fontFamily: "Raleway",//установили в html файле link итд
      // textTransform:'none', //отключить toUpperCase
      fontWeight: 700,
      fontSize: '1rem',//если в пикселях то при разном экране размер шрифтов по недосмотру может не сменяться, а так рем связан с глобальным размером что установлено на 14пх.
    },
    estimate: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      color: 'white',
      fontSize: '1.4rem',
      fontWeight: 500,
    },
    h1: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: pink,
      lineHeight: 1.5
    },
    h3: {
      fontFamily: 'Pacifico',
      fontSize: '2.5rem',
      color: pink,
    },
    h4: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '1.75rem',
      color: pink,
    },
    h6: {
      fontFamily: 'Raleway',
      fontWeight: 500,
      color: pink,
      lineHeight: 1
    },
    subtitle1: {
      fontFamily: 'Caveat',
      textTransform: 'none',
      fontSize: '1.4rem',
      fontWeight: 500,
      color: pink,
    },
    subtitle2: {
      fontFamily: 'Pacifico',
      textTransform: 'none',
      fontWeight: 300,
      fontSize: '1.25rem',
      color: 'white',
    },
    body1: {
      fontWeight: 300,
      fontSize: '1rem',
      // color: lightGrey,
    },
    body2: {
      // fontFamily: 'Caveat',
      fontWeight: 300,
      fontSize: '1.25rem',
      // color: blue,
    },
    learnButton: {
      borderColor: pink,
      color: pink,
      borderWidth: 2,
      textTransform: 'none',
      borderRadius: 50,
      fontFamily: 'Roboto',
      fontWeight:'bold',
    }
  },
  overrides: {
    MuiInputLabel: {//спец css для инпутов
      root: {//изменяем дефолт
        color: pink,
        fontSize: '1rem'
      }
    },
    MuiIconButton: {//спец css для инпутов
      root: {//изменяем дефолт
        fill: pink,
      }
    },
    MuiSvgIcon: {//спец css для инпутов
      root: {//изменяем дефолт
        fill: pink,
      }
    },
    MuiInput: {//спец css для инпутов
      root: {//цвет текста
        color: pink,
        fontWeight: 300,
      },
      underline: {
        '&:before': {
          borderBottom: `2px solid ${pink}`//поменять цвет палки
        },
        '&:after': {
          borderBottom: `2px solid ${pink}`//поменять цвет палки
        },
        '&:hover:not($disabled):not($focused):not($error):before': {//поменять цвет палки при ховере но оставить для других состояний
          borderBottom: `2px solid ${pink}`
        }
      }
    },
  }
});

export default theme;

