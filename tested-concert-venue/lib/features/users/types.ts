export interface Id {
  id: number;
}

export interface NewUser {
  email: string;
  name?: string;
  address?: string;
  phone?: string;
  token?: string;
}

export interface User extends Id, NewUser {}

export interface PasswordHash {
  salt: string;
  hash: string;
  iterations: number;
  keylen: number;
  digest: string;
}

export interface NewAuthUser extends NewUser, PasswordHash {}
export interface AuthUser extends User, PasswordHash {}
