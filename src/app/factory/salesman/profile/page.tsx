"use client";
import { useState } from "react";
import { demoProfiles } from "@/lib/data/profile-data";
import { Toaster } from "sonner";
import { ProfileHeader } from "@/components/pageComponents/profile/profile-header";
import { ProfileInfo } from "@/components/pageComponents/profile/profile-info";
import { SecuritySettings } from "@/components/pageComponents/profile/security-settings";
import { QuickActions } from "@/components/pageComponents/profile/quick-actions";

export default function SalesmanProfilePage() {
  const profile = demoProfiles.SALESMAN;

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  const handleAvatarChange = () => {
    console.log("Change avatar clicked");
  };

  return (
    <div className="py-8 min-h-screen bg-gray-50">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-gray-600">Sales Executive Dashboard</p>
        </div>

        <div className="space-y-6">
          <ProfileHeader
            profile={profile}
            onEdit={handleEditProfile}
            onAvatarChange={handleAvatarChange}
            canEdit={true}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              <ProfileInfo profile={profile} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <SecuritySettings canChangePIN={true} />
              {/* // <QuickActions role="SALESMAN" /> */}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
