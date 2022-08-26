import axios, { AxiosResponse } from 'axios';
import { LoginParamsType, ResponseTypeAPI } from './types';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': 'abb3a345-b7d8-4f0f-8c61-af2582f7869f',
  },
});

export const usersAPI = {
  getUsers(params: GetUsersParamsType) {
    return (
      instance
        .get(`users`, {params: {...params}}));
  },
  followPostRequest(userId: number) {
    return (
      instance
        .post(`follow/${userId}`)
        .then((response) => response.data)
    );
  },
  unFollowDeleteRequest(userId: number) {
    return (
      instance
        .delete(`/follow/${userId}`)
        .then((response) => response.data)
    );
  },
};

export const authAPI = {
  me() {
    return (
      instance
        .get<{ email: string, password: string, rememberMe?: boolean, captcha?: string },
          AxiosResponse<ResponseTypeAPI<{ id: number, login: string, email: string }>>>(`auth/me`)
    );
  },
  loginRequest(email: string, password: string, rememberMe: boolean = false) {
    return (
      instance.post<LoginParamsType, AxiosResponse<ResponseTypeAPI<{ userId: number }>>>
      (`/auth/login`, { email, password, rememberMe })
    );
  },
  logoutRequest() {
    return instance.delete(`/auth/login`);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return (
      instance.get(`/profile/${userId}`)
    );
  },
  updateProfile(updatedProfile: UpdateProfileModelType) {
    return instance.put(`/profile`, updatedProfile);
  },
  getStatus(userId: number) {
    return (
      instance.get(`/profile/status/${userId}`)
    );
  },
  updateStatus(status: string) {
    return instance.put(`/profile/status`, { status });
  },
};

type GetUsersParamsType = {
  count: number
  page: number
  term?: string
  friend?: boolean
}

type UpdateProfileModelType = {

}
