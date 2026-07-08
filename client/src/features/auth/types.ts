export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoggedInUser {
  id: string;
  email: string;
  role: string;
  token: string;
}
