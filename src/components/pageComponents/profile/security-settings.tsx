"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Key, Shield, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/custom_ui/input";

interface SecuritySettingsProps {
  canChangePIN: boolean;
}

export function SecuritySettings({ canChangePIN }: SecuritySettingsProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Password updated successfully!");
    setIsChangingPassword(false);
  };

  const handlePINChange = () => {
    toast.info("PIN change functionality coming soon!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <Shield className="w-5 h-5" />
          Security Settings
        </CardTitle>
        <CardDescription>
          Manage your password and security preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Change Password Form */}
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="currentPassword"
              className="flex gap-2 items-center"
            >
              <Key className="w-4 h-4" />
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 py-2 px-3 h-full hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 py-2 px-3 h-full hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 py-2 px-3 h-full hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isChangingPassword}
          >
            {isChangingPassword ? "Updating Password..." : "Update Password"}
          </Button>
        </form>

        {/* PIN Settings */}
        {canChangePIN && (
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="flex gap-2 items-center font-medium">
                  <Smartphone className="w-4 h-4" />
                  4-Digit PIN Code
                </h4>
                <p className="text-sm text-gray-500">
                  Used for quick login and authentication
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handlePINChange}>
                Change PIN
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
