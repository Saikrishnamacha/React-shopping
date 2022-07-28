import { useContext, useState } from "react";
import CartContext from "../store/CartContext";
const Register = () => {
  const ctx = useContext(CartContext);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [inputIsTouched, setInputIsTouched] = useState({
    emailInputIsTouched: false,
    passwordInputIsTouched: false,
  });
  const { email, password } = userInput;
  const { emailInputIsTouched, passwordInputIsTouched } = inputIsTouched;
  const emailIsValid = email.trim() !== "" && email.includes("@");
  const emailIsInvalid = !emailIsValid && emailInputIsTouched;
  const passwordIsValid = password.trim() !== "" && password.trim().length > 7;
  const passwordIsInValid = !passwordIsValid && passwordInputIsTouched;
  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  const changeHandler = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  const blurHandler = () => {
    setInputIsTouched({
      ...inputIsTouched,
      emailInputIsTouched: true,
    });
  };
  const passwordBlurHandler = () => {
    setInputIsTouched({
      ...inputIsTouched,
      passwordInputIsTouched: true,
    });
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setInputIsTouched({
      emailInputIsTouched: true,
      passwordInputIsTouched: true,
    });
    if (!emailIsValid || !passwordIsValid) {
      return;
    }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_BUpDBpI2m2GI_dj7h7JDXp8ZHDaIkcY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed!");
        } else {
          return res.json();
        }
      })
      .then((data) => console.log(data))
      .catch((e) => {
        alert(e.message);
      });
    ctx.login(userInput);
    // navigate("/profile");
  };
  const errorCls = emailIsInvalid || passwordIsInValid ? "form-error" : "";
  return (
    <div
      className="container mt-md-auto w-25 mt-lg-5"
      style={{ backgroundColor: "#f2f2f2", padding: "20px" }}
    >
      {ctx.isLoggedIn && <h2>Registration Successfull</h2>}
      {!ctx.isLoggedIn && (
        <form onSubmit={formSubmitHandler} className={errorCls}>
          <h2 className="title_form">Register</h2>
          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={changeHandler}
              onBlur={blurHandler}
            />
            {emailIsInvalid && (
              <p className="input-error">Please enter a valid email</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="pwd" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={changeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordIsInValid && (
              <p className="input-error">
                Password length must be greater than 7 characters
              </p>
            )}
          </div>
          <button
            type="submit"
            className={
              formIsValid ? "btn btn-primary" : "btn btn-primary disabled"
            }
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
export default Register;
