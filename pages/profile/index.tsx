import React, { ChangeEvent, FormEvent, useState } from 'react';
import { CreateUserDto, LoginDto } from '@Api/user/types';
import { UserApi } from '@Api/user';
import { setCookie } from 'nookies';
import { useAppDispatch, useAppSelector } from '@Redux/hooks';
import { selectUserData, setUserData } from '@Redux/slices/user';

const registerInitialValue = {
  username: '',
  email: '',
  password: '',
};

const loginInitialValue = {
  identifier: '',
  password: '',
};

const Profile = () => {
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const [registerValues, setRegisterValues] =
    useState<CreateUserDto>(registerInitialValue);
  const [loginValues, setLoginValues] = useState<LoginDto>(loginInitialValue);

  const handleChangeRegisterValues = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterValues({
      ...registerValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeValues = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValues({
      ...loginValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await UserApi.register(registerValues);
      setCookie(null, 'token', data.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      dispatch(setUserData(data));
    } catch (err) {
      console.warn('Register Error', err);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await UserApi.login(loginValues);
      setCookie(null, 'token', data.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      dispatch(setUserData(data));
    } catch (err) {
      console.warn('Register Error', err);
    }
  };

  return (
    <>
      {userData ? (
        <h1>Profile</h1>
      ) : (
        <>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              onChange={handleChangeRegisterValues}
              name="username"
              value={registerValues.username}
            />
            <input
              type="text"
              onChange={handleChangeRegisterValues}
              name="email"
              value={registerValues.email}
            />
            <input
              type="text"
              onChange={handleChangeRegisterValues}
              name="password"
              value={registerValues.password}
            />
            <button>Register</button>
          </form>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              onChange={handleChangeValues}
              name="identifier"
              value={loginValues.identifier}
            />
            <input
              type="text"
              onChange={handleChangeValues}
              name="password"
              value={loginValues.password}
            />
            <button>Login</button>
          </form>
        </>
      )}
    </>
  );
};

export default Profile;
