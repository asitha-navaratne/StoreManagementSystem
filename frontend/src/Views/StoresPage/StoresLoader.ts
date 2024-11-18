import Service from "../../Services/StoreService";

const { GetStores } = Service();

const loader = async function () {
  return GetStores().catch((err) => {
    // TODO: Handle errors properly
    console.error(err);
  });
};

export default loader;
