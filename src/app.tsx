import { LogStats } from "@/views/logStats/logStats.view";
import { UploadFile } from "@/views/uploadFile/uploadFile.view";

export const App = () => {
  return (
    <div className="mx-auto max-w-lg">
      <UploadFile />
      <LogStats />
    </div>
  );
};
