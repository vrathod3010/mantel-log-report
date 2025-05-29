import { LogStatesViewer } from "./components/logStatesViewer";
import { UploadFile } from "./components/uploadFile";

export const App = () => {
  return (
    <div className=" mx-auto max-w-lg">
      <UploadFile />
      <LogStatesViewer />
    </div>
  );
};
