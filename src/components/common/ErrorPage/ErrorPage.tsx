import { Button } from "@/components/ui/custom_ui/button";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className=" h-fit py-10 px-4 w-[70%] lg:w-[40%] shadow-lg border p-4 rounded-md">
      <div className="text-center">
        <h2 className="my-3 text-lg font-bold text-red-500 lg:text-2xl">
          Something went wrong!
        </h2>
        <div className="overflow-hidden p-3 pb-6 text-sm text-center text-gray-500">
          {error?.message}
        </div>
        <Button
          variant={"primary"}
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
