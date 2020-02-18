import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

import { paths } from 'router';

// import DefaultLayout from 'layouts/Default';

// import SignInForm from './SignInForm';
// import SignUpForm from './SignUpForm';
// import { useStyles } from './styles';


// TODO: add Formik

/** Component */
// const Auth: React.FC = () => {
//   const classes = useStyles();
//   const location = useLocation();

//   return (
//     <>
//       <DefaultLayout>
//         <div className={classes.forms}>
//           <CSSTransition
//             in={location.pathname === paths.signIn.path}
//             timeout={1000}
//             unmountOnExit
//             classNames={{
//               enter: classes.signInEnter,
//               enterActive: classes.signInEnterActive,
//               exit: classes.signInExit,
//               exitActive: classes.signInExitActive,
//             }}
//           >
//             <SignInForm className={classes.form} />
//           </CSSTransition>
//           <CSSTransition
//             in={location.pathname === paths.signUp.path}
//             timeout={500}
//             unmountOnExit
//             classNames={{
//               enter: classes.signUpEnter,
//               enterActive: classes.signUpEnterActive,
//               exit: classes.signUpExit,
//               exitActive: classes.signUpExitActive,
//             }}
//           >
//             <SignUpForm className={classes.form} />
//           </CSSTransition>
//         </div>
//       </DefaultLayout>
//     </>
//   );
// };

const Auth: React.FC = () => <div>Auth</div>

export default Auth;
