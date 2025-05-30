import { observer } from "@legendapp/state/react";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import { stats$ } from "@/store/stats";

export const TopIps = observer(() => {
  const topIps = stats$.topIps.get({ shallow: true });

  if (topIps === null) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Top IPs</TableHead>
          <TableHead className="text-right">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topIps.map((ip) => (
          <TableRow key={ip.ip}>
            <TableCell>{ip.ip}</TableCell>
            <TableCell className="text-right">{ip.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});
