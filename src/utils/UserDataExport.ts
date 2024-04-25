import apiLogin from "@/components/apiLogin";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { Dispatch, SetStateAction } from "react";
import {
  PrivilageInitialStateProps,
  SingleUserInfoProps,
} from "../../TypesStore";

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
export const PrivilageInitialState: PrivilageInitialStateProps = {
  id: 0,
  name: "",
  status: false,
  updateAuditHistories: [],
  createdBy: "",
  createdAt: "",
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
export const textCompStyle = {
  color: PrimaryTextColor,
  display: "flex",
  justifyContent: "space-between",
};

export const defaultProfileImage = "/images/AdminSvg.svg";
