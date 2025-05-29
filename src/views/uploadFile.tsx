import { uploadFile } from "../utils/uploadFile";
import { Input } from "../components/ui/input";
import { drizzleDb } from "@/drizzle/db";
import { Button } from "@/components/ui/button";
import { resetStats } from "@/store/stats";
import { useRef } from "react";

export const UploadFile = () => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex p-4 mx-auto max-w-md">
      <Input
        ref={ref}
        id="upload-log-file"
        type="file"
        accept=".log"
        onChange={uploadFile}
      />
      <Button
        onClick={() => {
          drizzleDb.run("DELETE FROM logs;");
          resetStats();
          //clear selected file input
          if (ref.current) {
            ref.current.value = "";
          }
        }}
      >
        clear logs
      </Button>
    </div>
  );
};
