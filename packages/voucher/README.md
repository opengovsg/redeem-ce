# Redeem CE Voucher View

Provides a web-based view of vouchers given to a recipient,
with redemptions made using QR codes.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Background

Digital vouchers created in Redeem are distributed as hard-to-guess links to
recipients. Each link is keyed by the voucher group id generated when the
vouchers are created within a campaign.

Recipients redeem vouchers by collating the denominations they wish to use,
then display the corresponding QR code to the merchant.

## Getting Started

- Have the [API](../api) up and running
- Create a voucher campaign and voucher group using the
  [admin interface](../admin)
- `npm run dev`, then visit `http://localhost:3000/<voucher group id>`

## Notable Libraries and Services

### Core

We use React (through create-react-app) and [Chakra UI](https://chakra-ui.com)
to build the frontend.

### Operations

[DataDog](https://datadoghq.com) is used to facilitate monitoring of the frontend,
especially taking advantage of [Real User Monitoring](https://docs.datadoghq.com/real_user_monitoring/)
to monitor user sessions and behaviour

[LaunchDarkly](https://launchdarkly.com) is used for feature flags, that is,
features that are deployed but hidden to the user.

## Environment Variables and Configuration

As this application is created using create-react-app, environment variables are
[given](https://create-react-app.dev/docs/adding-custom-environment-variables/)
to the application prefixed with `REACT_APP_`.

These are loaded into the application at runtime using
[dotenv-cli](https://www.npmjs.com/package/dotenv-cli) (through react-scripts),
as `.env.*` files, where the suffix denotes the environment
(as in `.env.development`), and whether the file is local to the machine
(as in `.env.development.local`).

| Name                                | Purpose                                           | Example Value                                  |
| ----------------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| `REACT_APP_API_BASE_URL`            | Required for operation. URL to backend API        | `http://localhost:10000`                       |
| `REACT_APP_LANDING_PAGE`            | Link to page for product information              | `https://redeem.gov.sg`                        |
| `REACT_APP_SUPPORT_EMAIL`           | Contact email to send queries or feedback         | `placeholder@redeem.gov.sg`                    |
| `REACT_APP_TERMS_OF_USE`            | Link to page that lists legal terms of use        | `https://redeem.gov.sg/terms-of-use.html`      |
| `REACT_APP_PRIVACY`                 | Link to page describing privacy info              | `https://redeem.gov.sg/privacy.html`           |
| `REACT_APP_REPORT_VULNERABILITY`    | Link to page to report security issues            | `https://www.tech.gov.sg/report_vulnerability` |
| `REACT_APP_FEEDBACK_PAGE`           | Link to page to provide feedback                  | `https://go.gov.sg/redeemsgfeedback`           |
| `REACT_APP_DD_ENV`                  | The environment as specified on DataDog           | `development`                                  |
| `REACT_APP_DATADOG_APPLICATION_ID`  | The application id given by DataDog               | `192cf359-ab3f-1923-0215-91afe9320bd0`         |
| `REACT_APP_DATADOG_CLIENT_TOKEN`    | The client token given by DataDog                 | `ad93e9f02cdf013491ab9ef`                      |
| `REACT_APP_DATADOG_RUM_SAMPLE_RATE` | The frequency to sample user sessions for DataDog | `1000`                                         |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
