# Form Validations
Quick Test of Frontend Application

This is a reactjs Application.

### Modules installed
- [reactstrap](https://reactstrap.github.io/)
- [formik](https://jaredpalmer.com/formik)
- [yup](https://www.npmjs.com/package/yup)
- [@testing-library](https://testing-library.com/docs/react-testing-library/intro)
- [reactstrap](https://reactstrap.github.io/components)

# Author
Andrew Ogaga

# Description
``` 
This application serves to validate different forms such as:
 - Full name
 - Nigerian Phone number
 - email
 - Password - One number, One Uppercase alphaber, One Lowercase alphabet, One special Character and must be greater than or equal to 6 characters.
 - Confirm Password - It must be equal to Password
 - ATM Card Number - With format XXXX XXXX XXXX XXXX
 - Expiration date - With format MM/YY
 - PIN - 4 Digits enforced

 This makes extensive use of Regular Expressions for validations and Formik functions to achieve this feat.
```

# Installation Procedure
git clone <repo link>
npm install

# Tests Run
npm test
npm test -- --coverage --watchAll

# Coverage Result

---------------------|----------|----------|----------|----------|
-------------------|
File                 |  % Stmts | % Branch |  % Funcs |  % Lines |
 Uncovered Line #s |
---------------------|----------|----------|----------|----------|
-------------------|
All files            |    70.95 |    56.38 |       56 |    71.23 |                   |
 src                 |        0 |        0 |        0 |        0 |                   |
  App.js             |        0 |      100 |        0 |        0 |              8,11 |
  index.js           |        0 |      100 |      100 |        0 |              8,13 |
  serviceWorker.js   |        0 |        0 |        0 |        0 |... 25,132,133,134 |
 src/components      |       90 |     62.5 |     37.5 |      100 |                   |
  CustomInput.jsx    |      100 |     62.5 |       20 |      100 |          10,13,16 |
  NavBar.jsx         |    83.33 |      100 |    66.67 |      100 |                   |
 src/views/Dashboard |      100 |      100 |      100 |      100 |                   |
  Dashboard.jsx      |      100 |      100 |      100 |      100 |                   |
  DashboardTabs.jsx  |      100 |      100 |      100 |      100 |                   |
 src/views/Home      |      100 |    88.46 |    95.24 |      100 |                   |
  Home.jsx           |      100 |    88.46 |       95 |      100 |... 35,157,179,199 |
  HomeContainer.jsx  |      100 |      100 |      100 |      100 |                   |
---------------------|----------|----------|----------|----------|-------------------|

Test Suites: 2 passed, 2 total
Tests:       34 passed, 34 total
Snapshots:   0 total
Time:        5.145s
Ran all test suites.
