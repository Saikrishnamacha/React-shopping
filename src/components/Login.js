import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../store/CartContext";
const Login = () => {
  const ctx = useContext(CartContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
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
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_BUpDBpI2m2GI_dj7h7JDXp8ZHDaIkcY",
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
          throw new Error("Failed");
        } else {
          ctx.login(userInput);
          navigate("/profile");
          return res.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => {
        setError(error.message);
      });
  };
  const errorCls = emailIsInvalid || passwordIsInValid ? "form-error" : "";
  return (
    <div
      className="container mt-md-auto w-25 mt-lg-5"
      style={{ backgroundColor: "#f2f2f2", padding: "20px" }}
    >
      <h2 className="title_form">Login</h2>
      {!ctx.isLoggedIn && (
        <form onSubmit={formSubmitHandler} className={errorCls}>
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
          {error && <p className="input-error">User does not exist</p>}
        </form>
      )}
    </div>
  );
};
export default Login;
