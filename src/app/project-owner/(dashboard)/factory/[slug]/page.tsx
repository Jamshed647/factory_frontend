"use client";

import FactoryAccessOverview from "@/components/pageComponents/factoryComponents/factoryOverview";
import React from "react";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

const Company_Page = ({ params }: CompanyPageProps) => {
  const { slug } = React.use(params);
  return <FactoryAccessOverview id={slug} />;
};

export default Company_Page;
