import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDistance } from "date-fns";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import ApiKeyOptions from "./ApiKeyOptions";
import CopyButton from "./CopyButton";
import { Input } from "./ui/Input";
import Paragraph from "./ui/Paragraph";
import Table from "./ui/Table";

const ApiDashboard = async ({}) => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.user.id },
  });

  const activeApiKey = apiKeys.find((key) => key.enabled);

  if (!activeApiKey) return notFound();

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  });

  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }));

  return (
    <div className="container flex flex-col gap-6">
      <h1 className="md:text-center mb-6 font-bold text-3xl text-slate-600 dark:text-white">
        {" "}
        <span className="flex gap-2 items-center r">
          <User className="w-8 h-8 dark:text-light-gold" /> {user.user.name}{" "}
        </span>
      </h1>
      <div className="  flex flex-col md:flex-row gap-4 justify-start md:justify-start items-start px-2">
        <Paragraph className="">
          Your API key:{" "}
          <CopyButton
            className=" right-0 top-2 left-0 animate-in fade-in duration-300"
            valueToCopy={activeApiKey.key}
          />
        </Paragraph>

        <Input
          className="w-[30%] sm:w-[40%] truncate "
          readOnly
          value={activeApiKey.key}
        />

        <ApiKeyOptions apiKeyKey={activeApiKey.key} />
      </div>

      <Paragraph className="text-center md:text-left mt-4 -mb-4">
        Your API history:
      </Paragraph>

      <Table userRequests={serializableRequests} />
    </div>
  );
};

export default ApiDashboard;
