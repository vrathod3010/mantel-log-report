import { uploadFile } from "../../utils/uploadFile/uploadFile";
import { Input } from "../../components/ui/input";
import { drizzleDb } from "@/drizzle/db";
import { Button } from "@/components/ui/button";
import { resetStats } from "@/store/stats";
import { useRef } from "react";

export const UploadFile = () => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex p-4 mx-auto max-w-md gap-4">
      <Input
        data-testid="log-file-input"
        ref={ref}
        id="upload-log-file"
        type="file"
        accept=".log"
        onChange={uploadFile}
      />
      <Button
        data-testid="clear-logs-button"
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
