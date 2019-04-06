'use strict';
import light from './bg/background1.png';
import dark from './bg/background2.png';
import paperlight from './bg/background3.png';
import paperdark from './bg/background4.png';

export default [
    {name: 'Light Gift',
      textstyle1: {color: '#4a90e2'},
      textstyle2: {color: '#4a90e2'},
      textstyle3: {color: '#000034'},
      textstyle4: {display: 'none'},
      background: light, pubDisplay: {display: 'none'}
    },
    
    {name: 'Dark Gift',
      textstyle1: {color: '#FFFFFF'},
      textstyle2: {color: '#FFFFFF'},
      textstyle3: {color: '#FFFFFF'},
      textstyle4: {display: 'none'},
      background: dark, pubDisplay: {display: 'none'}
    },
    
    {name: 'Light Paper', background: paperlight, pubDisplay: {display: 'block'},
      textstyle1: {color: '#000034', top: '148px'},
      textstyle2: {color: '#000034', top: '183px'},
      textstyle3: {color: '#000034', bottom: '20px', 'font-size': '16px'},
      textstyle4: {color: '#000034', bottom: '50px', 'font-size': '16px', display: 'block'}
    },
    
    {name: 'Dark Paper', background: paperdark, pubDisplay: {display: 'block'},
      textstyle1: {color: '#FFFFFF', top: '148px'},
      textstyle2: {color: '#FFFFFF', top: '183px'},
      textstyle3: {color: '#FFFFFF', bottom: '20px', 'font-size': '16px'},
      textstyle4: {color: '#FFFFFF', bottom: '50px', 'font-size': '16px', display: 'block'}
    },
];
