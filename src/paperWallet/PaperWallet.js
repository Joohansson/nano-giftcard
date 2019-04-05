
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
      var bgStyle={backgroundImage: 'url(' + this.props.theme.background + ')'};
      return (
      <div className="paper-wallet" style={bgStyle}>
          <QrImage className="paper-wallet--pvt-seed-qr paper-wallet--qr" content={this.props.seed} />
          <p className="paper-wallet--name" style={this.props.theme.textstyle}>
            {this.props.name}
          </p>
          <p className="paper-wallet--msg" style={this.props.theme.textstyle}>
            {this.props.msg}
          </p>
      </div>
      );
    }
  }
