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
      textstyle3: {color: '#4a90e2'},
      textstyle4: {display: 'none'},
      guide: {color: '#000034'},
      pubTxt: {display: 'none'},
      privTxt: {color: '#000034'},
      natriumIosTxt: {color: '#000034'},
      natriumAndroidTxt: {color: '#000034'},
      background: light, pubDisplay: {display: 'none'}, iosText: "Natrium iOS",
      guideText: '<strong>HOW TO REDEEM</strong>'+'<br/>'+
          '&#171;  Install Natrium mobile wallet  &#187;'+'<br/>'+
          'Create a wallet or use existing. DO NOT import this seed.<br/>'+
          'Go to settings &#187; Load from Paper Wallet<br/>'+
          '<br/>'+
          'Or use any compatible wallet found at nano.org<br/>'+
          '<br/>'+
          '<strong>'+'If you got the seed from someone else, do not use it again'+'</strong>'
    },
    
    {name: 'Dark Gift Card',
      textstyle1: {color: '#FFFFFF'},
      textstyle2: {color: '#FFFFFF'},
      textstyle3: {color: '#FFFFFF', bottom: '4px'},
      textstyle4: {display: 'none'},
      guide: {color: '#FFFFFF', bottom: '17px'},
      pubTxt: {display: 'none'},
      privTxt: {color: '#FFFFFF'},
      natriumIosTxt: {color: '#FFFFFF'},
      natriumAndroidTxt: {color: '#FFFFFF'},
      background: dark, pubDisplay: {display: 'none'}, iosText: "Natrium iOS",
      guideText: '<strong>HOW TO REDEEM</strong>'+'<br/>'+
          '&#171;  Install Natrium mobile wallet  &#187;'+'<br/>'+
          'Create a wallet or use existing. DO NOT import this seed.<br/>'+
          'Go to settings &#187; Load from Paper Wallet<br/>'+
          '<br/>'+
          'Or use any compatible wallet found at nano.org<br/>'+
          '<br/>'+
          '<strong>'+'If you got the seed from someone else, do not use it again'+'</strong>'
    },
    
    {name: 'Light Plain Card',
      textstyle1: {color: '#4a90e2'},
      textstyle2: {color: '#4a90e2'},
      textstyle3: {color: '#4a90e2'},
      textstyle4: {display: 'none'},
      guide: {color: '#000034'},
      pubTxt: {display: 'none'},
      privTxt: {color: '#000034'},
      natriumIosTxt: {color: '#000034'},
      natriumAndroidTxt: {color: '#000034', display: "none"},
      background: plainlight, pubDisplay: {display: 'none'}, iosText: "Compatible Wallets",
      guideText: '<strong>HOW TO REDEEM</strong>'+'<br/>'+
          '&#171;  Use any compatible wallet'+'<br/>'+
          'Import the private seed and transfer the funds to your own wallet  &#187;<br/>'+
          '<br/>'+
          '<strong>'+'If you got the seed from someone else, do not use it again'+'</strong>'
    },
    
    {name: 'Dark Plain Card',
      textstyle1: {color: '#FFFFFF'},
      textstyle2: {color: '#FFFFFF'},
      textstyle3: {color: '#FFFFFF'},
      textstyle4: {display: 'none'},
      guide: {color: '#FFFFFF'},
      pubTxt: {display: 'none'},
      privTxt: {color: '#FFFFFF'},
      natriumIosTxt: {color: '#FFFFFF'},
      natriumAndroidTxt: {color: '#FFFFFF', display: "none"},
      background: plaindark, pubDisplay: {display: 'none'}, iosText: "Compatible Wallets",
      guideText: '<strong>HOW TO REDEEM</strong>'+'<br/>'+
          '&#171;  Use any compatible wallet'+'<br/>'+
          'Import the private seed and transfer the funds to your own wallet  &#187;<br/>'+
          '<br/>'+
          '<strong>'+'If you got the seed from someone else, do not use it again'+'</strong>'
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
      guide: {display: 'none'}
    },
];
