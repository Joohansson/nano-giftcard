import React, { Component } from 'react';
import { DropdownButton, Dropdown, MenuItem, Alert, Button } from 'react-bootstrap';
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
      paperWalletImageData: ''
    };

    this.print = this.print.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
    this.handleSeedChange = this.handleSeedChange.bind(this);
    this.generateNewWallet = this.generateNewWallet.bind(this);
  }

  componentDidMount() {
    this.generateNewWallet(null, false);
  }

  selectTheme(eventKey, event) {
    this.setState({ activeTheme: Themes[eventKey] });
  }

  generateNewWallet(event, seed=false) {
    try {
      const wallet = new Wallet();
      wallet.createWallet(seed);
      var account = wallet.getAccounts().pop()['account']
      //replace xrb_ with nano_
      account = account;
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

  handleSeedChange(event) {
    this.generateNewWallet(event, event.target.value);
  }

  print(event) {
    var node = document.getElementsByClassName('nano-paper-wallet')[0];
    domtoimage.toPng(node)
        .then(function (dataUrl) {
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
                  <li>Send funds to the displayed address with any <a href="https://nanolinks.info/#wallets">Nano Wallet</a></li>
                  <li>Optional: Provide a name and message for the recipient and choose a theme</li>
                  <li>Download or Print the card</li>
                  <li>Check the account status: Transaction arrived and unpocketed and later redeemed</li>
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
              <br />
              <strong>Check Account Status:</strong> <a href={"https://nanocrawler.cc/explorer/account/" + this.state.account} target="_blank">NanoCrawler</a> or <a href={"https://www.nanode.co/account/" + this.state.account} target="_blank">Nanode</a>
            </p>
          </div>
          
          <DropdownButton 
            title={"Theme - " + this.state.activeTheme.name}
            key={this.state.walletTheme}
            id={`dropdown-basic-${this.state.walletTheme}`}
          >
            {Themes.map(function(theme, index){
              return <MenuItem eventKey={index} onSelect={this.selectTheme}>{theme.name}</MenuItem>;
            }.bind(this))}
          </DropdownButton>
          {this.state.walletTheme}
        </div>   
        
        <div className="nano-paper-wallet noprint">
          <PaperWallet theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} />
        </div>
        <img className="nano-paper-wallet-img hidden print" src={this.state.paperWalletImageData} />
        <div className="noprint print-group">
          <Button onClick={this.print} bsStyle="primary" className="print-btn">Print</Button>
          <Button onClick={this.print} bsStyle="primary" className="download-btn">Download</Button>
        </div>

        <footer className="App-footer noprint">
          <a href="https://github.com/Joohansson/nano-giftcard">Github</a> | Buy me a cookie ☕️ <strong>nano_1gur37mt5cawjg5844bmpg8upo4hbgnbbuwcerdobqoeny4ewoqshowfakfo</strong>
        </footer>
      </div>
    );
  }
}

export default App;
