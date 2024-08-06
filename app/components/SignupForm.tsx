"use client";
import classes from "./SignupForm.module.css";
import React, {ChangeEvent, useCallback, useState} from "react";
import {deepCopy, isValidEmail, isValidPassword} from "./util";

const errorMsg = {
  value: "값을 입력해주세요.",
  minStrLength: "최소 5자 이상 입력해주세요.",
  maxStrLength: "최대 15자 이하로 입력해주세요.",
  minPwLength: "최소 8자 이상 입력해주세요.",
  maxPwLength: "최대 20자 이하로 입력해주세요.",
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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = deepCopy(defaultErrorValue);

    if (userInput.id.trim().length === 0) {
      newErrors.id.msg = errorMsg.value;
    }
    else if (userInput.id.trim().length < 5) {
      newErrors.id.msg = errorMsg.minStrLength;
    }
    else if (15 < userInput.id.trim().length) {
      newErrors.id.msg = errorMsg.maxStrLength;
    }

    if (userInput.name.trim().length === 0) {
      newErrors.name.msg = errorMsg.value;
    }

    if (
      userInput.email.trim().length > 0 &&
      !isValidEmail(userInput.email.trim())
    ) {
      newErrors.email.msg = errorMsg.invalidEmail;
    }

    if (userInput.password.trim().length === 0) {
      newErrors.password.msg = errorMsg.value;
    }
    else if (!isValidPassword(userInput.password)) {
      newErrors.password.msg = errorMsg.invalidPassword;
    }
    else if (userInput.password.length < 8) {
      newErrors.password.msg = errorMsg.minPwLength;
    }
    else if (userInput.password.length > 20) {
      newErrors.password.msg = errorMsg.maxPwLength;
    }

    if (userInput.passwordConfirm.trim().length === 0) {
      newErrors.passwordConfirm.msg = errorMsg.value;
    }
    else if (userInput.password !== userInput.passwordConfirm) {
      newErrors.passwordConfirm.msg = errorMsg.passwordError;
    }
    else if (userInput.passwordConfirm.length < 8) {
      newErrors.passwordConfirm.msg = errorMsg.minPwLength;
    }
    else if (userInput.passwordConfirm.length > 20) {
      newErrors.passwordConfirm.msg = errorMsg.maxPwLength;
    }
    else if (!isValidPassword(userInput.passwordConfirm)) {
      newErrors.passwordConfirm.msg = errorMsg.invalidPassword;
    }
    setError(newErrors);

    if (Object.values(newErrors).every((error) => error.msg === "")) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      localStorage.setItem("users", JSON.stringify([...users, userInput]));
    }
  }, [userInput]);

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
