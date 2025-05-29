import { observer } from "@legendapp/state/react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { stats$ } from "@/store/stats";

export const TopUrls = observer(() => {
  const topUrls = stats$.topUrls.get({ shallow: true });

  if (topUrls === null) return null;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Top URLs</TableHead>
          <TableHead className="text-right">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topUrls.map((url) => (
          <TableRow key={url.url}>
            <TableCell>{url.url}</TableCell>
            <TableCell className="text-right">{url.count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});
