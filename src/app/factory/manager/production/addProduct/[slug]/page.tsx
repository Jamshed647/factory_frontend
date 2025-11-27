import CreateProductToProductionModal from "@/components/pageComponents/productionComponents/addProduct/create/createProductModal";

interface AddProductPageType {
  params: {
    slug: string;
  };
}

const AddProductPage = ({ params }: AddProductPageType) => {
  console.log("params", params?.slug);
  return (
    <div>
      <CreateProductToProductionModal productionId={params?.slug} />
    </div>
  );
};

export default AddProductPage;
