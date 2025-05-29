// import { describe, it, expect, vi, beforeEach } from "vitest";

// import { UploadFile } from "./uploadFile";
// import { uploadFile } from "../utils/uploadFile";
// import { drizzleDb } from "@/drizzle/db";
// import { resetStats } from "@/store/stats";
// import { render, fireEvent, screen } from "@testing-library/react";

// vi.mock("../utils/uploadFile", () => ({
//   uploadFile: vi.fn(),
// }));

// vi.mock("@/drizzle/db", () => ({
//   drizzleDb: {
//     run: vi.fn(),
//   },
// }));

// vi.mock("@/store/stats", () => ({
//   resetStats: vi.fn(),
// }));

// describe("<UploadFile />", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it("renders file input and button", () => {
//     render(<UploadFile />);
//     expect(screen.getByTestId("log-file-input")).toBeInTheDocument();
//     expect(screen.getByTestId("clear-logs-button")).toBeInTheDocument();
//   });

//   it("calls uploadFile on file input change", () => {
//     render(<UploadFile />);
//     const file = new File(["log content"], "test.log", { type: "text/plain" });
//     const input = screen.getByTestId("log-file-input") as HTMLInputElement;

//     fireEvent.change(input, { target: { files: [file] } });

//     expect(uploadFile).toHaveBeenCalledOnce();
//   });

//   it("clears logs and resets stats on button click", () => {
//     render(<UploadFile />);
//     const input = screen.getByTestId("log-file-input") as HTMLInputElement;
//     const button = screen.getByTestId("clear-logs-button");

//     input.value = "fakepath/test.log";

//     fireEvent.click(button);

//     expect(drizzleDb.run).toHaveBeenCalledWith("DELETE FROM logs;");
//     expect(resetStats).toHaveBeenCalled();
//     expect(input.value).toBe(""); // Should be cleared
//   });
// });
