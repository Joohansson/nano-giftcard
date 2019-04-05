import React, { Component } from 'react';
import QRious from 'qrious';

export default class QrImage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          image: null,
      };
    }

    componentWillReceiveProps(nextProps, nextState) {
      if(nextProps.content) {
        var qr = new QRious({value: nextProps.content});
        qr.background = '#ffffff';
        qr.backgroundAlpha = 0;
        qr.foreground = '#000034';
        qr.level = 'M';
        qr.foregroundAlpha = 1;
        qr.size = 112;
        this.setState({image: qr.toDataURL('image/png') });
      } else {
        this.setState({image: null });
      }
    }

    render() {
      return <img { ...this.props }src={this.state.image} />;
    }
  }