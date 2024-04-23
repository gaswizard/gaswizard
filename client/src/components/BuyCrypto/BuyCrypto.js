import { Navbar } from "../widgets/Navbar";
import { Footer } from "../widgets/Footer";

export const BuyCrypto = () => {
  return (
    <>
      <Navbar />
      <div className="overflow-hidden crypto_page_bg">
        <div id="scroll-to-top">
          <i className="bi bi-chevron-up fa-fw" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <section className=" p70 pn_page_pt text-center">
                <h1 className="text-center hadding mb-md-5 mb-3">
                  Buy with <span className="t_gr">Crypto</span>{" "}
                </h1>
                <p>
                  1. Firstly, make sure you have one of the supported wallets
                  ready. For desktop, we recommend using the Metamask browser
                  extension. For mobile, we recommend using TrustWallet and its
                  built in browser.
                </p>
                <p>
                  {" "}
                  2. Click on the "Buy $GWIZ" button to enable Gas Wizard to
                  connect with your wallet. Once connected, you can buy $GWIZ
                  tokens using a selection of currencies from the ETH chain.
                </p>
                <p>
                  {" "}
                  3. Choose the amount of $GWIZ tokens you wish to buy or the
                  amount of your assets you wish to spend and click "Buy now".
                  We recommend having at least $10 of ETH to cover gas fees. If
                  you don't have enough ETH please transfer it from any crypto
                  exchange to your wallet address or buy more through Metamask
                  or TrustWallet marketplace.
                </p>
              </section>
              <section className=" p70 ">
                <h2 className="text-center hadding mb-md-5 mb-3">
                  Buy with <span className="t_gr">Card</span>{" "}
                </h2>
                <ul className="in_list">
                  <li>
                    To buy ETH using your card, bank transfer, or other methods,
                    such as Apple Pay, you will be directed to our partner,
                    Transak. Once there, you can complete your purchase directly
                    in the widget.
                  </li>
                  <li>
                    Select your preferred currency, enter the amount you wish to
                    pay, and choose your payment method. The widget will display
                    the estimated BNB you will receive, the rate, and the total
                    fees to carry out the transaction. After selecting your
                    payment method and amount, click the 'Buy Now' button.
                  </li>
                  <li>
                    Fill out your BNB wallet address and click “Buy BNB”. You
                    can find it in your preferred wallet of choice. If you don’t
                    have a wallet, please setup Metamask as described here: New
                    to crypto?
                  </li>
                  <li>
                    Verify your address with the 4-digit code sent to your
                    email. Then, agree to Transak's terms of use and click
                    “Continue”.
                  </li>
                  <li>
                    {" "}
                    Next, you need to go through Transak's KYC process to verify
                    your account. The process takes only a few minutes. Please
                    enter your personal details, including your phone number and
                    date of birth, and continue to fill out your home address.
                  </li>
                  <li>
                    {" "}
                    Finally, you will be required to prove your identity with a
                    government-issued photo ID, such as a passport or driver's
                    license. Select the issuing country of your identification,
                    then choose your preferred ID method.
                  </li>
                  <li>
                    {" "}
                    Once you have confirmed your photos, your KYC details will
                    be submitted to Transak for verification. The process
                    typically takes between 5-10 minutes.
                  </li>
                  <li>
                    Transak will notify you once you have been verified, and you
                    can then proceed with your purchase by clicking 'Order Now'
                    to continue to your billing address
                  </li>
                  <li>
                    {" "}
                    After your payment has been authorized, it may take a few
                    minutes for your order to be processed. Transak will send
                    you a confirmation email once your ETH has been successfully
                    delivered to your wallet. From here, you can track your
                    order or navigate back to the app as needed.
                  </li>
                  <li>
                    {" "}
                    Use your wallet to purchase GWIZ with your fresh ETH on our
                    landing page simply by using our Pre-Sale form.
                  </li>
                </ul>
              </section>
              <section className=" p70 ">
                <h2 className="text-center hadding mb-md-5 mb-3">
                  New to <span className="t_gr">Crypto</span>?
                </h2>
                <ul className="in_list">
                  <li>
                    <p>
                      First, ensure you have the MetaMask wallet installed as a
                      browser extension in order to connect your wallet to the
                      platform.
                    </p>
                    <a target="_blank" href="https://metamask.io/download/">
                      https://metamask.io/download/
                    </a>
                  </li>
                  <li>
                    <p>
                      Once connected, you can buy ETH or a stablecoin such as
                      USDT via card. Just click on "Buy" and it will open the
                      MetaMask marketplace, at:
                    </p>
                    <a target="_blank" href="https://portfolio.metamask.io/">
                      {" "}
                      https://portfolio.metamask.io/
                    </a>
                  </li>
                  <li>
                    Once you have the necessary funds in your wallet, head over
                    to the Gas Wizard platform at:
                    <a target="_blank" href="https://gaswizard.io/">
                      {" "}
                      https://gaswizard.io/
                    </a>{" "}
                  </li>
                  <li>
                    <p>
                      Click on the "Buy Now’" button to enable gas Wizard to
                      connect with your wallet. Once connected, you can buy
                      $GWIZ tokens using a selection of currencies from the ETH
                      chain.
                    </p>
                  </li>
                  <li>
                    <p>
                      Choose the amount of $GWIZ tokens you wish to buy or the
                      amount of your assets you wish to spend and click "Buy
                      now". We recommend having at least $10 worth of ETH to
                      cover gas fees. If you don't have enough ETH, please
                      transfer it from any crypto exchange to your wallet
                      address or buy more through MetaMask marketplace.
                    </p>
                  </li>
                </ul>
                <h6 className="ttu mt-md-5">MOBILE</h6>
                <ul className="in_list">
                  <li>
                    <p>
                      If you are purchasing on mobile, we recommend using Trust
                      Wallet and connecting through the WalletConnect.
                    </p>
                    <a
                      target="_blank"
                      href=" https://community.trustwallet.com/t/how-to-use-walletconnect-with-trust-wallet/36247"
                    >
                      {" "}
                      https://community.trustwallet.com/t/how-to-use-walletconnect-with-trust-wallet/36247
                    </a>
                  </li>
                  <li>
                    <p>
                      Download the TrustWallet app on to your mobile device from
                      the relevant app store (Apple App Store, Google Play
                      Store, etc)
                    </p>
                  </li>
                  <li>
                    Once your wallet is activated, you need to ensure you have
                    the ETH Chain available in your wallet. If you don’t, you
                    can add it to your wallet by following the steps at:
                    <a target="_blank" href="https://community.trustwallet.com">
                      https://community.trustwallet.com
                    </a>{" "}
                  </li>
                  <li>
                    <p>
                      If you don't have any assets on the wallet, please
                      transfer it from any crypto exchange to your wallet
                      address or buy more through Trust Wallet marketplace
                      simply by clicking on the “Buy” button. Once you have the
                      necessary funds in your wallet, head over to the Gas
                      WIzard platform at:
                    </p>{" "}
                    <a target="_blank" href="https://gaswizard.io">
                      https://gaswizard.io
                    </a>
                  </li>
                  <li>
                    <p>
                      {" "}
                      Click on the "Buy Now" button to enable Gas Wizard to
                      connect with your wallet. Once connected you can buy $GWIZ
                      tokens using a selection of currencies from the ETH&nbsp;
                      chain.{" "}
                    </p>
                  </li>
                  <li>
                    <p>
                      {" "}
                      Choose the amount of $GWIZ tokens you wish or select how
                      much assets you wish to spend and click "Buy now". We
                      recommend having at least $10 of ETH to cover gas fees. If
                      you don't have enough ETH, please transfer it from any
                      crypto exchange to your wallet address or buy more through
                      the Trust Wallet marketplace with the “Buy” button.{" "}
                    </p>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
