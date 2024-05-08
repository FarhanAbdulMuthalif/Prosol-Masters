import { MaterialMasterRootProps } from "../../../TypesStore";

export const MaterialMasteresData: MaterialMasterRootProps = {
  name: "MaterialMaster",
  isField: false,
  isHaveSubForm: true,
  formFields: [
    {
      name: "sourceDesc",
      isField: true,
      isHaveSubForm: false,
      formFields: [],
      displayName: "Source Desc",
      view: true,
      modify: true,
    },

    {
      name: "noun",
      isField: true,
      formFields: [],
      displayName: "Noun",
      isHaveSubForm: false,
      view: true,
      modify: true,
    },
    {
      name: "modifier",
      isField: true,
      formFields: [],
      displayName: "Modifier",
      isHaveSubForm: false,
      view: true,
      modify: true,
    },
    {
      name: "UOM",
      isField: true,
      formFields: [],
      displayName: "UOM",
      isHaveSubForm: false,
      view: true,
      modify: true,
    },
    {
      name: "itemType",
      isField: true,
      formFields: [],
      displayName: "Item Type",
      isHaveSubForm: false,
      view: true,
      modify: false,
    },
    {
      name: "description",
      isField: false,
      displayName: "Description",
      isHaveSubForm: true,
      view: true,
      modify: true,
      formFields: [
        {
          name: "characteristics",
          isField: false,
          displayName: "Characteristics",
          isHaveSubForm: true,
          view: true,
          modify: true,
          formFields: [
            {
              name: "characteristics",
              isField: true,
              formFields: [],
              displayName: "Characteristics",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "shortDesc",
              isField: true,
              formFields: [],
              displayName: "Short Description",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "longDesc",
              isField: true,
              formFields: [],
              displayName: "Long Description",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "additionalDataForDesc",
              isField: true,
              formFields: [],
              displayName: "Additional Data For Desc",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "missingValue",
              isField: true,
              formFields: [],
              displayName: "Missing Value",
              isHaveSubForm: false,
              view: true,
              modify: false,
            },
            {
              name: "enrichedValue",
              isField: true,
              formFields: [],
              displayName: "Enriched Value",
              isHaveSubForm: false,
              view: true,
              modify: false,
            },
            {
              name: "repeatedValue",
              isField: true,
              formFields: [],
              displayName: "Repeated Value",
              isHaveSubForm: false,
              view: true,
              modify: false,
            },
          ],
        },
        {
          name: "equipment",
          isField: false,
          isHaveSubForm: false,
          view: true,
          modify: true,
          displayName: "Equipment Details",
          formFields: [
            {
              name: "equipmentName",
              isField: true,
              formFields: [],
              displayName: "Equipment Name",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "equipmentModelNo",
              isField: true,
              formFields: [],
              displayName: "Equipment Model No",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "equipmentMFR",
              isField: true,
              formFields: [],
              displayName: "Equipment MFR",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "equipmentTagNo",
              isField: true,
              formFields: [],
              displayName: "Equipment Tag No",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "equipmentInformation",
              isField: true,
              formFields: [],
              displayName: "Equipment Information",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "equipmentSerialNo",
              isField: true,
              formFields: [],
              displayName: "Equipment Serial No",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
          ],
        },

        {
          name: "vendor",
          isField: false,
          displayName: "Vendor Details",
          isHaveSubForm: true,
          view: true,
          modify: true,
          formFields: [],
        },
        {
          name: "HSN",
          isField: false,
          displayName: "HSN Details",
          isHaveSubForm: true,
          view: true,
          modify: true,
          formFields: [
            {
              name: "search",
              isField: true,
              formFields: [],
              displayName: "Search",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "HSNId",
              isField: true,
              formFields: [],
              displayName: "HSN ID",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "HSNDesc",
              isField: true,
              formFields: [],
              displayName: "HSN Description",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
          ],
        },
      ],
    },
    {
      name: "ERPData",
      isField: false,
      displayName: "ERP Data",
      isHaveSubForm: true,
      view: true,
      modify: true,
      formFields: [
        {
          name: "plant",
          isField: false,
          displayName: "Plant",
          isHaveSubForm: true,
          view: true,
          modify: true,
          formFields: [
            {
              name: "plant",
              isField: true,
              formFields: [],
              displayName: "Plant",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "priceControl",
              isField: true,
              formFields: [],
              displayName: "Price Control",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "profitCenter",
              isField: true,
              formFields: [],
              displayName: "Profit Center",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "standardPrice",
              isField: true,
              formFields: [],
              displayName: "Standard Price",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "storageLocation",
              isField: true,
              formFields: [],
              displayName: "Storage Location",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "movingAvgPrice",
              isField: true,
              formFields: [],
              displayName: "Moving Avg. Price",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "storageBin",
              isField: true,
              formFields: [],
              displayName: "Storage Bin",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "valuationCategory",
              isField: true,
              formFields: [],
              displayName: "Valuation Category",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "materialType",
              isField: true,
              formFields: [],
              displayName: "Material Type",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "varianceKey",
              isField: true,
              formFields: [],
              displayName: "Variance Key",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "valuationClass",
              isField: true,
              formFields: [],
              displayName: "Valuation Class",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "batchManagement",
              isField: true,
              formFields: [],
              displayName: "Batch Management",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "valuationType",
              isField: true,
              formFields: [],
              displayName: "Valuation Type",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "serialNoProfile",
              isField: true,
              formFields: [],
              displayName: "Serial No. Profile",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
          ],
        },
        {
          name: "general",
          isField: false,
          displayName: "General",
          isHaveSubForm: true,
          view: true,
          modify: true,
          formFields: [
            {
              name: "industrySector",
              isField: true,
              formFields: [],
              displayName: "Industry Sector",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "inspectionType",
              isField: true,
              formFields: [],
              displayName: "Inspection Type",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "baseUOP",
              isField: true,
              formFields: [],
              displayName: "Base UOP",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "inspectionCode",
              isField: true,
              formFields: [],
              displayName: "Inspection Code",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "unitOfIssue",
              isField: true,
              formFields: [],
              displayName: "Unit of Issue",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "oldMaterialNo",
              isField: true,
              formFields: [],
              displayName: "Old Material No.",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "alternateUOM",
              isField: true,
              formFields: [],
              displayName: "Alternate UOM",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "divisiom",
              isField: true,
              formFields: [],
              displayName: "Division",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "numerator",
              isField: true,
              formFields: [],
              displayName: "Numerator",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "salesUnit",
              isField: true,
              formFields: [],
              displayName: "Sales Unit",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "denominator",
              isField: true,
              formFields: [],
              displayName: "Denominator",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
          ],
        },
        {
          name: "MRPData",
          isField: false,
          displayName: "MRP Data",
          isHaveSubForm: true,
          view: true,
          modify: true,
          formFields: [
            {
              name: "MRPType",
              isField: true,
              formFields: [],
              displayName: "MRP Type",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "MRPController",
              isField: true,
              formFields: [],
              displayName: "MRP Controller",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "quantity",
              isField: true,
              formFields: [],
              displayName: "Quantity",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "reOrderPoint",
              isField: true,
              formFields: [],
              displayName: "Re-Order Point",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "LOTSize",
              isField: true,
              formFields: [],
              displayName: "LOT Size",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "maxStockLevel",
              isField: true,
              formFields: [],
              displayName: "Max. Stock Level",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "minStockLevel",
              isField: true,
              formFields: [],
              displayName: "Min. Stock Level",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "procurementType",
              isField: true,
              formFields: [],
              displayName: "Procurement Type",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "planninggStrgyGrp",
              isField: true,
              formFields: [],
              displayName: "Planning Strategy Group",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "plannedDeliveryTime",
              isField: true,
              formFields: [],
              displayName: "Planned Delivery Time",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "availCheck",
              isField: true,
              formFields: [],
              displayName: "Availability Check",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "scheduleMargin",
              isField: true,
              formFields: [],
              displayName: "Schedule Margin",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "safetyStock",
              isField: true,
              formFields: [],
              displayName: "Safety Stock",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
          ],
        },
        {
          name: "salesAndOthers",
          isField: false,
          displayName: "Sales & Others",
          isHaveSubForm: true,
          view: true,
          modify: true,
          formFields: [
            {
              name: "accAsignmtCategory",
              isField: true,
              formFields: [],
              displayName: "Acc Asignmt Category",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "purchasingValueKey",
              isField: true,
              formFields: [],
              displayName: "Purchasing Value Key",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "goodsReceptProcessingTime",
              isField: true,
              formFields: [],
              displayName: "Goods Recept Processing Time",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "taxClassification1",
              isField: true,
              formFields: [],
              displayName: "Tax Classification 1",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "taxClassification2",
              isField: true,
              formFields: [],
              displayName: "Tax Classification 2",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "transportationGroup",
              isField: true,
              formFields: [],
              displayName: "Transportation Group",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "loadingGroup",
              isField: true,
              formFields: [],
              displayName: "Loading Group",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "salesText",
              isField: true,
              formFields: [],
              displayName: "Sales Text",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "orderUnit",
              isField: true,
              formFields: [],
              displayName: "Order Unit",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "itemCategoryGroup",
              isField: true,
              formFields: [],
              displayName: "Item Category Group",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "salesOrganization",
              isField: true,
              formFields: [],
              displayName: "Sales Organization",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "deliveringPlant",
              isField: true,
              formFields: [],
              displayName: "Delivering Plant",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "automaticPO",
              isField: true,
              formFields: [],
              displayName: "Automatic PO",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "distributionChannel",
              isField: true,
              formFields: [],
              displayName: "Distribution Channel",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "materialGroup",
              isField: true,
              formFields: [],
              displayName: "Material Group",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
            {
              name: "purchasingGroup",
              isField: true,
              formFields: [],
              displayName: "Purchasing Group",
              isHaveSubForm: false,
              view: true,
              modify: true,
            },
          ],
        },
      ],
    },
    {
      name: "codeLogic",
      isField: false,
      displayName: "Code Logic",
      isHaveSubForm: true,
      view: true,
      modify: true,
      formFields: [
        {
          name: "classTitle",
          isField: false,
          displayName: "Class Title",
          isHaveSubForm: false,
          view: true,
          modify: true,
          formFields: [],
        },
        {
          name: "class",
          isField: false,
          displayName: "Class",
          isHaveSubForm: false,
          view: true,
          modify: true,
          formFields: [],
        },
        {
          name: "commodityTitle",
          isField: false,
          displayName: "Commodity Title",
          isHaveSubForm: false,
          view: true,
          modify: true,
          formFields: [],
        },
        {
          name: "commodity",
          isField: false,
          displayName: "Commodity",
          isHaveSubForm: false,
          view: true,
          modify: true,
          formFields: [],
        },
      ],
    },
    {
      name: "attachment",
      isField: false,
      displayName: "Attachment",
      isHaveSubForm: true,
      view: true,
      modify: true,
      formFields: [
        {
          name: "file",
          isField: false,
          displayName: "File",
          isHaveSubForm: false,
          view: true,
          modify: true,
          formFields: [],
        },
      ],
    },
  ],
};