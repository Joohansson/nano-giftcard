import React, { Component } from 'react';
import { DropdownButton, Dropdown, MenuItem, Button } from 'react-bootstrap';
import * as wallet from 'rai-wallet';
import domtoimage from 'dom-to-image';
import QrImage from './paperWallet/qrImage.js';
import { saveAs } from 'file-saver';
import $ from 'jquery';
import { Base64 } from 'js-base64';

import logo from './img/logo.png';
import donation from './img/donation.png';
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
      msg: '',
      activeThemeId: 0,
      nameMax: 28,
      msgMax: 80,
      donationPath: donation
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.print = this.print.bind(this);
    this.showShareModal = this.showShareModal.bind(this);
    this.showDonateModal = this.showDonateModal.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
    this.handleSeedChange = this.handleSeedChange.bind(this);
    this.generateNewWallet = this.generateNewWallet.bind(this);
    this.setName = this.setName.bind(this);
    this.setMsg = this.setMsg.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.getUrlParams = this.getUrlParams.bind(this);
    this.sanitize = this.sanitize.bind(this);
  }

  componentDidMount() {
    var parameter = this.getUrlParams(window.location.href).gift;
    if (typeof parameter !== 'undefined') {
      try {
        this.readParameters(Base64.decode(parameter));
      }
      catch (error) {
        console.log("Could not base64 decode URI");
      }
    }
    else {
      this.generateNewWallet(null, false);
    }
    
    /* Define share link modal jquery function */
    $.fn.psendmodal = function() {
      var modal_structure = '<div class="modal_overlay"></div>'+
                  '<div class="modal_psend">'+
                    '<div class="modal_title">'+
                      '<span>&nbsp;</span>'+
                      '<a href="#" class="modal_close">&times;</a>'+
                    '</div>'+
                    '<div class="modal_content"></div>'+
                  '</div>';

      $('body').append(modal_structure);
      show_modal();

      function show_modal() {
        $('.modal_overlay').stop(true, true).fadeIn();
        $('.modal_psend').stop(true, true).fadeIn();
      }

      window.remove_modal = function() {
        $('.modal_overlay').stop(true, true).fadeOut(500, function() { $(this).remove(); });
        $('.modal_psend').stop(true, true).fadeOut(500, function() { $(this).remove(); });
        return false;
      }

      $(".modal_close").click(function(e) {
        e.preventDefault();
        window.remove_modal();
      });

      $(".modal_overlay").click(function(e) {
        e.preventDefault();
        window.remove_modal();
      });
      
      $(document).keyup(function(e) {
        if (e.keyCode === 27) { // Esc
          window.remove_modal();
        }
      });
    };
  }
  
  readParameters(parameters) {
    var readOnly = 0;
    // check if seed was found in the url (url?seed=xxx)
    var seed = this.getUrlParams(parameters).seed;
    if (typeof seed !== 'undefined') {
      this.generateNewWallet(null, seed);
      readOnly += 1;
    }
    
    // check if theme was found in the url (url?theme=0)
    var themeId = this.getUrlParams(parameters).theme;
    if (typeof themeId !== 'undefined') {
      this.selectTheme(themeId, null);
      readOnly += 1;
    }
    
    // check if name was found in the url (url?name=Bill)
    var name = this.getUrlParams(parameters).name;
    if (typeof name !== 'undefined') {
      name = name.substring(0, this.state.nameMax); //trim to max length
      this.setState({ name: name });
      var nameText = document.getElementById('card-name');
      nameText.value = name;
      readOnly += 1;
    }
    
    // check if message was found in the url (url?msg=Hello)
    var msg = this.getUrlParams(parameters).msg;
    if (typeof msg !== 'undefined') {
      msg = msg.substring(0, this.state.msgMax); //trim to max length
      this.setState({ msg: msg });
      var msgText = document.getElementById('card-msg');
      msgText.value = msg;
      readOnly += 1;
    }
    
    // Full share link detected, hide everything not the card
    if (readOnly === 4) {
      var hideEl = document.getElementsByClassName("remove")
      for(var i = 0; i < hideEl.length; i++) {
        hideEl[i].style.display = "none";
      }
      document.getElementsByClassName("nano-paper-wallet")[0].style.marginTop = "50px";
      document.getElementsByClassName("home-btn")[0].style.display = "block";
    }
  }
  
  /* Show popup with share link */
  showShareModal() {
    $(document).psendmodal();
    var link_base = window.location.origin;
    var link_params = '?gift=' + Base64.encode('?seed=' + this.state.seed + '&theme=' + this.state.activeThemeId + '&name=' + encodeURI(this.state.name.replace('?','').replace('&','').replace('=','')) + '&msg=' + encodeURI(this.state.msg.replace('?','').replace('&','').replace('=','')));
    var note_text = 'Share above link by any preferred method and the recipient will be able to view the Nano Gift directly. Seed is included and never stored on the web server.';

    var content =  '<div class="public_link_modal">'+
              '<strong>Click to select and copy</strong>'+
              '<div class="form-group">'+
                '<textarea id="shareArea" class="input-large public_link_copy form-control" rows="3" readonly>' + link_base + link_params + '</textarea>'+
              '</div>'+
              '<div class="copied">Succesfully copied to clipboard</div>'+
              '<div class="copied_not">Content could not be copied to clipboard</div>'+
              '<span class="note">' + note_text + '</span>'+
            '</div>';
    var title 	= 'SHARE URL';
    $('.modal_title span').html(title);
    $('.modal_content').html(content);
    
    /* Auto select text */
    var textBox = document.getElementById("shareArea");
    textBox.onfocus = function() {
      textBox.select();
      
      if (document.execCommand("copy")) {
        /* Inform user about copy */
        document.getElementsByClassName("copied")[0].style.display = "block";
      }
      else {
        document.getElementsByClassName("copied_not")[0].style.display = "block";
      }
      
      // Work around Chrome's little problem
      textBox.onmouseup = function() {
          // Prevent further mouseup intervention
          textBox.onmouseup = null;
          return false;
      };
    };
  }
  
  /* Show donate modal */
  showDonateModal() {
    $(document).psendmodal();
    var account = 'nano_1gur37mt5cawjg5844bmpg8upo4hbgnbbuwcerdobqoeny4ewoqshowfakfo';

    var content =  '<div class="public_link_modal">'+
              '<strong>Scan the QR, use a '+'<a href="xrb:nano_1gur37mt5cawjg5844bmpg8upo4hbgnbbuwcerdobqoeny4ewoqshowfakfo">'+'Deep Link</a>'+' or<br/>Click the donation address to to copy'+'</strong>'+'<br/>'+
              '<img class="donation-qr" id="donation" src="#" alt="QR Image"/>'+
              '<div class="form-group">'+
                '<textarea id="shareArea" class="input-large public_link_copy form-control" rows="2" readonly>' + account + '</textarea>'+
              '</div>'+
              '<div class="copied">Succesfully copied to clipboard</div>'+
              '<div class="copied_not">Content could not be copied to clipboard</div>'+
            '</div>';
    var title 	= 'DONATE';
    $('.modal_title span').html(title);
    $('.modal_content').html(content);
    document.getElementById("donation").src = this.state.donationPath;
    
    /* Auto select text */
    var textBox = document.getElementById("shareArea");
    textBox.onfocus = function() {
      textBox.select();
      
      if (document.execCommand("copy")) {
        /* Inform user about copy */
        document.getElementsByClassName("copied")[0].style.display = "block";
      }
      else {
        document.getElementsByClassName("copied_not")[0].style.display = "block";
      }
      
      // Work around Chrome's little problem
      textBox.onmouseup = function() {
          // Prevent further mouseup intervention
          textBox.onmouseup = null;
          return false;
      };
    };
    return false;
  }
  
  selectTheme(eventKey, event) {
    this.setState({ activeThemeId: eventKey });
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
      //window.history.pushState({}, null, '/?seed=' + wallet.getSeed());
    }
    catch (error) {
      this.setState({
        seed: 'Invalid Seed',
        account: 'Invalid Account'
      });
    }
    
    //update account text
    document.getElementById("addrCopied").innerHTML = "click QR to copy";
    document.getElementById("addrCopied").style.color = "#000000";
  }
  
  /* Update card name */
  setName(event, input="") {
    if (event != null) {
      input = event.target.value
    }
    this.setState({
        name: input
    });
  }
  
  /* Update card message */
  setMsg(event, input="") {
    if (event != null) {
      input = event.target.value
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
      width: 1600,
      height: 746,
      style: {
        'transform': 'scale(2)',
        'transform-origin': (width-799)+'px 0'
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
      width: 1600,
      height: 746,
      style: {
        'transform': 'scale(2)',
        'transform-origin': (width-799)+'px 0'
      }
    }).then(function (dataUrl) {
        //var link = document.createElement('a');
        //link.download = 'nanogift.png';
        //link.href = dataUrl;
        //link.click();
        /* Filesaver has better cross browser support */
        var FileSaver = require('file-saver');
        FileSaver.saveAs(dataUrl, "nanogift.png");
      })
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
    if (document.execCommand('copy')) {                   // Copy - only works as a result of a user action (e.g. click events)
      document.getElementById("addrCopied").innerHTML = "copied!";
      document.getElementById("addrCopied").style.color = "#6fec75";
    }
    else {
      document.getElementById("addrCopied").innerHTML = "not copied";
      document.getElementById("addrCopied").style.color = "#ec6f6f";
    }
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
      document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
      document.getSelection().addRange(selected);   // Restore the original selection
    }
  };
  
  sanitize(str) {
    str = str.replace(/[^a-z0-9·ÈÌÛ˙Ò¸Â‰ˆ .,_-]/gim,"");
    return str.trim();
  }
  
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
        paramValue = decodeURI(paramValue);
        //paramValue = this.sanitize(paramValue);  //sanitizer
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
  
  // refresh page without any extra path
  goHome() {
    window.location.href = window.location.origin;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header noprint">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <div className="noprint remove">
          <Button bsStyle="primary" onClick={this.collapse} className="first-btn">How to use</Button>
          <div className="collapse-content">
              <strong>The seed is not stored but for increased security you can download <a href="https://github.com/Joohansson/nano-giftcard/raw/master/nano-paper-wallet.zip">this zip</a>, disconnect your internet connection, extract the zip and open index.html in an safe OS environment. <br /></strong>
              <br />
              <ol>
                  <li>Press "Generate new Seed".</li>
                  <li>Send funds to the displayed address with any <a href="https://nanolinks.info/#wallets">Nano Wallet</a>. Scan QR, click QR to copy or click the deep link.</li>
                  <li>Optional: Provide a name and message for the recipient and choose a theme.</li>
                  <li>Print, Download or Share. Print screen for higher quality or if other methods does not work.</li>
                  <li>If making a small card, make sure QR are readable before giving it away!</li>
                  <li>Check the account status: Transaction arrived and unpocketed and later redeemed with 0 balance left.</li>
              </ol>
            <br />
          </div>

          <Button onClick={this.generateNewWallet} bsStyle="primary">Generate new Seed</Button>
          <div>
            <p className="App-address">
              <strong>Account (<span id="addrCopied">click QR to copy</span>): <a href={"xrb:" + this.state.account}>{this.state.account}</a><br /></strong>
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
            <input type="text" name="card-name" id="card-name" placeholder="Optional name" maxLength={this.state.nameMax} onInput={this.setName}/>
            <input type="text" name="card-msg" id="card-msg" placeholder="Optional message" maxLength={this.state.msgMax} onInput={this.setMsg}/>
          </div>
        </div>   
        
        <div className="nano-paper-wallet noprint">
          <PaperWallet theme={this.state.activeTheme} seed={this.state.seed} account={this.state.account} name={this.state.name} msg={this.state.msg}/>
        </div>
        <img className="nano-paper-wallet-img hidden print" src={this.state.paperWalletImageData} alt="paper wallet" />
        
        <div className="noprint print-group remove">
          <Button onClick={this.print} bsStyle="primary" className="print-btn">Print</Button>
          <Button onClick={this.download} bsStyle="primary" className="download-btn">Download</Button>
          <Button onClick={this.showShareModal} bsStyle="primary" className="share-btn">Share</Button>
        </div>
        
        <div className="noprint print-group">
          <Button onClick={this.goHome} bsStyle="primary" className="home-btn">Create Your Own Nano Gift</Button>
        </div>
        
        <div className="extra"></div>

        <footer className="App-footer noprint">
          <a href="https://github.com/Joohansson/nanogift">Github</a> | <a href="https://nano.org">Nano Home</a> | <a href="https://nanolinks.info">Nano Guide</a> | <a href="javascript:void(0);" onClick={this.showDonateModal}>Donate me a Cookie <span role="img" aria-label="cookie">üç™</span></a>
        </footer>
      </div>
    );
  }
}

export default App;
