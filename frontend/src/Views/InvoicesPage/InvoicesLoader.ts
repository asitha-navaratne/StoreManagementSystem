import Service from "../../Services/InvoicesService";

const { GetInvoices } = Service();

const loader = async function () {
  return GetInvoices().catch((err) => {
    // TODO: Handle errors properly
    console.error(err);
  });
};

export default loader;
