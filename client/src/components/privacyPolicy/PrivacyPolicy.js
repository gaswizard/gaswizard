import React from "react";
import { Navbar } from "../widgets/Navbar";

export const PrivacyPolicy = () => {
    
  return (
    <>
      <Navbar />
      <div className="overflow-hidden terms_se_bg">
        <div id="scroll-to-top">
          <i className="bi bi-chevron-up fa-fw" />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-10 m-auto">
              <section class=" p70 pn_page_pt ">
                <h1 class="text-center hadding mb-md-5 mb-3">
                  {" "}
                  <span class="t_gr">Privacy Policy</span>{" "}
                </h1>

                <p>
                  This Privacy Policy ("Policy") governs the collection, use,
                  and protection of personal information by Gas Wizard ("we,"
                  "us," or "our") when you visit our website
                  ‘gaswizard.io’. By accessing or using our website, you
                  agree to the collection and use of your personal information
                  as described in this Policy.
                </p>

                <h6>1. Information Collection</h6>
                <p>
                  When you visit our website, we may collect the following types
                  of information:
                </p>
                <ul class="list_dot">
                  <li>
                    1.1 Personal Information: This includes your name, email
                    address, contact information, and any other information you
                    voluntarily provide through contact forms or account
                    registration.
                  </li>
                  <li>
                    1.2 Log Data: We collect information that your browser sends
                    when you visit our website, such as your IP address, browser
                    type, operating system, pages visited, duration of visit,
                    and other statistics.
                  </li>
                  <li>
                    1.3 Cookies and Similar Technologies: We use cookies and
                    similar tracking technologies to enhance your experience on
                    our website. Refer to our Cookies Policy for detailed
                    information.
                  </li>
                </ul>

                <h6>2. Use of Information</h6>
                <p>
                  We may use the collected information for the following
                  purposes:{" "}
                </p>
                <ul class="list_dot">
                  <li>
                    {" "}
                    2.1 Service Provision and Improvement: We use your
                    information to understand your needs and enhance your
                    experience on our website, including analyzing usage
                    patterns, customizing content, and improving website
                    functionality.
                  </li>
                  <li>
                    {" "}
                    2.2 Communication: We may use your contact information to
                    respond to your inquiries, provide customer support, send
                    important notices, and inform you about our services and
                    promotions.
                  </li>
                  <li>
                    2.3 Personalization: We may use your information to
                    personalize your experience on our website, such as
                    displaying relevant content or advertisements.{" "}
                  </li>
                  <li>
                    2.4 Legal Compliance: We may process your information to
                    comply with applicable laws, regulations, or legal requests.
                  </li>
                </ul>

                <h6>3. Data Security and Retention</h6>
                <p>
                  We are committed to protecting your personal information and
                  employ appropriate technical and organizational measures to
                  prevent unauthorized access, alteration, disclosure, or
                  destruction of your data. We retain your personal information
                  only as long as necessary to fulfill the purposes outlined in
                  this Policy, unless a longer retention period is required or
                  permitted by law.{" "}
                </p>

                <h6>4. Third-Party Disclosure</h6>
                <p>
                  {" "}
                  We may share your personal information with trusted third
                  parties who assist us in operating our website or providing
                  services to you. These parties are obligated to maintain the
                  confidentiality of your information and use it solely for the
                  specified purposes. We may also disclose your information to
                  comply with applicable laws, regulations, or legal processes,
                  or to protect our rights, property, or safety.
                </p>

                <h6>5. Your Choices and Rights</h6>
                <p>
                  {" "}
                  You have certain rights regarding your personal information.
                  You can request access, correction, or deletion of your
                  information, and you may object to or restrict certain
                  processing activities. To exercise these rights, please
                  contact us using the information provided below.
                </p>

                <h6>6. Updates to this Policy</h6>
                <p>
                  We reserve the right to update this Policy from time to time.
                  Any changes will be posted on our website, and the "Last
                  updated" date at the top of the Policy will be revised
                  accordingly. It is your responsibility to review this Policy
                  periodically to stay informed about our handling of your
                  personal information.{" "}
                </p>

                <h6>7. Contact Information</h6>
                <p>
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our practices, please contact us at{" "}
                  <a href="mailto:marketing@gaswizard.io">
                    marketing@gaswizard.io
                  </a>{" "}
                </p>
              </section>
            </div>
          </div>
        </div>

        <section className="contact padding footer" id="contact">
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
                      <a className href="#">
                        Telegram
                      </a>
                    </li>
                    <li className>
                      <a className href="#">
                        {" "}
                        <img src="img/x.png" alt="twitter" />
                      </a>
                    </li>
                    <li className>
                      <a className href="#">
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
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Audit</a>
                  </li>
                  <li>
                    <a href="#">Legal</a>
                  </li>
                </ul>
                <a className="btn" href="buy-crypto.html">
                  Buy Now
                </a>
              </div>
            </div>
            <p className="op20 mt-4 mt-md-5">
              Digital currencies may be unregulated in your jurisdiction. The
              value of digital currencies may go down as well as up. Profits may
              be subject to capital gains or other taxes applicable in your
              jurisdiction.
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
        </section>
      </div>
    </>
  );
};
