import apiLogin from "@/components/apiLogin";

export const getUserTheme = async (data: string) => {
  const resTheme = await apiLogin.get("/userSettings/getFont", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });

  const resDataTheme = await resTheme?.data; // Extract data from response

  if (resTheme.status === 200) {
    return resDataTheme;
  }
  return "No Data";
};
