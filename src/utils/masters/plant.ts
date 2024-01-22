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
    updateStatus: "/plant/updatePlantStatusById",
    updateBulkStatus: "/plant/updateBulkStatusPlantId",
    template: "/plant/exportTemplatePlant",
    exportPdf: "/plant/pdfPlantReport",
    exportExcel: "/plant/exportDataPlant",
    delete: "/plant/deletePlant",
    deleteBulk: "/plant/deleteBatchPlant",
    update: "/plant/updatePlant",
    includePlantDropdown: false,
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
    includePlantDropdown: true,
  },
  PriceControl: {
    getAll: "/plant/getAllPriceControl",
    getSingle: "/plant/getPriceControlById",
    create: "/plant/savePriceControl",
    createBulk: "/plant/ImportExcelDataPrice",
    updateStatus: "/plant/updatePriceControlById",
    updateBulkStatus: "/plant/updateBulkStatusPriceControlId",
    template: "/plant/exportTemplatePrice",
    exportPdf: "/plant/pdfPriceControlReport",
    exportExcel: "/plant/exportDataPrice",
    delete: "/plant/deletePriceControl",
    deleteBulk: "/plant/deleteBatchPriceControl",
    update: "/plant/updatePriceControl",
    includePlantDropdown: false,
  },
};
