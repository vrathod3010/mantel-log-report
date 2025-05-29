import { states$ } from "@/services/uploadFile";
import { observer } from "@legendapp/state/react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

export const IpCount = observer(() => {
  const ipCount = states$.uniqueIpCount.count.get();
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Total IP</TableCell>
          <TableCell className="text-right">{ipCount}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
});
