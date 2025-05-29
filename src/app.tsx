import { LogStatesViewer } from "./views/logStatesViewer";
import { UploadFile } from "./views/uploadFile";

export const App = () => {
  return (
    <div className="mx-auto max-w-lg">
      <UploadFile />
      <LogStatesViewer />
    </div>
  );
};
