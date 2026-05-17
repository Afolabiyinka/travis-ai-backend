export interface updateProfilePayload {
  username: string;
  profilePic: string;
  email: string;
  id: number | string;
}

export interface UpdatePasswordPayload {
  id: number | string;
  newPassword: string;
  oldPassword: string;
}
