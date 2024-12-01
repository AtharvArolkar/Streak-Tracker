import { JWTPayload } from "jose";
import { Document } from "mongoose";

export interface User extends Document {
  email: string;
  phoneNumber: number;
  name: string;
  password: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetAccessRefreshResponse {
  accessToken?: string;
  refreshToken?: string;
  error?: string;
}

export interface GetAccessResponse {
  accessToken: string;
}

export interface GetAccessRefreshPayload {
  identifier: string;
}

export interface ChangePasswordPayload {
  identifier?: string;
  oldPassword?: string;
  newPassword: string;
}

export interface GetUserPayload {
  identifier: string;
}

export interface GetUserResponse {
  user: User;
}

export interface JWTPayloadObject extends JWTPayload {
  identifier: string;
  exp?: number;
  iat?: number;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
  isVerified: boolean;
}

export interface UserListPayload {
  search?: string;
}
