This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

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

## File Structure

Within the download you'll find the following directories and files:

```
material-dashboard-pro-react
.
├── CHANGELOG.md
├── ISSUE_TEMPLATE.md
├── README.md
├── gulpfile.js
├── jsconfig.json
├── package.json
├── documentation
│   ├── assets
│   │   ├── css
│   │   ├── img
│   │   │   └── faces
│   │   └── js
│   └── tutorial-components.html
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── assets
    │   ├── github
    │   │   └── material-dashboard-pro-react.gif
    │   ├── img
    │   │   ├── faces
    │   │   ├── flags
    │   │   ├── logo-white.svg
    │   │   └── logo.svg
    │   ├── jss
    │   │   ├── material-dashboard-pro-react
    │   │   │   ├── components
    │   │   │   ├── layouts
    │   │   │   └── views
    │   │   └── material-dashboard-pro-react.js
    │   └── scss
    │       ├── material-dashboard-pro-react
    │       │   ├── mixins
    │       │   └── plugins
    │       └── material-dashboard-pro-react.scss
    ├── components
    │   ├── Accordion
    │   │   └── Accordion.js
    │   ├── Badge
    │   │   └── Badge.js
    │   ├── Card
    │   │   ├── Card.js
    │   │   ├── CardAvatar.js
    │   │   ├── CardBody.js
    │   │   ├── CardFooter.js
    │   │   ├── CardHeader.js
    │   │   ├── CardIcon.js
    │   │   └── CardText.js
    │   ├── Clearfix
    │   │   └── Clearfix.js
    │   ├── CustomButtons
    │   │   └── Button.js
    │   ├── CustomDropdown
    │   │   └── CustomDropdown.js
    │   ├── CustomInput
    │   │   └── CustomInput.js
    │   ├── CustomLinearProgress
    │   │   └── CustomLinearProgress.js
    │   ├── CustomTabs
    │   │   └── CustomTabs.js
    │   ├── CustomUpload
    │   │   ├── ImageUpload.js
    │   │   └── PictureUpload.js
    │   ├── FixedPlugin
    │   │   └── FixedPlugin.js
    │   ├── Footer
    │   │   └── Footer.js
    │   ├── Grid
    │   │   ├── GridContainer.js
    │   │   └── GridItem.js
    │   ├── Heading
    │   │   └── Heading.js
    │   ├── InfoArea
    │   │   └── InfoArea.js
    │   ├── Instruction
    │   │   └── Instruction.js
    │   ├── NavPills
    │   │   └── NavPills.js
    │   ├── Navbars
    │   │   ├── AdminNavbar.js
    │   │   ├── AdminNavbarLinks.js
    │   │   └── AuthNavbar.js
    │   ├── Pagination
    │   │   └── Pagination.js
    │   ├── Sidebar
    │   │   └── Sidebar.js
    │   ├── Snackbar
    │   │   ├── Snackbar.js
    │   │   └── SnackbarContent.js
    │   ├── Table
    │   │   └── Table.js
    │   ├── Tasks
    │   │   └── Tasks.js
    │   ├── Timeline
    │   │   └── Timeline.js
    │   ├── Typography
    │   │   ├── Danger.js
    │   │   ├── Info.js
    │   │   ├── Muted.js
    │   │   ├── Primary.js
    │   │   ├── Quote.js
    │   │   ├── Success.js
    │   │   └── Warning.js
    │   └── Wizard
    │       └── Wizard.js
    ├── index.js
    ├── layouts
    │   ├── Admin.js
    │   ├── Auth.js
    │   └── RTL.js
    ├── routes.js
    ├── variables
    │   ├── charts.js
    │   └── general.js
    └── views
        ├── Calendar
        │   └── Calendar.js
        ├── Charts
        │   └── Charts.js
        ├── Components
        │   ├── Buttons.js
        │   ├── GridSystem.js
        │   ├── Icons.js
        │   ├── Notifications.js
        │   ├── Panels.js
        │   ├── SweetAlert.js
        │   └── Typography.js
        ├── Dashboard
        │   └── Dashboard.js
        ├── Forms
        │   ├── ExtendedForms.js
        │   ├── RegularForms.js
        │   ├── ValidationForms.js
        │   ├── Wizard.js
        │   └── WizardSteps
        │       ├── Step1.js
        │       ├── Step2.js
        │       └── Step3.js
        ├── Maps
        │   ├── FullScreenMap.js
        │   ├── GoogleMaps.js
        │   └── VectorMap.js
        ├── Pages
        │   ├── ErrorPage.js
        │   ├── LockScreenPage.js
        │   ├── LoginPage.js
        │   ├── PricingPage.js
        │   ├── RTLSupport.js
        │   ├── RegisterPage.js
        │   ├── Timeline.js
        │   └── UserProfile.js
        ├── Tables
        │   ├── ExtendedTables.js
        │   ├── ReactTables.js
        │   └── RegularTables.js
        └── Widgets
            └── Widgets.js
```
