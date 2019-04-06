
import React, { Component } from 'react';
import QrImage from './qrImage.js';
import './style.css';

export default class PaperWallet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            qr: 'NANO',
            color: '#0000ff'
        };
    }

    render() {
      return (
      <div className="paper-wallet" >
        <img className="paper-wallet--bgr-img" src={this.props.theme.background} alt="bgr"/>
        <QrImage className="paper-wallet--pub-addr-qr paper-wallet--qr" content={"xrb:" + this.props.account} style={this.props.theme.pubDisplay}/>
        <QrImage className="paper-wallet--pvt-seed-qr paper-wallet--qr" content={this.props.seed} />
        
        <p className="paper-wallet--name" style={this.props.theme.textstyle1}>
          {this.props.name}
        </p>
        
        <p className="paper-wallet--msg" style={this.props.theme.textstyle2}>
          {this.props.msg}
        </p>
        
        <p className="paper-wallet--seed" style={this.props.theme.textstyle3}>
          {this.props.seed}
        </p>
        
        <p className="paper-wallet--account" style={this.props.theme.textstyle4}>
          {this.props.account}
        </p>
        
        <p className="paper-wallet--guide" style={this.props.theme.guide}>
          <strong>EASY</strong><br/>
          &#171;  Install Natrium mobile wallet  &#187;<br/>
          Go to settings &#187; Load from Paper Wallet<br/>
          <br/>
          <strong>ADVANCED</strong><br/>
          Import the seed into any Nano wallet<br/>
          Transfer the funds to your own seed/account<br/>
          <br/>
          <strong>When the funds are safe in your wallet, never use this seed again</strong>
        </p>
        
        <p className="paper-wallet--pub-addr-txt" style={this.props.theme.pubTxt}>Account Address</p>
        <p className="paper-wallet--pvt-seed-txt" style={this.props.theme.privTxt}>Private Seed</p>
        <p className="paper-wallet--ios-txt" style={this.props.theme.natriumTxt}>Natrium iOS</p>
        <p className="paper-wallet--android-txt" style={this.props.theme.natriumTxt}>Natrium Android</p>
      </div>
      );
    }
  }
