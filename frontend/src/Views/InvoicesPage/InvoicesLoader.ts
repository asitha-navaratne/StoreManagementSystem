import Service from "../../Services/InvoicesService";

const { GetInvoices } = Service();

const loader = async function () {
  return GetInvoices().catch((err) => {
    throw err;
  });
};

export default loader;
