"use client";
import React, { useState } from "react";
import "./forgot-password.css";
import axios from "axios";

export default function ForgotPassword() {
  let [error, setError] = useState("");
  let [msg, setMsg] = useState("");
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEPATH;
  let [buttonLoading, setButtonLoading] = useState(false);

  let forgotPasswordSubmit = (e) => {
    setMsg("");
    setError("");
    setButtonLoading(true);
    e.preventDefault();
    let obj = {
      email: e.target.email.value,
    };
    axios
      .post(`${apiBaseUrl}user/forgot-password`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          setButtonLoading(false);
          setMsg(finalRes._message);
          e.target.reset()
        } else {
          setError(finalRes._message);
        }

        setButtonLoading(false)
      });
  };
  return (
    <div>
      <div className="breadcrumbs_area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb_content">
                <h3>Forgot Password</h3>
                <ul>
                  <li>
                    <a href="/">home</a>
                  </li>
                  <li>{">"}</li>
                  <li>Forgot Password</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="forgot_password">
        <div className="container">
          <div className="row justify-center">
            <div className="col-md-6">
              <div className="forgot_card">
                <h2>Reset your password</h2>

                <p className="muted">
                  Enter the email address associated with your account and we'll
                  send a link to reset your password.
                </p>
                <form
                  onSubmit={forgotPasswordSubmit}
                  action="#"
                  className="forgot_form"
                >
                  {error != "" && <p className="text-danger">{error}</p>}
                  {msg != "" && <p className="text-success">{msg}</p>}

                  <label htmlFor="email">
                    Email address <span>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                  <div className="form_actions">
                    <button
                      type="submit"
                      disabled={buttonLoading}
                      className="btn primary"
                    >
                      Send reset link
                      {buttonLoading ? "Loading..." : ""}
                    </button>
                    <a className="back_to_login" href="/login-register">
                      Back to login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
