This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setting up the project

Ensure you have node `v14.19.3` (check using `node -v`). If not, install it manually or use [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) [Recommended Approach]

Run `npm i` to install all dependencies

## Configuring the project

You can change the backend api environment that `redeem-api` calls by sourcing the respective `.env` file. For example, to use staging environment, change the source to `.env.staging`:

```
source .env.staging
```

## Running the project

```
npm run start
```

## Testing

Since our Redeem projects are in different repositories, it is hard to test every component independently. Thus, we do simulated end-to-end (e2e) testing for frontend projects by mocking `redeem-api` responses. Our tests are under `/tests/e2e`.

We use [Percy](https://docs.percy.io/docs) and [Playwright](https://playwright.dev/docs/intro) to facilitate this e2e testing.

### Running E2E tests locally

Although `npm i` installs `percy` and `playwright` for us, we need to download the required browsers for `playwright`. Run:

```
npx playwright install
```

to install the required browsers for our project.

Once the above one-time setup is completed, run the tests using this command:

```
npm run test:e2e
```

## Learn More about Create React App

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
