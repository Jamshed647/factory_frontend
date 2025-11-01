"use client";

import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ProfileFormType, profileSchema } from "./_asset/schema/userSchema";
import { profileDefaultValue } from "./_asset/utils/profilValue";

export default function ProfilePage() {
  //   const {data,isLoading} = useFetchData({
  // path: `/api/v1/auth/owner/user`,
  //     queryKey:"get_user_profile",
  //   });
  //
  //
  const data = {
    pincode: "1234",
    name: "John",
    address: "123 Main Street",
    email: "john@example.com",
    phone: "+880123456789",
  };

  const profileForm = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileDefaultValue(data),
  });

  const onSubmit = (data: ProfileFormType) => {
    // Add save logic here (API call)
    console.log("Profile saved!", data);
  };

  return (
    <main className="flex justify-center items-center p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <FormProvider {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <CustomField.Text
            name="name"
            labelName="Name"
            placeholder="Enter your first name"
            form={profileSchema}
            optional={false}
          />
          <CustomField.Text
            name="address"
            labelName="Address"
            placeholder="Enter your address"
            form={profileSchema}
            optional={false}
          />
          <CustomField.Text
            name="email"
            labelName="Email"
            placeholder="Enter your email"
            form={profileSchema}
          />
          <CustomField.Text
            name="phone"
            labelName="Phone Number"
            placeholder="Enter your phone number"
            form={profileSchema}
            optional={false}
          />
          <CustomField.Text
            name="pincode"
            labelName="Pincode"
            placeholder="Enter your pincode"
            form={profileSchema}
            optional={false}
          />

          <ActionButton
            buttonContent="Save"
            type="submit"
            // isPending={createUser.isPending}
            // handleOpen={profileSchema.handleSubmit(onSubmit)}
            btnStyle="w-full bg-green-500 text-white"
          />
        </form>
      </FormProvider>
    </main>
  );
}
