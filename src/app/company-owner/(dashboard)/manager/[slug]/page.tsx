"use client";

import ManagerOverview from "@/components/pageComponents/managerComponents/managerOverview";
import React from "react";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

const Company_Page = ({ params }: CompanyPageProps) => {
  const { slug } = React.use(params);
  return (
    <div className="space-y-6">
      <ManagerOverview id={slug} />
    </div>
  );
};

export default Company_Page;
