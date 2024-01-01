import { baseAxios } from "./api.base";

export const SignUp = (data) => {
  return baseAxios.post("api/auth/signup", data);
};
