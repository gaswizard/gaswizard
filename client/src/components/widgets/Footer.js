import React from 'react'


export const Footer = ({scrollTobuynow,scrollToAbout}) => {
  return (
    <>   <section className="contact padding footer" id="contact">
    <div className="container">
      <div className="row">
        <div className="col-md-5 mb-4">
          <img src="img/logo.svg" alt="footer-Logo" className="logo" />
        </div>
        <div className="col-md-2">
          <div className="nav_link">
            <div className="ttu h4">Socials</div>
            <ul className>
              <li className>
                <a className href="https://t.me/GasWizardofficial" target='_blank'>
                  Telegram
                </a>
              </li>
              <li className>
                <a className href="https://twitter.com/Gaswizardio" target='_blank'>
                  {" "}
                  <img src="img/x.png" alt="twitter" />
                </a>
              </li>
              <li className>
                <a className href="https://www.instagram.com/gaswizardio/" target='_blank'>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-5 text-md-right mt-md-0 mt-4 ">
          <ul className="lr_manu mb-md-5 h4">
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://gaswizard.gitbook.io/gas-wizard-whitepaper/"
              >
                Whitepaper
              </a>
            </li>
            <li>
              <a href="/#about-us" onClick={scrollToAbout}>About</a>
            </li>
            {/* <li>
              <a href="#">Audit</a>
            </li>
            <li>
              <a href="#">Legal</a>
            </li> */}
          </ul>
          <a className="btn mr-3" href="/#buy-now" onClick={scrollTobuynow}>
            Buy Now
          </a>
          <a className="btn" href="/buy-crypto">
            How to buy
          </a>
        </div>
      </div>
      <p className="op20 mt-4 mt-md-5">
        Digital currencies may be unregulated in your jurisdiction. The
        value of digital currencies may go down as well as up. Profits
        may be subject to capital gains or other taxes applicable in
        your jurisdiction.
      </p>
      <div className="copyright">
        <div className="row">
          <div className="col-sm-8 text-sm-right terms_link order-sm-2 mb-4 mb-sm-0">
            <a href="/terms-of-use">Terms of Service</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="#">Cookies</a>
          </div>
          <div className="col-sm-4 order-sm-1">
            <p className="op20">
              © 2024 Gas Wizard. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section></>
  )
}
