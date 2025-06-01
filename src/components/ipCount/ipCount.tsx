import { observer } from "@legendapp/state/react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { stats$ } from "@/store/stats";

/**
 * IpCount Component
 *
 * A React functional component that displays the count of unique IPs in a table format.
 *
 * The component observes changes in the `stats$` store and updates the UI reactively.
 * If the `uniqueIpCount` is `null`, the component renders nothing.
 * Otherwise, it displays the count of unique IPs in a table.
 */
export const IpCount = observer(() => {
  const ipCount = stats$.uniqueIpCount.count.get();

  if (ipCount === null) return null;
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Unique IP</TableCell>
          <TableCell className="text-right">{ipCount}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
});
