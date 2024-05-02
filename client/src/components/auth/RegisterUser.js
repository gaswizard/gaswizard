import { useState, useEffect, useRef } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import { Emailpattern } from "../pattern/Pattern";
import { registerUser } from "../services/user";
import { useNavigate } from "react-router-dom";
export const RegisterUser = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [mobile_number, setMobile_number] = useState("+91");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
  
    const [mobile_numberErr, setMobile_numberErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [nameErr, setNameErr] = useState("");
    const [country_code, setCountry_code] = useState();
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
      const registerHandler = async () => {
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
    
        // const address = localStorage.getItem("address");
        // if (!address) {
        //   return toast.error("Please connect with metamusk");
        // }
    
        let data = {
          name,
          email,
          mobile_number: number,
          country_code,
        };
    
        const result = await registerUser(data);
        if (result.status) {
          let token = result.token;
          localStorage.setItem("jwtToken", token);
    
          setTimeout(() => {
            navigate("/#buy-now", { replace: true });
            setTimeout(() => {
              window.scrollTo(0, window.scrollY);
            }, 100);
          }, 2000);
    
          toast.success(result.message);
          setName("")
          setCountry_code(" ")
          setEmail("")
          setMobile_number("")
        } else {
          toast.error(result.message);
        }
      };
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
  return (
    <>
             <section className="ex_box p70">
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
                    <div className="col-md-6 col-lg-5  ">
                      <div className="text-center lh70 mb-4">
                        <h6 className="h1 mb-0">Signup Now </h6>
                        <h6 className="t_gr h1"> for Exclusive Offers</h6>
                      </div>
                      <div className="form-group ex_input_box position-relative">
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
                      <div className="form-group ex_input_box position-relative">
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
                      <div className="form-group ex_input_box position-relative">
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
                      <div className>
                        <button className="btn w100" onClick={registerHandler}>
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
    </>
  )
}
