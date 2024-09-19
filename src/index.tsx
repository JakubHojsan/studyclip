import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrandVariants, createDarkTheme, createLightTheme, FluentProvider, Theme, themeToTokensObject } from '@fluentui/react-components';

const poopcoloredKevinFav: BrandVariants = { 
  10: "#020403",
  20: "#101C17",
  30: "#162E25",
  40: "#1A3C30",
  50: "#1D4A3B",
  60: "#205846",
  70: "#226751",
  80: "#23765D",
  90: "#258669",
  100: "#259575",
  110: "#25A682",
  120: "#25B68E",
  130: "#24C79B",
  140: "#22D8A9",
  150: "#20E9B6",
  160: "#22FAC4"
};
 
const lightTheme: Theme = {
   ...createLightTheme(poopcoloredKevinFav), 
};
 
const darkTheme: Theme = {
   ...createDarkTheme(poopcoloredKevinFav), 
};
 
 
darkTheme.colorBrandForeground1 = poopcoloredKevinFav[110];
darkTheme.colorBrandForeground2 = poopcoloredKevinFav[120];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <FluentProvider theme={lightTheme}>
      <App />
  </FluentProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
