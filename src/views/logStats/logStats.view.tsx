import { IpCount } from "@/components/ipCount/ipCount";
import { TopIps } from "@/components/ipCount/topIps";
import { TopUrls } from "@/components/ipCount/topUrls";

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
