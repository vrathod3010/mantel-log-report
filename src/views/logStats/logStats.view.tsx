import { IpCount } from "@/components/ipCount";
import { TopIps } from "@/components/topIps";
import { TopUrls } from "@/components/topUrls";

export const LogStates = () => {
  return (
    <div className="space-y-20">
      <h2 className="text-xl mb-2 text-center pb-8">Logs States</h2>
      <IpCount />
      <TopUrls />
      <TopIps />
    </div>
  );
};
