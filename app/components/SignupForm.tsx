"use client";
import classes from "./SignupForm.module.css";
import React, { ChangeEvent, useState } from "react";
import { isValidEmail, isValidPassword } from "./util";

const errorMsg = {
  value: "값을 입력해주세요.",
  minStrLength: "최소 5자 이상 입력해주세요.",
  maxStrLength: "최대 15자 이하로 입력해주세요.",
  minPwLength: "최소 8자 이상 입력해주세요.",
  maxPwLength: "최소 20자 이하로 입력해주세요.",
  invalidEmail: "이메일 형식에 맞게 입력해주세요.",
  passwordError: "비밀번호가 일치하지 않습니다.",
  invalidPassword: "영문과 숫자만 입력해주세요.",
};

const defaultInputValue = {
  id: "",
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const defaultErrorValue = {
  id: { msg: "" },
  email: { msg: "" },
  name: { msg: "" },
  password: { msg: "" },
  passwordConfirm: { msg: "" },
};

const SignupForm: React.FC = () => {
  const [userInput, setUserInput] = useState(defaultInputValue);
  const [error, setError] = useState(defaultErrorValue);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(defaultErrorValue);

    if (userInput.id.trim().length === 0) {
      setError((prev) => ({ ...prev, id: { msg: errorMsg.value } }));

      return;
    }

    if (userInput.id.trim().length < 5) {
      setError((prev) => ({ ...prev, id: { msg: errorMsg.minStrLength } }));

      return;
    }

    if (15 < userInput.id.trim().length) {
      setError((prev) => ({ ...prev, id: { msg: errorMsg.maxStrLength } }));

      return;
    }

    if (userInput.name.trim().length === 0) {
      setError((prev) => ({ ...prev, name: { msg: errorMsg.value } }));

      return;
    }

    if (
      userInput.email.trim().length > 0 &&
      !isValidEmail(userInput.email.trim())
    ) {
      setError((prev) => ({ ...prev, email: { msg: errorMsg.invalidEmail } }));

      return;
    }

    if (userInput.password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: { msg: errorMsg.minPwLength },
      }));

      return;
    }

    if (userInput.password.length > 20) {
      setError((prev) => ({
        ...prev,
        password: { msg: errorMsg.maxPwLength },
      }));

      return;
    }

    if (!isValidPassword(userInput.password)) {
      setError((prev) => ({
        ...prev,
        password: { msg: errorMsg.invalidPassword },
      }));

      return;
    }

    if (userInput.password !== userInput.passwordConfirm) {
      setError((prev) => ({
        ...prev,
        passwordConfirm: { msg: errorMsg.passwordError },
      }));

      return;
    }

    if (userInput.passwordConfirm.length < 8) {
      setError((prev) => ({
        ...prev,
        passwordConfirm: { msg: errorMsg.minPwLength },
      }));

      return;
    }

    if (userInput.passwordConfirm.length > 20) {
      setError((prev) => ({
        ...prev,
        passwordConfirm: { msg: errorMsg.maxPwLength },
      }));

      return;
    }

    if (!isValidPassword(userInput.passwordConfirm)) {
      setError((prev) => ({
        ...prev,
        passwordConfirm: { msg: errorMsg.invalidPassword },
      }));

      return;
    }

    if (localStorage.get("users")) {
      localStorage.clear();
    }
    localStorage.setItem("users", JSON.stringify(userInput));
  };

  return (
    <>
      <h3 className={classes.h3}>회원가입</h3>
      <p className={classes.p}>회원가입을 위해 아래 정보를 입력해주세요.</p>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label className={classes.label} htmlFor="id">
            ID:
          </label>
          <input
            id="id"
            name="id"
            value={userInput.id}
            onChange={handleChangeInput}
            className={classes.input}
          />
          {error.id && <p className={classes.errorMsg}>{error.id.msg}</p>}
        </div>
        <div>
          <label className={classes.label} htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            name="name"
            value={userInput.name}
            onChange={handleChangeInput}
            className={classes.input}
          />
          {error.name && <p className={classes.errorMsg}>{error.name.msg}</p>}
        </div>
        <div>
          <label className={classes.label} htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            name="email"
            value={userInput.email}
            onChange={handleChangeInput}
            className={classes.input}
          />
          {error.email && <p className={classes.errorMsg}>{error.email.msg}</p>}
        </div>
        <div>
          <label className={classes.label} htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            name="password"
            value={userInput.password}
            onChange={handleChangeInput}
            className={classes.input}
          />
          {error.password && (
            <p className={classes.errorMsg}>{error.password.msg}</p>
          )}
        </div>
        <div>
          <label className={classes.label} htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            id="confirmPassword"
            name="passwordConfirm"
            value={userInput.passwordConfirm}
            onChange={handleChangeInput}
            className={classes.input}
          />
          {error.passwordConfirm && (
            <p className={classes.errorMsg}>{error.passwordConfirm.msg}</p>
          )}
        </div>
        <button className={classes.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default SignupForm;
