import light from './bg/background1.png';
import dark from './bg/background2.png';
import paperlight from './bg/background3.png';
import paperdark from './bg/background4.png';
import plainlight from './bg/background5.png';
import plaindark from './bg/background6.png';

export default [
    {name: 'Light Gift Card',
      textstyle1: {color: '#4a90e2'},
      textstyle2: {color: '#4a90e2'},
      textstyle3: {color: '#4a90e2', bottom: '4px'},
      textstyle4: {display: 'none'},
      guide: {color: '#000034', bottom: '17px'},
      pubTxt: {display: 'none'},
      privTxt: {color: '#000034'},
      natriumIosTxt: {color: '#000034'},
      natriumAndroidTxt: {color: '#000034'},
      background: light, pubDisplay: {display: 'none'}, iosText: "Natrium iOS",
      guideText: '<strong>HOW TO REDEEM</strong><br/>'+
          '&#129144;  Install Natrium mobile wallet  &#129146<br/>'+
          '"New Wallet" - Do NOT choose "Import Wallet" with this seed<br/>'+
          'Go to settings &#187; Load from Paper Wallet<br/>'+
          '<br/>'+
          'Or use any compatible wallet found at nano.org<br/>'+
          '<br/>'+
          '<strong>Do not use this seed again after redeeming</strong>'
    },
    
    {name: 'Dark Gift Card',
      textstyle1: {color: '#FFFFFF'},
      textstyle2: {color: '#FFFFFF'},
      textstyle3: {color: '#FFFFFF', bottom: '8px'},
      textstyle4: {display: 'none'},
      guide: {color: '#FFFFFF', bottom: '21px'},
      pubTxt: {display: 'none'},
      privTxt: {color: '#FFFFFF'},
      natriumIosTxt: {color: '#FFFFFF'},
      natriumAndroidTxt: {color: '#FFFFFF'},
      background: dark, pubDisplay: {display: 'none'}, iosText: "Natrium iOS",
      borderStyle: "2px dotted transparent",
      guideText: '<strong>HOW TO REDEEM</strong><br/>'+
          '&#129144;  Install Natrium mobile wallet  &#129146<br/>'+
          '"New Wallet" - Do NOT choose "Import Wallet" with this seed<br/>'+
          'Go to settings &#187; Load from Paper Wallet<br/>'+
          '<br/>'+
          'Or use any compatible wallet found at nano.org<br/>'+
          '<br/>'+
          '<strong>Do not use this seed again after redeeming</strong>'
    },
    
    {name: 'Light Plain Card',
      textstyle1: {color: '#4a90e2'},
      textstyle2: {color: '#4a90e2'},
      textstyle3: {color: '#4a90e2', bottom: '12px'},
      textstyle4: {display: 'none'},
      seedQR: {top: '236px'},
      guide: {color: '#000034', bottom: '25px'},
      pubTxt: {display: 'none'},
      privTxt: {color: '#000034', top: '207px'},
      natriumIosTxt: {color: '#000034'},
      natriumAndroidTxt: {color: '#000034', display: "none"},
      background: plainlight, pubDisplay: {display: 'none'}, iosText: "Nano Wallets",
      guideText: '<strong>HOW TO REDEEM</strong><br/>'+
          '&#129144;  Use any compatible wallet<br/>'+
          'Import the private seed and transfer the funds to your own wallet  &#129146<br/>'+
          '<br/>'+
          '<strong>Do not use this seed again after redeeming</strong>'
    },
    
    {name: 'Dark Plain Card',
      textstyle1: {color: '#FFFFFF'},
      textstyle2: {color: '#FFFFFF'},
      textstyle3: {color: '#FFFFFF', bottom: '16px'},
      textstyle4: {display: 'none'},
      seedQR: {top: '236px'},
      guide: {color: '#FFFFFF', bottom: '29px'},
      pubTxt: {display: 'none'},
      privTxt: {color: '#FFFFFF', top: '207px'},
      natriumIosTxt: {color: '#FFFFFF'},
      natriumAndroidTxt: {color: '#FFFFFF', display: "none"},
      background: plaindark, pubDisplay: {display: 'none'}, iosText: "Nano Wallets",
      borderStyle: "2px dotted transparent",
      guideText: '<strong>HOW TO REDEEM</strong><br/>'+
          '&#129144;  Use any compatible wallet<br/>'+
          'Import the private seed and transfer the funds to your own wallet  &#129146<br/>'+
          '<br/>'+
          '<strong>Do not use this seed again after redeeming</strong>'
    },
    
    {name: 'Light Paper Wallet', background: paperlight, pubDisplay: {display: 'block'},
      textstyle1: {color: '#000034', top: '148px'},
      textstyle2: {color: '#000034', top: '183px'},
      textstyle3: {color: '#000034', bottom: '20px', 'font-size': '15px'},
      textstyle4: {color: '#000034', bottom: '50px', 'font-size': '15px', display: 'block'},
      pubTxt: {color: '#000034', display: 'block'},
      privTxt: {color: '#000034'},
      natriumIosTxt: {display: 'none'},
      natriumAndroidTxt: {display: 'none'},
      guide: {display: 'none'}
    },
    
    {name: 'Dark Paper Wallet', background: paperdark, pubDisplay: {display: 'block'},
      textstyle1: {color: '#FFFFFF', top: '148px'},
      textstyle2: {color: '#FFFFFF', top: '183px'},
      textstyle3: {color: '#FFFFFF', bottom: '20px', 'font-size': '15px'},
      textstyle4: {color: '#FFFFFF', bottom: '50px', 'font-size': '15px', display: 'block'},
      pubTxt: {color: '#FFFFFF', display: 'block'},
      privTxt: {color: '#FFFFFF'},
      natriumIosTxt: {display: 'none'},
      natriumAndroidTxt: {display: 'none'},
      borderStyle: "2px dotted transparent",
      guide: {display: 'none'}
    },
];
