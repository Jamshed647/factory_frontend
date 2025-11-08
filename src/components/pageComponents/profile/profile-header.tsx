"use client";
import { Camera, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfile } from "@/lib/data/profile-data";

interface ProfileHeaderProps {
  profile: UserProfile;
  onEdit: () => void;
  onAvatarChange: () => void;
  canEdit: boolean;
}

export function ProfileHeader({
  profile,
  onEdit,
  onAvatarChange,
  canEdit,
}: ProfileHeaderProps) {
  const getRoleBadgeColor = (role: string) => {
    const colors = {
      PROJECT_OWNER: "bg-purple-100 text-purple-800 border-purple-200",
      COMPANY_OWNER: "bg-blue-100 text-blue-800 border-blue-200",
      MANAGER: "bg-green-100 text-green-800 border-green-200",
      SALESMAN: "bg-orange-100 text-orange-800 border-orange-200",
      EMPLOYEE: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[role as keyof typeof colors] || colors.EMPLOYEE;
  };

  const getRoleDisplayName = (role: string) => {
    const names = {
      PROJECT_OWNER: "JangoSoft Admin",
      COMPANY_OWNER: "Company Owner",
      MANAGER: "Factory Manager",
      SALESMAN: "Sales Executive",
      EMPLOYEE: "Factory Worker",
    };
    return names[role as keyof typeof names] || role;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 items-center md:flex-row">
          {/* Avatar Section */}
          <div className="relative group">
            <div className="flex overflow-hidden relative justify-center items-center w-24 h-24 text-2xl font-bold text-white bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              )}
            </div>
            <button
              onClick={onAvatarChange}
              className="flex absolute right-0 bottom-0 justify-center items-center w-8 h-8 text-white bg-blue-600 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col gap-3 mb-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.name}
              </h1>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(profile.role)}`}
              >
                {getRoleDisplayName(profile.role)}
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  profile.status === "active"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {profile.status === "active" ? "Active" : "Inactive"}
              </div>
            </div>

            <p className="mb-1 text-gray-600">{profile.email}</p>
            <p className="mb-4 text-gray-600">{profile.phone}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>
                Joined: {new Date(profile.joinDate).toLocaleDateString()}
              </span>
              <span>
                Last login: {new Date(profile.lastLogin).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Action Button */}
          {canEdit && (
            <Button onClick={onEdit} className="bg-blue-600 hover:bg-blue-700">
              <Edit3 className="mr-2 w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
