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
