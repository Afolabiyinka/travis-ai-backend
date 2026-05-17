export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  profilePic: string;
}

export type LoginPayload = Omit<RegisterPayload, "username">;

export type DecodedUser = {
  id: string;
  email: string;
  username: string;
};
