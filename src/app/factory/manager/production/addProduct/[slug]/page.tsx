import CreateProductToProductionModal from "@/components/pageComponents/productionComponents/addProduct/create/createProductModal";

interface InvoicePageProps {
  params: Promise<{ slug: string }>;
}

const AddProductPage = async ({ params }: InvoicePageProps) => {
  const { slug } = await params;
  return (
    <div>
      <CreateProductToProductionModal productionId={slug as string} />
    </div>
  );
};

export default AddProductPage;
