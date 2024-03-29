import apiLogin from "@/components/apiLogin";
import { Dispatch, SetStateAction } from "react";
import { SingleUserInfoProps } from "../../TypesStore";

export const UserInitialState = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
  business: "",
  departmentId: 0,
  plantId: [] as number[],
  status: false,
  roles: [],
};
export const RoleInitialState = {
  name: "",
  description: "",
  plantId: 0,
  status: false,
  privileges: [] as number[],
};

export async function singleUserDataHandler(
  Token: string,
  setUser: Dispatch<SetStateAction<SingleUserInfoProps>>
) {
  const resMe = await apiLogin.get("/user/me", {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  const resData = await resMe?.data; // Extract data from response
  if (resMe.status === 200) {
    setUser(resData);
  }
}
