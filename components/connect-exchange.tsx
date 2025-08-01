'use client';

import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "react-toastify";

type ExchangeType = {
  exchange: string;
  dexEchange: string;
};

export function ConnectExchange() {
  const rawData: ExchangeType[] = [
    { exchange: "binance", dexEchange: "uniswap" },
    { exchange: "coinbase", dexEchange: "pancakeswap" },
    { exchange: "kraken", dexEchange: "sushiswap" },
    { exchange: "bybit", dexEchange: "raydium" },
  ];

  const [selectedValue, setSelectedValue] = useState<string>("centralized");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const uniqueGroup =
    selectedValue !== "centralized"
      ? Array.from(new Set(rawData.map((item) => item.dexEchange)))
      : Array.from(new Set(rawData.map((item) => item.exchange)));

    useEffect(() => {
        const id = localStorage.getItem("userId");
        setUserId(id ?? "");
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload =
      selectedValue === "centralized"
        ? {
            user_id: userId,
            connection_type: "cex",
            name: selectedGroup,
            cex: {
              api_key: apiKey,
              secret_key: secretKey,
            },
            dex: {
              wallet_address: "",
              wallet_private_key: "",
            },
          }
        : {
            user_id: userId,
            connection_type: "dex",
            name: selectedGroup,
            cex: {
              api_key: "",
              secret_key: "",
            },
            dex: {
              wallet_address: "",
              wallet_private_key: privateKey,
            },
          };

    try {
      const res = await fetch("http://13.126.148.9:5006/User/exchange-connection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Exchange connected successfully!", { toastId: "exchnage-success" });
        console.log("Success:", data);
      } else {
        toast.error("Failed to connect exchange.", { toastId: "exchnage-failed" });
        console.error("Error:", data);
      }
    } catch (err) {
      console.error("Network Error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6"
    >
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-foreground">
            Connect New Exchange
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <span className="capitalize">Network</span>
            </Badge>
          </CardAction>
        </CardHeader>
        <Tabs value={selectedValue} onValueChange={setSelectedValue} className="gap-6">
          <CardContent className="flex flex-col gap-6">
            <TabsList>
              <TabsTrigger value="centralized">Centralized ( CEX )</TabsTrigger>
              <TabsTrigger value="decentralized">Decentralized ( DEX )</TabsTrigger>
            </TabsList>
            <div className="w-full">
              <Label htmlFor="group" className="mb-2">Select Exchange</Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="w-full h-10 border-border border-2 focus-visible:ring-transparent">
                  <SelectValue placeholder="Select Exchange" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueGroup.map((exchange) => (
                    <SelectItem key={exchange} value={exchange} className="capitalize">
                      {exchange}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          
          <TabsContent value="centralized">
            <CardContent className="grid gap-6">
              <div className="flex flex-col gap-6">
                <div className="w-full">
                  <Label htmlFor="apiKey" className="mb-2">API Key</Label>
                  <Input
                    id="apiKey"
                    type="text"
                    placeholder="Enter API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="focus-visible:ring-transparent border-2 border-border"
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="secretKey" className="mb-2">Secret Key</Label>
                  <Input
                    id="secretKey"
                    type="password"
                    placeholder="Enter Secret Key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    className="focus-visible:ring-transparent border-2 border-border"
                  />
                </div>
              </div>
            </CardContent>
          </TabsContent>

          {/* Decentralized */}
          <TabsContent value="decentralized">
            <CardContent className="grid gap-6">
              <div className="w-full">
                <Label htmlFor="privateKey" className="mb-2">Private Key</Label>
                <Input
                  id="privateKey"
                  type="password"
                  placeholder="Enter Private Key"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  className="focus-visible:ring-transparent border-2 border-border"
                />
              </div>
            </CardContent>
          </TabsContent>

          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <Button type="submit" className="w-full cursor-pointer">
              Connect Exchange
            </Button>
          </CardFooter>
        </Tabs>
      </Card>
    </form>
  );
}
