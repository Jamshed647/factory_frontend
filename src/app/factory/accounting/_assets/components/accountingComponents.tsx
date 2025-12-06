"use client";
import React from "react";

interface TableProps {
  factoryId?: string;
  switchUser?: boolean;
}

const AccountingComponents = ({ factoryId }: TableProps) => {
  return (
    <div>
      <div className="rounded-md border shadow-lg">
        {/* Table Header */}
        <div className="flex justify-between items-center p-3">
          <h2 className="text-2xl font-bold">Accounting Overview</h2>
          {/* <div className="flex gap-x-2 items-center"> */}
          {/*   <CustomField.CommonSearch */}
          {/*     width="w-full" */}
          {/*     searchText={searchText} */}
          {/*     setSearchText={setSearchText} */}
          {/*   /> */}
          {/*   <CreateBankModal factoryId={factoryId as string} /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AccountingComponents;
