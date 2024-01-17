import api from "@/components/api";

export const getAllPlantData = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};
export const MasterSubFieldWithData = {
  Plant: {
    getAll: "/plant/getAllPlant",
    getSingle: "/plant/getPlantById",
    create: "/plant/savePlant",
    createBulk: "/plant/ImportExcelDataPlant",
    updateStatus: "/plant/updatePlantStatusId",
    updateBulkStatus: "/plant/updateBulkStatusPlantId",
    template: "/plant/exportTemplatePlant",
    exportPdf: "/plant/pdfPlantReport",
    exportExcel: "/plant/exportDataPlant",
    delete: "/plant/deletePlant",
    deleteBulk: "/plant/deleteBatchPlant",
    update: "/plant/updatePlant",
  },
  ProfitCenter: {
    getAll: "/plant/getAllProfitCenter",
    getSingle: "/plant/getProfitCenterById",
    create: "/plant/saveProfitCenter",
    createBulk: "/plant/ImportExcelDataProfit",
    updateStatus: "/plant/updateProfitCenterStatusById",
    updateBulkStatus: "/plant/updateBulkStatusProfitCentertId",
    template: "/plant/exportTemplateProfit",
    exportPdf: "/plant/pdfProfitCenterReport",
    exportExcel: "/plant/exportDataProfit",
    delete: "/plant/deleteProfitCenter",
    deleteBulk: "/plant/deleteBatchProfitCenter",
    update: "/plant/updateProfitCenter",
  },
};
