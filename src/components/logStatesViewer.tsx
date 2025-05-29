import { observer } from "@legendapp/state/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { states$ } from "@/services/uploadFile";
import { Separator } from "./ui/separator";
import { IpCount } from "./ipCount";
import { TopIps } from "./topIps";

const TopUrls = observer(() => {
  const topUrls = states$.topUrls.get({ shallow: true });
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

export const LogStatesViewer = () => {
  return (
    <>
      <h2 className="text-xl mb-2 text-center pb-2">Logs States</h2>
      <Separator className="my-4" />
      <IpCount />
      <Separator className="my-8" />
      <TopUrls />
      <Separator className="my-8" />
      <TopIps />
    </>
  );
};
