import React, { useState, useEffect } from "react";
import { Navbar } from "../widgets/Navbar";

import { signupUser } from "../services/auth/auth";
import { toast } from "react-toastify";
import { Emailpattern } from "../pattern/Pattern";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
export const SignUp = () => {
  const [name, setName] = useState("");
  const [mobile_number, setMobile_number] = useState("+91");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const [mobile_numberErr, setMobile_numberErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [country_code, setCountry_code] = useState();
  const { login } = useAuth();

  const checkOtpHandler = async () => {
    if (!name) {
      setNameErr("Name is required");
      return;
    }
    if (!email) {
      setEmailErr("This field is required");
      return;
    }
    if (!Emailpattern.test(email)) {
      setEmailErr("Please enter valid email");
      return;
    }
    if (!number) {
      setMobile_numberErr("This field is required");
      return;
    }

    const address = localStorage.getItem("address");
    if (!address) {
      return toast.error("Please connect with metamusk");
    }

    let data = {
      name,
      email,
      mobile_number: number,
      country_code,
      address,
    };

    const result = await signupUser(data);
    if (result.status) {
      let token = result.token;
      localStorage.setItem("jwtToken", token);
      login();
      setTimeout(() => {
        navigate("/#buy-now", { replace: true });
        setTimeout(() => {
          window.scrollTo(0, window.scrollY);
        }, 100); // Adjust delay if necessary
      }, 2000);

      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    const err = "This field is required";
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
      if (value === "") {
        setNameErr("Name is required");
      } else {
        setNameErr("");
      }
    }
    if (name == "email") {
      setEmail(value);

      if (value == "") {
        setEmailErr(err);
      } else {
        if (!Emailpattern.test(value)) {
          setEmailErr("Please enter valid email");
        } else {
          setEmailErr("");
        }
      }
    }
    if (name == "mobile_number") {
      setMobile_number(value);

      if (value === "") {
        setMobile_numberErr("Mobile Number is required");
      } else {
        setMobile_numberErr("");
      }
    }
  };

  const handleOnChanges = (value, country) => {
    setMobile_number(value);

    let adjustedMobile = value.startsWith(country.dialCode)
      ? value.replace(country.dialCode, "")
      : value;

    if (!adjustedMobile) {
      setMobile_numberErr("Mobile Number is required");
    } else {
      setMobile_numberErr("");
    }
    setNumber(adjustedMobile);
    setCountry_code("+" + country.dialCode);
  };

  const validNumber = (e) => {
    if (!/[\d.]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Navbar />

      <section className="ex_box p70 crypto_page_bg pt170">
        <div className="container  position-relative">
          <div className="ex_box_in position-relative box pl-lg-5 pr-lg-5">
            <div className="row align-items-center">
              <div className="col-md-4  m-auto">
                <img
                  src="img/token.png"
                  alt="token "
                  className="img-fluid token_logo"
                />
              </div>

              <div className="col-md-6 m-auto">
                <div className="login_box ">
                  <h3 className="text-center mb-md-3">Sign Up</h3>
                  <div class="form-group">
                    <label className="mb-1"> User Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter  User Name"
                      class="input_item"
                      value={name}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{nameErr}</span>
                  </div>
                  <label className="mb-1">Email </label>
                  <div class="form-group position-relative">
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter  Email"
                      class="input_item"
                      value={email}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{emailErr}</span>
                  </div>

                  <>
                    {" "}
                    <label className="mb-1">Mobile Number</label>
                    <div class="form-group  position-relative">
                      <PhoneInput
                        key={"phoneInput"}
                        country="IND"
                        value={mobile_number}
                        onChange={handleOnChanges}
                        className="input_item"
                        placeholder="Email/Mobile"
                        countryCodeEditable={false}
                        enableSearch={true}
                        inputProps={{
                          autoFocus: true,
                          name: "mobile_number",
                        }}
                        // disabled={disableGetCode}
                      />
                      <span className="text-danger">{mobile_numberErr}</span>
                    </div>
                  </>

                  <div class="form-group pt-3">
                    <button className="btn w100" onClick={checkOtpHandler}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
