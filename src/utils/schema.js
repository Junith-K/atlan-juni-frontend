const territories = [
    { columnName: "territoryID", dataType: "integer" },
    { columnName: "territoryDescription", dataType: "string"},
    { columnName: "regionID", dataType: "integer" },
]

const suppliers = [
    { columnName: "supplierID", dataType: "integer" },
    { columnName: "companyName", dataType: "string" },
    { columnName: "contactName", dataType: "string" },
    { columnName: "contactTitle", dataType: "string" },
    { columnName: "address", dataType: "string" },
    { columnName: "city", dataType: "string" },
    { columnName: "region", dataType: "string" },
    { columnName: "postalCode", dataType: "string" },
    { columnName: "country", dataType: "string" },
    { columnName: "phone", dataType: "string" },
    { columnName: "fax", dataType: "string" },
    { columnName: "homePage", dataType: "string" },
]

const products = [
    { columnName: "productID", dataType: "integer" },
    { columnName: "productName", dataType: "string" },
    { columnName: "supplierID", dataType: "integer" },
    { columnName: "categoryID", dataType: "integer" },
    { columnName: "quantityPerUnit", dataType: "string" },
    { columnName: "unitPrice", dataType: "float" },
    { columnName: "unitsInStock", dataType: "integer" },
    { columnName: "unitsOnOrder", dataType: "integer" },
    { columnName: "reorderLevel", dataType: "integer" },
    { columnName: "discontinued", dataType: "integer" },
]

export {suppliers, products, territories};