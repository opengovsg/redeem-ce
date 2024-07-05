import React from 'react'

// using https://react-icons.github.io/react-icons/
import { IconContext } from 'react-icons'
import { RiFacebookFill, RiLinkedinFill } from 'react-icons/ri'

import ogpLogoMark from 'img/ogp-logo-mark-white.svg'
import ogpLogo from 'img/ogp-logo.svg'
import './OgpFooter.scss'

const urlOgpWebsite = 'https://open.gov.sg'
const urlOgpFacebook = 'https://www.facebook.com/opengovsg'
const urlOgpLinkedIn =
  'https://www.linkedin.com/company/open-government-products/'

function OgpFooter() {
  return (
    <footer className="ogp-footer-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 footer-left">
            <p>Built by</p>
            <a href={urlOgpWebsite}>
              <img src={ogpLogo} alt="OGP Logo" />
            </a>
          </div>
          <div className="col-sm-12 col-md-6 footer-right">
            <div className="social-icons">
              <IconContext.Provider
                value={{ color: 'white', className: 'icon' }}
              >
                <div className="icon">
                  <a aria-label="linkedin" href={urlOgpLinkedIn}>
                    <RiLinkedinFill />
                  </a>
                </div>
              </IconContext.Provider>
              <IconContext.Provider
                value={{ color: 'white', className: 'icon' }}
              >
                <div className="icon">
                  <a aria-label="facebook" href={urlOgpFacebook}>
                    <RiFacebookFill />
                  </a>
                </div>
              </IconContext.Provider>
              <div className="icon">
                <a href={urlOgpWebsite}>
                  <img src={ogpLogoMark} alt="OGP Logo Mark" />
                </a>
              </div>
            </div>

            <p className="copyright-text">
              &copy; 2020 Open Government Products, Government Technology Agency
              of Singapore
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default OgpFooter
