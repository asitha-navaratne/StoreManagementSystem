import Service from "../../Services/SupplierService";

const { GetSuppliers } = Service();

const loader = async function () {
  return GetSuppliers().catch((err) => {
    // TODO: Handle errors properly
    console.error(err);
  });
};

export default loader;
