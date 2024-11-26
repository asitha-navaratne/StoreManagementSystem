import Service from "../../Services/StoreService";

const { GetStores } = Service();

const loader = async function () {
  return GetStores().catch((err) => {
    throw err;
  });
};

export default loader;
