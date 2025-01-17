import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../helpers/Firebase';
import axios from 'axios';

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

import { adminRoot, currentUser,loginAPI } from "../../constants/defaultValues"
import { setCurrentUser,getCurrentUser } from '../../helpers/Utils';

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (credentials) =>
 


  await  axios.post(loginAPI,  credentials )
      .then((user) => user)
      .catch(res => {
        //console.log(res);
      });

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
     const credentials = new FormData();
      credentials.append("username", email);
      credentials.append("password", password);
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, credentials);
     // const item = { uid: loginUser.data.msg, ...currentUser };
     // const item = { uid: loginUser.data.userdetail.id,...currentUser };
    if (loginUser.data.status===1) {
      //const item = { uid: loginUser.user.uid, ...currentUser };
      const item = loginUser.data.data;
      setCurrentUser(item);
      yield put(loginUserSuccess(item));
      if(item.roles[0] == 1){
        history.push(adminRoot+"/dashboard/operator");
      }
      else if(item.roles[0] == 4){
        history.push(adminRoot+"/dashboard/manager");
      }
      else if(item.roles[0] == 3){
        history.push(adminRoot+"/dashboard/admin");
      }
      else{
        //history.push(adminRoot+"/gogo/start");
      } 
    } else {
      yield put(loginUserError(loginUser.data.msg));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      const item = { uid: registerUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
