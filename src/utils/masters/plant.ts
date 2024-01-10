import api from "@/components/api";

export const getAllPlantData = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};
