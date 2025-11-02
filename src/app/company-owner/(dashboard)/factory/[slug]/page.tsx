"use client";

import React from "react";
import FactoryAccessOverview from "@/components/pageComponents/factory-access";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

const Company_Page = ({ params }: CompanyPageProps) => {
  const { slug } = React.use(params);
  return <FactoryAccessOverview id={slug} />;
};

export default Company_Page;
