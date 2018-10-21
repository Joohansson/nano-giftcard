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
      this.setState({
        seed: wallet.getSeed(),
        account: wallet.getAccounts().pop()['account']
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

  render() {
    return (
      <div className="App">
        <header className="App-header noprint">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            NANO Giftcard
          </h1>
        </header>

        <div className="noprint">

        <Alert>
          This tool lets you generate giftcards for <a href="https://nano.org/">NANO.</a> <br />How to use:<br />1. Generate a wallet.<br />2. Send funds to the displayed address.<br />3. Print the giftcard out.<br /><br />
          <a href="https://github.com/jiikuy/nano-paper-wallet/raw/master/nano-paper-wallet.zip">download zip of this website here</a> - disconnect your internet connection, extract the zip and open index.html in an safe OS environment. <br />
        </Alert>

        <Button onClick={this.generateNewWallet} bsStyle="primary">Generate new Giftcard</Button>
        <div><p className="App-address">Address: <br />{this.state.account}</p><QrImage className="addressQr"content={"xrb:" + this.state.account} /></div>
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
        <Button onClick={this.print} bsStyle="primary">Print</Button>

        </div>
          <div className="nano-paper-wallet noprint">
            <PaperWallet theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} />
          </div>
        <img className="nano-paper-wallet-img hidden print" src={this.state.paperWalletImageData} />

        <footer className="App-footer noprint">
        <a href="https://github.com/jiikuy/nano-paper-wallet.git">Github</a> | Buy me a coffee ☕️ <strong>xrb_1jw6id9wp9fhjyix9hmqjc8sgd7n6sq8xp38wh11497m5crxew9wq1zngw13</strong>
        </footer>
      </div>
    );
  }
}

export default App;
