import { CustomField } from "@/components/common/fields/cusField";
import { Button } from "antd";
import { Plus } from "lucide-react";

interface TableToolbarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const TableTools = ({ searchText, setSearchText }: TableToolbarProps) => {
  return (
    <div className="flex justify-between items-center">
      {/* Search */}
      <div className="flex gap-x-2 items-center">
        <CustomField.CommonSearch
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </div>
      <Button size="large" type="primary">
        <Plus /> Create Super Admin
      </Button>
    </div>
  );
};

export default TableTools;
