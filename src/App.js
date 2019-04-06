import React, { Component } from 'react';
import { DropdownButton, Dropdown, MenuItem, Button } from 'react-bootstrap';
import * as wallet from 'rai-wallet';
import domtoimage from 'dom-to-image';
import QrImage from './paperWallet/qrImage.js';

import logo from './nanoLogo.svg';
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
  }

  componentDidMount() {
    this.generateNewWallet(null, false);
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
    } catch (error) {
      this.setState({
        seed: seed,
        account: ''
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
      width: 1000,
      height: 373,
      style: {
        'transform': 'translate('+-((width-1000)/2)+'px, 0)',
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
        'transform': 'translate('+-((width-800)/2)+'px, 0)',
        'transform-origin': 'top left'
      }
    }).then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'nanogift.png';
        link.href = dataUrl;
        link.click();
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

  render() {
    return (
      <div className="App">
        <header className="App-header noprint">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Nano Gift
          </h1>
        </header>

        <div className="noprint">
          <Button bsStyle="primary" onClick={this.collapse} className="first-btn">How to use</Button>
          <div className="collapse-content">
              <strong>The seed is not stored but for increased security you can download <a href="https://github.com/Joohansson/nano-giftcard/raw/master/nano-paper-wallet.zip">this zip</a>, disconnect your internet connection, extract the zip and open index.html in an safe OS environment. <br /></strong>
              <br />
              <ol>
                  <li>Press "Generate new Seed"</li>
                  <li>Send funds to the displayed address with any <a href="https://nanolinks.info/#wallets">Nano Wallet</a> or scan the QR</li>
                  <li>Optional: Provide a name and message for the recipient and choose a theme</li>
                  <li>Print or Download. Scale print for smaller card. Printing may not work in some browsers. </li>
                  <li>If making a small card, make sure QR are readable before giving it away!</li>
                  <li>Check the account status: Transaction arrived and unpocketed and later redeemed with 0 balance left</li>
              </ol>
            <br />
          </div>

          <Button onClick={this.generateNewWallet} bsStyle="primary">Generate new Seed</Button>
          <div>
            <p className="App-address">
              <strong>Send Funds:</strong> <a href={"xrb:" + this.state.account}>{this.state.account}</a><br />
            </p>
            <QrImage className="addressQr"content={"xrb:" + this.state.account} />
            <p>
              <strong>Check Account Status:</strong> <a href={"https://nanocrawler.cc/explorer/account/" + this.state.account} target="_blank">NanoCrawler</a> or <a href={"https://www.nanode.co/account/" + this.state.account} target="_blank">Nanode</a>
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
            <input type="text" name="card-name" id="card-name" placeholder="Optional name" maxlength="33" onInput={this.setName}/>
            <input type="text" name="card-msg" id="card-msg" placeholder="Optional message" maxlength="96" onInput={this.setMsg}/>
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
          <a href="https://github.com/Joohansson/nano-giftcard">Github</a> | <a href="https://nano.org">Nano Home</a> | <a href="https://nanolinks.info">Nano Guide</a> | <a href="xrb:nano_1gur37mt5cawjg5844bmpg8upo4hbgnbbuwcerdobqoeny4ewoqshowfakfo">Donate a Cookie 🍪</a>
        </footer>
      </div>
    );
  }
}

export default App;
