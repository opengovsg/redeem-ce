/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react'
import { Link } from 'react-router-dom'

import './Styleguide.scss'

// using https://react-icons.github.io/react-icons/
import { IconContext } from 'react-icons'
import { TiDelete } from 'react-icons/ti'
import { BiLike, BiHome, BiLeftArrowAlt } from 'react-icons/bi'

import AppHeader from 'components/AppHeader'

const DUMMY_EMAIL = 'admin25@redeem.gov.sg'

export default function Styleguide() {
  return (
    <>
      <AppHeader email={DUMMY_EMAIL} />
      <div className="style-guide-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="back-button">
                <Link to="/campaigns">
                  <button className="btn btn-link-primary btn-lg btn-icon-left">
                    <IconContext.Provider value={{ className: 'icon' }}>
                      <div className="icon">
                        <BiLeftArrowAlt />
                      </div>
                    </IconContext.Provider>
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Style Guide</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h2>Button System</h2>
                  <p>This is the button design system.</p>
                  <code>
                    {`<button className="btn btn-primary">Default</button>`}
                  </code>
                  <div className="btn-group">
                    <button className="btn btn-primary">Default</button>
                    <button className="btn btn-primary">
                      This is a long button label
                    </button>
                  </div>
                  <br />
                  <h3>Sizes</h3>
                  <p>It comes in 3 sizes. Small, Default and Large.</p>
                  <code>
                    {`<button className="btn btn-primary btn-lg">Large</button>\n<button className="btn btn-primary">Default</button>\n<button className="btn btn-primary btn-sm">Small</button>`}
                  </code>

                  <div className="btn-group">
                    <button className="btn btn-primary btn-lg">Large</button>
                    <button className="btn btn-primary">Default</button>
                    <button className="btn btn-primary btn-sm">Small</button>
                  </div>
                  <br />
                  <h3>Styles</h3>
                  <p>
                    It comes in 3 styles. "Filled" is the default. Then there is
                    "Outline" and "Link"
                  </p>
                  <code>
                    {`<button className="btn btn-primary">Filled</button>\n<button className="btn btn-outline-primary">Outline</button>\n<button className="btn btn-link-primary">Link</button>`}
                  </code>

                  <div className="btn-group">
                    <button className="btn btn-primary">Filled</button>
                    <button className="btn btn-outline-primary">Outline</button>
                    <button className="btn btn-link-primary">Link</button>
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-primary">Submit</button>
                    <button className="btn btn-outline-primary">Cancel</button>
                    <button className="btn btn-link-primary">Link</button>
                  </div>
                  <br />
                  <h3>Colors</h3>
                  <p>
                    It comes in these colors. Primary, Secondary, Success,
                    Danger, Warning, Info, Dark and Light.
                  </p>
                  <code>
                    {`<button className="btn btn-primary">Primary</button>\n<button className="btn btn-secondary">Secondary</button>\n<button className="btn btn-success">Success</button>\n<button className="btn btn-danger">Danger</button>\n<button className="btn btn-warning">Warning</button>\n<button className="btn btn-info">Info</button>\n<button className="btn btn-dark">Dark</button>\n<button className="btn btn-light">Light</button>`}
                  </code>

                  <div className="btn-group">
                    <button className="btn btn-primary">Primary</button>
                    <button className="btn btn-secondary">Secondary</button>
                    <button className="btn btn-success">Success</button>
                    <button className="btn btn-danger">Danger</button>
                    <button className="btn btn-warning">Warning</button>
                    <button className="btn btn-info">Info</button>
                    <button className="btn btn-dark">Dark</button>
                    <button className="btn btn-light">Light</button>
                  </div>
                  <br />
                  <h3>Colors and Styles</h3>
                  <p>
                    The buttons also comes in outline and link styles for the
                    different colors. Of course, some of these buttons only
                    looks good on certain background. For example, light and
                    secondary buttons only goes well with dark backgrounds.
                  </p>
                  <code>
                    {`<button className="btn btn-outline-primary">Primary</button>\n<button className="btn btn-link-primary">Primary</button>\n<button className="btn btn-outline-secondary">Primary</button>\n<button className="btn btn-link-secondary">Secondary</button>\n<button className="btn btn-success">Success</button>\n<button className="btn btn-danger">Danger</button>\n<button className="btn btn-warning">Warning</button>\n<button className="btn btn-info">Info</button>\n<button className="btn btn-dark">Dark</button>\n<button className="btn btn-light">Light</button>`}
                  </code>

                  <div className="btn-group">
                    <button className="btn btn-outline-primary">Outline</button>
                    <button className="btn btn-link-primary">Link</button>
                    <button className="btn btn-outline-secondary">
                      Outline
                    </button>
                    <button className="btn btn-link-secondary">Link</button>
                    <button className="btn btn-outline-success">Outline</button>
                    <button className="btn btn-link-success">Link</button>
                    <button className="btn btn-outline-danger">Outline</button>
                    <button className="btn btn-link-danger">Link</button>
                    <button className="btn btn-outline-warning">Outline</button>
                    <button className="btn btn-link-warning">Link</button>
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-outline-info">Outline</button>
                    <button className="btn btn-link-info">Link</button>
                    <button className="btn btn-outline-dark">Outline</button>
                    <button className="btn btn-link-dark">Link</button>
                    <button className="btn btn-outline-light">Outline</button>
                    <button className="btn btn-link-light">Link</button>
                  </div>
                  <br />
                  <h3>Icons</h3>
                  <p>
                    You can add icons too!
                    <ul className="guide-list">
                      <li>
                        For buttons with icon on the left, add a class
                        ".btn-icon-left"
                      </li>
                      <li>
                        For buttons with icon on the right, add a class
                        ".btn-icon-right"
                      </li>
                      <li>
                        For buttons with icon only and no text, add a class
                        ".btn-icon-only"
                      </li>
                    </ul>
                    Declaring icons is abstracted below. Please refer to{' '}
                    <a href="https://github.com/react-icons/react-icons">
                      {' '}
                      React Icons
                    </a>{' '}
                    on how to use. About the icons colors, the Redeem React
                    design system has styling that will will directly affect the
                    SVG fill based on the button classes called, you just need
                    to add a ".icon" class as instructed by the react-icons
                    guide.
                  </p>
                  <code>
                    {`<button className="btn btn-primary btn-icon-left"><Icon>*</Icon>Like</button>\n<button className="btn btn-outline-danger btn-icon-right">Close<Icon>*</Icon></button>\n<button className="btn btn-outline-primary btn-icon-only"><Icon>*</Icon></button>`}
                  </code>

                  <div className="btn-group">
                    <button className="btn btn-primary btn-lg btn-icon-left">
                      <IconContext.Provider value={{ className: 'icon' }}>
                        <div className="icon">
                          <BiLike />
                        </div>
                      </IconContext.Provider>
                      Like
                    </button>
                    <button className="btn btn-outline-danger btn-lg btn-icon-right">
                      Close
                      <IconContext.Provider value={{ className: 'icon' }}>
                        <div className="icon">
                          <TiDelete />
                        </div>
                      </IconContext.Provider>
                    </button>
                    <button
                      aria-label="home"
                      className="btn btn-outline-primary btn-lg btn-icon-only"
                    >
                      <IconContext.Provider value={{ className: 'icon' }}>
                        <div className="icon">
                          <BiHome />
                        </div>
                      </IconContext.Provider>
                    </button>
                  </div>
                  <br />
                  <h3>Loading state</h3>
                  <p>
                    Add ".is-loading" class to activate the loading state. It
                    can be used for all the different variants of buttons, even
                    those with icons.
                  </p>
                  <code>
                    {`<button className="btn btn-primary btn-lg is-loading">Large</button>\n<button className="btn btn-primary is-loading">Default</button>\n<button className="btn btn-primary btn-sm is-loading">Small</button>`}
                  </code>

                  <div className="btn-group">
                    <button className="btn btn-primary btn-lg is-loading">
                      Large
                    </button>
                    <button className="btn btn-success btn-lg is-loading">
                      Large
                    </button>
                    <button className="btn btn-outline-danger is-loading">
                      Default
                    </button>
                    <button className="btn btn-link-primary btn-sm is-loading">
                      Small
                    </button>
                    <button className="btn btn-link-info btn-sm btn-left-icon is-loading">
                      Small
                    </button>
                  </div>

                  <br />
                  <h3>Disabled state</h3>
                  <p>
                    Add the disabled HTML boolean to activate the disabled
                    state. It changes the opacity and disallow pointer events.
                    It can be used for all the different variants of buttons,
                    even those with icons.
                  </p>
                  <code>
                    {`<button className="btn btn-primary btn-lg is-loading">Large</button>\n<button className="btn btn-primary is-loading">Default</button>\n<button className="btn btn-primary btn-sm is-loading">Small</button>`}
                  </code>

                  <div className="btn-group">
                    <button className="btn btn-primary btn-lg" disabled>
                      Submit
                    </button>
                    <button className="btn btn-success btn-lg " disabled>
                      Send
                    </button>
                    <button className="btn btn-outline-danger" disabled>
                      Delete
                    </button>
                    <button
                      className="btn btn-link-primary btn-sm btn-icon-right"
                      disabled
                    >
                      Close
                      <IconContext.Provider value={{ className: 'icon' }}>
                        <div className="icon">
                          <TiDelete />
                        </div>
                      </IconContext.Provider>
                    </button>
                    <button
                      className="btn btn-link-info btn-sm btn-left-icon"
                      disabled
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h2>Badges</h2>
                  <p>This is the badges design system.</p>
                  <code>{`<div className="badge badge-primary">Primary</div>\n<div className="badge badge-secondary">Secondary</div>\n<div className="badge badge-success">Success</div>\n<div className="badge badge-danger">Danger</div>\n<div className="badge badge-warning">Warning</div>\n<div className="badge badge-info">Info</div>\n<div className="badge badge-dark">Dark</div>\n<div className="badge badge-light">Light</div>`}</code>
                  <div className="badge-group">
                    <div className="badge badge-primary">Primary</div>
                    <div className="badge badge-secondary">Secondary</div>
                    <div className="badge badge-success">Success</div>
                    <div className="badge badge-danger">Danger</div>
                    <div className="badge badge-warning">Warning</div>
                    <div className="badge badge-info">Info</div>
                    <div className="badge badge-dark">Dark</div>
                    <div className="badge badge-light">Light</div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
