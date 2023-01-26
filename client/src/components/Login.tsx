import React from "react";
import axios from "axios";
import styled from "styled-components";

const LoginForm = styled.div`
  margin-top: 2rem;
  width: 600px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Login = (): JSX.Element => {
  const [loginInputs, setLoginInputs] = React.useState<User>({
    email: "",
    password: "",
  });

  const { email, password } = loginInputs;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log({ name, value });
    setLoginInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const user = { email, password };
    // console.log({ user });
    // alert(`${email} ${password}`);
    const URL = "/api/login";
    try {
      const response = await axios.post(URL, user);
      // console.log(response);
      const data = response.data;
      console.log("data:", data);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <React.Fragment>
      <LoginForm>
        <h1 className="mt-5 text-center">Login</h1>
        <form onSubmit={onSubmitForm}>
          <input
            placeholder="email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => onChange(event)}
            className="form-control my-3"
            minLength={6}
            required={true}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => onChange(event)}
            className="form-control my-3"
            minLength={8}
            required={true}
          />
          <button className="btn btn-success" style={{ width: "100%" }}>
            Submit
          </button>
        </form>
      </LoginForm>

      {/* <Link to="/register">Register</Link> */}
    </React.Fragment>
  );
};

export default Login;