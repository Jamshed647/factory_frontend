/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/custom_ui/form";
import FileUploadFromLocal from "./FileUpload/fileUploadFromLocal";

type Props = {
  form: any;
  name: string;
  labelName?: string;
  optional?: boolean;
};

const SingleFileUpload = ({
  form,
  name,

  labelName,
  optional = true,
}: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          {labelName && (
            <label className="text-sm font-semibold leading-6">
              {labelName}
              {!optional && <span className="text-[#7E8C9A]">&nbsp;*</span>}
            </label>
          )}
          <FormControl>
            <>
              <FileUploadFromLocal
                fieldName={name}
                upload={form}
                triggerFileInput={form.trigger}
              />
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SingleFileUpload;
