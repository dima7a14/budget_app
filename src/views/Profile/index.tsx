import React from 'react';
import { useFormik } from 'formik';
import { useStore } from 'effector-react';
import classNames from 'classnames';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import globalStore from 'stores/global';

import PasswordField from 'components/PasswordField';

import { useStyles } from './styles';


const Profile: React.FC = () => {
  const classes = useStyles();
  const userStore = useStore(globalStore.user.$store);
  const formik = useFormik({
    initialValues: {
      email: userStore.email,
      userName: `${userStore.firstName} ${userStore.lastName}`,
      oldPassword: '',
      newPassword: '',
    },
    onSubmit: async ({ email, userName, oldPassword, newPassword }) => {
      const [firstName, lastName] = userName.trim().split(' ');

      await globalStore.user.api.update({ id: userStore.id, firstName, lastName, email });
      formik.resetForm({
        values: {
          email: userStore.email,
          userName: `${userStore.firstName} ${userStore.lastName}`,
          oldPassword: '',
          newPassword: '',
        },
      });
    },
  });

  return (
    <Container>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Typography variant="h4">Profile</Typography>
        <TextField
          label="E-mail"
          name="email"
          className={classes.field}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <PasswordField
          disabled
          label="Old password"
          name="oldPassword"
          className={classes.field}
          onChange={formik.handleChange}
          value={formik.values.oldPassword}
        />
        <PasswordField
          disabled
          label="New password"
          name="newPassword"
          className={classNames(classes.field, classes.newPasswordField)}
          onChange={formik.handleChange}
          value={formik.values.newPassword}
        />
        <TextField
          label="Username"
          name="userName"
          className={classes.field}
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
        <div className={classes.buttonsRow}>
          <Button
            disabled={!formik.dirty || formik.isSubmitting}
            variant="contained"
            color="primary"
            type="submit"
          >
            Save
          </Button>
          <Button
            disabled={!formik.dirty}
            variant="contained"
            color="secondary"
            onClick={formik.handleReset}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Profile;
