import Service from "../../Services/SupplierService";

const { GetSuppliers } = Service();

const loader = async function () {
  return GetSuppliers().catch((err) => {
    throw err;
  });
};

export default loader;
