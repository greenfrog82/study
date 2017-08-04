import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';
import QRCode from 'qrcode.react';

const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);
//ReactDOM.render(<QRCode value="otpauth://totp/qr%20test:aaa%40cdnetworks.com?secret=base32secret3232&issuer=qr%20test" />, rootElement);
// ReactDOM.render(<QRCode value="otpauth://totp/jaeyoung:jaeyoung.cho%40cdnetworks.com?secret=base32secret3232&issuer=jaeyoung" />, rootElement);
// ReactDOM.render(<QRCode value="otpauth://totp/aurora:jaeyoung.cho%40cdnetworks.com?secret=base32secret3232&issuer=aurora" />, rootElement);
ReactDOM.render(<QRCode value="otpauth://totp/aurora:1%40cdnetworks.com?secret=JBSWY3DPEHPK3PXP&issuer=aurora" />, rootElement);
