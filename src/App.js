import React, { Component } from 'react';
import { DropdownButton, Dropdown, MenuItem, Button } from 'react-bootstrap';
import * as wallet from 'rai-wallet';
import domtoimage from 'dom-to-image';
import QrImage from './paperWallet/qrImage.js';
import { saveAs } from 'file-saver';

import logo from './logo.png';
import './App.css';
import './print.css';
import { PaperWallet, Themes } from './paperWallet';

import { Wallet } from 'rai-wallet';

class App extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      seed: '',
      account: '',
      activeTheme: Themes[0],
      paperWalletImageData: '',
      name: '',
      msg: ''
    };

    this.print = this.print.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
    this.handleSeedChange = this.handleSeedChange.bind(this);
    this.generateNewWallet = this.generateNewWallet.bind(this);
    this.setName = this.setName.bind(this);
    this.setMsg = this.setMsg.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  componentDidMount() {
    // check if seed was found in the url (url?seed=xxx)
    var seed = this.getUrlParams(window.location.href).seed;
    if (typeof seed != 'undefined') {
      this.generateNewWallet(null, seed);
    }
    else {
      this.generateNewWallet(null, false);
    }
  }

  selectTheme(eventKey, event) {
    this.setState({ activeTheme: Themes[eventKey] });
  }

  /* Generate wallet account and seed, update QR */
  generateNewWallet(event, seed=false) {
    try {
      const wallet = new Wallet();
      wallet.createWallet(seed);
      var account = wallet.getAccounts().pop()['account']
      //replace xrb_ with nano_
      account = account.replace("xrb","nano");
      this.setState({
        seed: wallet.getSeed(),
        account: account
      });
      
      // update the url bar (to allow sharing the card)
      window.history.pushState({}, null, '/?seed=' + wallet.getSeed());
    } catch (error) {
      this.setState({
        seed: 'Invalid Seed',
        account: 'Invalid Account'
      });
    }
  }
  
  /* Update card name */
  setName(event, input="") {
    if (event != null) {
      var input = event.target.value
    }
    this.setState({
        name: input
    });
  }
  
  /* Update card message */
  setMsg(event, input="") {
    if (event != null) {
      var input = event.target.value
    }
    this.setState({
        msg: input
    });
  }

  /* Update seed (not used) */
  handleSeedChange(event) {
    this.generateNewWallet(event, event.target.value);
  }

  /* Print card */
  print(event) {
    var node = document.getElementsByClassName('nano-paper-wallet')[0];
    var width =  document.body.clientWidth;
    domtoimage.toPng(node, {
      width: 800,
      height: 373,
      style: {
        'transform': 'translate('+-((width-800)/2)+'px, 0)',
        'transform-origin': 'top left'
      }
    }).then(function (dataUrl) {
          var sprite = new Image();
          sprite.onload = function () {
            this.setState({ paperWalletImageData: dataUrl });
            window.print();
          }.bind(this);
          sprite.src = dataUrl;
      }.bind(this))
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
  }

  /* Download card */
  download(event) {
    var node = document.getElementsByClassName('nano-paper-wallet')[0];
    var width =  document.body.clientWidth;
    domtoimage.toPng(node, {
      width: 800,
      height: 373,
      style: {
        transform: 'translate('+-((width-800)/2)+'px, 0)'
      }
    }).then(function (dataUrl) {
        //var link = document.createElement('a');
        //link.download = 'nanogift.png';
        //link.href = dataUrl;
        //link.click();
        /* Filesaver has better cross browser support */
        var FileSaver = require('file-saver');
        FileSaver.saveAs(dataUrl, "nanogift.png");
      }.bind(this))
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
  }
  
  /* Show/hide how to section */
  collapse() {
    var content = document.getElementsByClassName("collapse-content")[0];
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
  
  /** Copy account address to clipboard */
  copyToClipboard(event) {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = this.state.account;                  // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =            
      document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
      document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
      document.getSelection().addRange(selected);   // Restore the original selection
    }
  };
  
  getUrlParams(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
      // split our query string into its component parts
      var arr = queryString.split('&');
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
    return obj;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header noprint">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <div className="noprint">
          <Button bsStyle="primary" onClick={this.collapse} className="first-btn">How to use</Button>
          <div className="collapse-content">
              <strong>The seed is not stored but for increased security you can download <a href="https://github.com/Joohansson/nano-giftcard/raw/master/nano-paper-wallet.zip">this zip</a>, disconnect your internet connection, extract the zip and open index.html in an safe OS environment. <br /></strong>
              <br />
              <ol>
                  <li>Press "Generate new Seed".</li>
                  <li>Send funds to the displayed address with any <a href="https://nanolinks.info/#wallets">Nano Wallet</a>. Scan QR, click QR to copy or click the deep link.</li>
                  <li>Optional: Provide a name and message for the recipient and choose a theme.</li>
                  <li>Print, download or share the URL. Print screen for higher quality or if other methods does not work.</li>
                  <li>If making a small card, make sure QR are readable before giving it away!</li>
                  <li>Check the account status: Transaction arrived and unpocketed and later redeemed with 0 balance left.</li>
              </ol>
            <br />
          </div>

          <Button onClick={this.generateNewWallet} bsStyle="primary">Generate new Seed</Button>
          <div>
            <p className="App-address">
              <strong>Account (click QR to copy): <a href={"xrb:" + this.state.account}>{this.state.account}</a><br /></strong>
            </p>
            <QrImage className="addressQr" content={"xrb:" + this.state.account} onClick={this.copyToClipboard} />
            <p>
              <strong>Check Account Status: <a href={"https://nanocrawler.cc/explorer/account/" + this.state.account} target="_blank">NanoCrawler</a> or <a href={"https://www.nanode.co/account/" + this.state.account} target="_blank">Nanode</a></strong>
            </p>
          </div>
          
          <div className="style-group">
            <DropdownButton 
              title={"Theme - " + this.state.activeTheme.name}
              key={this.state.walletTheme}
              id={`dropdown-basic-${this.state.walletTheme}`}>
              {Themes.map(function(theme, index){
                return <MenuItem eventKey={index} key={index} onSelect={this.selectTheme}>{theme.name}</MenuItem>;
              }.bind(this))}
            </DropdownButton>
            {this.state.walletTheme}
            <input type="text" name="card-name" id="card-name" placeholder="Optional name" maxLength="33" onInput={this.setName}/>
            <input type="text" name="card-msg" id="card-msg" placeholder="Optional message" maxLength="96" onInput={this.setMsg}/>
          </div>
        </div>   
        
        <div className="nano-paper-wallet noprint">
          <PaperWallet theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} name={this.state.name} msg={this.state.msg}/>
        </div>
        <img className="nano-paper-wallet-img hidden print" src={this.state.paperWalletImageData} />
        
        <div className="noprint print-group">
          <Button onClick={this.print} bsStyle="primary" className="print-btn">Print</Button>
          <Button onClick={this.download} bsStyle="primary" className="download-btn">Download</Button>
        </div>
        
        <div className="extra"></div>

        <footer className="App-footer noprint">
          <a href="https://github.com/Joohansson/nanogift">Github</a> | <a href="https://nano.org">Nano Home</a> | <a href="https://nanolinks.info">Nano Guide</a> | <a href="xrb:nano_1gur37mt5cawjg5844bmpg8upo4hbgnbbuwcerdobqoeny4ewoqshowfakfo">Donate me a Cookie 🍪</a>
        </footer>
      </div>
    );
  }
}

export default App;
