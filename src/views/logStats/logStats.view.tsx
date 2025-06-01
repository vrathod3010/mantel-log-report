import { IpCount } from "@/components/ipCount/ipCount";
import { TopIps } from "@/components/topIps/topIps";
import { TopUrls } from "@/components/topUrls/topUrls";

/**
 * LogStats Component
 *
 * This component serves as the main view for displaying log statistics.
 * It includes three sub components:
 * - IpCount: Displays the count of unique IPs.
 * - TopUrls: Displays the top accessed URLs.
 * - TopIps: Displays the top IPs based on access frequency.
 *
 * The layout is styled with spacing and includes a title for the section.
 */
export const LogStats = () => {
  return (
    <div className="space-y-20">
      <h2 className="text-xl mb-2 text-center pb-8">Logs Stats</h2>
      <IpCount />
      <TopUrls />
      <TopIps />
    </div>
  );
};
