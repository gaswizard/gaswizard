import React from "react";

export const Header = ({scrollTobuynow}) => {
  return (
    <>
      
      <header className="home" id="home">
        <div className="bgg1" />
        <div className="bgg2" />
        <div className="banner_content">
          <div className="container  position-relative">
            <img
              src="img/bg-tl.png"
              alt="bg-tl "
              className="bg-tl position-absolute"
            />
            <div className="row">
              <div className="col-md-8 m-auto text-center">
                <h1>
                  <span className="t_gr">Gas Wizard:</span>
                  <br />
                  Fueling Your Journey with Rewards.
                </h1>
                <p className=" mt-3 mt-md-4">
                  Feeling the pinch of pricey gas and EV charges? Introducing
                  Gas Wizard. Earn rewards and ease your wallet on skyrocketing
                  gas prices.
                </p>
                <div className="login_btns mt-4 mt-md-5">
                  <a href="/#buy-now" className="btn" onClick={scrollTobuynow}>
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
