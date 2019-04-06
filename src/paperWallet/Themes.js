'use strict';
import light from './bg/background1.png';
import dark from './bg/background2.png';
import paperlight from './bg/background3.png';
import paperdark from './bg/background4.png';

export default [
    {name: 'Light Gift Card',
      textstyle1: {color: '#4a90e2'},
      textstyle2: {color: '#4a90e2'},
      textstyle3: {color: '#4a90e2'},
      textstyle4: {display: 'none'},
      guide: {color: '#000034'},
      pubTxt: {display: 'none'},
      privTxt: {color: '#000034'},
      natriumTxt: {color: '#000034'},
      background: light, pubDisplay: {display: 'none'}
    },
    
    {name: 'Dark Gift Card',
      textstyle1: {color: '#FFFFFF'},
      textstyle2: {color: '#FFFFFF'},
      textstyle3: {color: '#FFFFFF', bottom: '4px'},
      textstyle4: {display: 'none'},
      guide: {color: '#FFFFFF', bottom: '17px'},
      pubTxt: {display: 'none'},
      privTxt: {color: '#FFFFFF'},
      natriumTxt: {color: '#FFFFFF'},
      background: dark, pubDisplay: {display: 'none'}
    },
    
    {name: 'Light Paper Wallet', background: paperlight, pubDisplay: {display: 'block'},
      textstyle1: {color: '#000034', top: '148px'},
      textstyle2: {color: '#000034', top: '183px'},
      textstyle3: {color: '#000034', bottom: '20px', 'font-size': '16px'},
      textstyle4: {color: '#000034', bottom: '50px', 'font-size': '16px', display: 'block'},
      pubTxt: {color: '#000034', display: 'block'},
      privTxt: {color: '#000034'},
      natriumTxt: {display: 'none'},
      guide: {display: 'none'}
    },
    
    {name: 'Dark Paper Wallet', background: paperdark, pubDisplay: {display: 'block'},
      textstyle1: {color: '#FFFFFF', top: '148px'},
      textstyle2: {color: '#FFFFFF', top: '183px'},
      textstyle3: {color: '#FFFFFF', bottom: '20px', 'font-size': '16px'},
      textstyle4: {color: '#FFFFFF', bottom: '50px', 'font-size': '16px', display: 'block'},
      pubTxt: {color: '#FFFFFF', display: 'block'},
      privTxt: {color: '#FFFFFF'},
      natriumTxt: {display: 'none'},
      guide: {display: 'none'}
    },
];
