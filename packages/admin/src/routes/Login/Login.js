import React from 'react'
import PropTypes from 'prop-types'
import { BiLeftArrowAlt } from 'react-icons/bi'

import redeemLogo from 'img/redeem-logo.svg'
import loginBg from 'img/login-background.svg'
import loginPeople from 'img/login-people.svg'

import './Login.scss'

const TAGLINE = 'Issue and track vouchers easily'
const FORM_ID = 'login-form'

export default function Login({
  onPrimaryButtonClick,
  LabelAndInput,
  primaryButtonText,
  isBackButtonShown,
  onBackClick,
  isLoading,
  errorMessage,
}) {
  return (
    <div className="login-page-container">
      <div className="login-page-main">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-6 login-left">
              {isBackButtonShown && (
                <button
                  className="btn btn-link-primary btn-lg btn-icon-left back-button"
                  type="button"
                  onClick={onBackClick}
                >
                  <BiLeftArrowAlt />
                  Back
                </button>
              )}
              <div className="product-tagline">
                <img src={redeemLogo} alt="logo" />
                <p>{TAGLINE}</p>
              </div>
              <form
                className="form-group"
                id={FORM_ID}
                onSubmit={(e) => {
                  // Prevent default which reloads the page
                  // Instead call the primary event
                  e.preventDefault()
                  onPrimaryButtonClick()
                }}
              >
                <div className="input-group">
                  {LabelAndInput}
                  <p className="error-message">{errorMessage}</p>
                </div>
              </form>
              <div className="btn-group">
                <button
                  id="login-primary-button"
                  form={FORM_ID}
                  className={`btn btn-primary btn-lg ${
                    isLoading && 'is-loading'
                  }`}
                  type="submit"
                >
                  {primaryButtonText}
                </button>
                <button className="btn btn-link-primary bg-lg" type="button">
                  Have a Question?
                </button>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 login-right">
              <img className="login-background" src={loginBg} alt="" />
              <img className="login-people" src={loginPeople} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  onPrimaryButtonClick: PropTypes.func.isRequired,
  LabelAndInput: PropTypes.element.isRequired,
  primaryButtonText: PropTypes.string.isRequired,
  isBackButtonShown: PropTypes.bool.isRequired,
  onBackClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}
