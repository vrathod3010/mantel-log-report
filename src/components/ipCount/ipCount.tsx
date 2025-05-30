import { observer } from "@legendapp/state/react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { stats$ } from "@/store/stats";

export const IpCount = observer(() => {
  const ipCount = stats$.uniqueIpCount.count.get();

  if (ipCount === null) return null;
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
