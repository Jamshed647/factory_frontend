"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, User } from "lucide-react";
import { UserProfile } from "@/lib/data/profile-data";

interface FactoryAccessProps {
  profile: UserProfile;
}

export function FactoryAccess({ profile }: FactoryAccessProps) {
  if (!profile.factories || profile.factories.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <Building2 className="w-5 h-5" />
          Factory Access
        </CardTitle>
        <CardDescription>
          Factories you have access to and your roles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profile.factories.map((factory) => (
            <div
              key={factory.id}
              className="flex justify-between items-center p-4 rounded-lg border transition-colors hover:bg-gray-50"
            >
              <div className="flex gap-4 items-center">
                <div className="flex justify-center items-center w-12 h-12 bg-blue-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {factory.name}
                  </h4>
                  <div className="flex gap-4 items-center mt-1 text-sm text-gray-600">
                    <span className="flex gap-1 items-center">
                      <User className="w-4 h-4" />
                      {factory.role}
                    </span>
                    <span className="flex gap-1 items-center">
                      <MapPin className="w-4 h-4" />
                      Location
                    </span>
                  </div>
                </div>
              </div>

              <Badge
                variant={factory.status === "active" ? "default" : "secondary"}
                className="ml-4"
              >
                {factory.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
          ))}
        </div>

        {profile.role === "COMPANY_OWNER" && (
          <div className="p-3 mt-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              💡 As a Company Owner, you have full access to all factories under
              your company.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
