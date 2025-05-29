import { observer } from "@legendapp/state/react";

import { uploadFile } from "../services/uploadFile";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const UploadFile = observer(() => {
  return (
    <div className="flex p-4 mx-auto max-w-md">
      <Input
        id="upload-log-file"
        type="file"
        accept=".log"
        onChange={uploadFile}
      />
      {/* <Button
        onClick={() => {
          db.logs.clear();
        }}
      >
        clear logs
      </Button> */}
    </div>
  );
});
