"use client";

import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

interface CompanyPageProps {
  params: {
    slug: string;
  };
}

const Company_Page = ({ params }: CompanyPageProps) => {
  const { slug } = params;

  const { data, isLoading } = useFetchData({
    path: `api/v1/auth/company/user/${slug}`,
    queryKey: "fetch single company",
  });

  const user = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading company info...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        No company found.
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-center items-center p-6 min-h-screen bg-muted/30">
        <Card className="overflow-hidden w-full max-w-md bg-white rounded-2xl shadow-lg dark:bg-neutral-900">
          <CardContent className="flex flex-col items-center p-6 space-y-4 text-center">
            {/* Profile Image */}
            {user.photo ? (
              <Image
                src={user.photo}
                alt={user.name}
                width={120}
                height={120}
                className="object-cover rounded-full border-4 shadow-md border-primary"
              />
            ) : (
              <div className="flex justify-center items-center w-28 h-28 text-4xl font-semibold rounded-full border-4 shadow-md bg-primary/10 text-primary border-primary">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* User Info */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                {user.name}
              </h2>
              {/* <Badge */}
              {/*   variant={user.status === "ACTIVE" ? "default" : "secondary"} */}
              {/*   className="mt-2" */}
              {/* > */}
              {/*   {user.status} */}
              {/* </Badge> */}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-muted-foreground">
              <div className="flex gap-2 justify-center items-center">
                <Mail size={16} /> {user.email}
              </div>
              <div className="flex gap-2 justify-center items-center">
                <Phone size={16} /> {user.phone}
              </div>
              <div className="flex gap-2 justify-center items-center">
                <MapPin size={16} /> {user.address}
              </div>
            </div>

            {/* Meta Info */}
            <div className="pt-4 w-full text-xs border-t text-muted-foreground">
              <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Company_Page;
