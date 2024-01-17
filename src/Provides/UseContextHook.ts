import { MasterSubFieldWithData } from "@/utils/masters/plant";
import { createContext } from "react";
import { UseContextHookTypes } from "../../TypesStore";

export const UseContextHook = createContext<UseContextHookTypes>({
  auth: false,
  toogleSidebar: true,
  masters: MasterSubFieldWithData,
});
// storageBin: {
//   getAll: "getAllPlants",
//   getSingle: "getById",
//   create: "save",
//   createBulk: "ImportExcelData",
//   updateStatus: "updateStatusId",
//   updateBulkStatus: "updateBulkStatusId",
//   template: "exportTemplate",
//   exportPdf: "pdfReport",
//   exportExcel: "exportData",
//   delete: "delete",
//   deleteBulk: "deleteBatch",
//   update: "update",
// },
// storageLocation: {
//   getAll: "getAllPlants",
//   getSingle: "getById",
//   create: "save",
//   createBulk: "ImportExcelData",
//   updateStatus: "updateStatusId",
//   updateBulkStatus: "updateBulkStatusId",
//   template: "exportTemplate",
//   exportPdf: "pdfReport",
//   exportExcel: "exportData",
//   delete: "delete",
//   deleteBulk: "deleteBatch",
//   update: "update",
// },
