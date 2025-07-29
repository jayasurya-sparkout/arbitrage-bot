'use client';

import { Badge } from "./ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CustomRadioGroup } from "./custom-radiobtn";
import { useState } from "react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";

type ExchangeType = {
  exchange: string;
  dexEchange: string;
}

export function ConnectExchange() {

  const rawData: ExchangeType[] = [
    { exchange: "binance", dexEchange: "uniswap" },
    { exchange: "coinbase", dexEchange: "pancakeswap" },
    { exchange: "kraken", dexEchange: "sushiswap" },
    { exchange: "bybit", dexEchange: "raydium" },
  ];

  const [selectedValue, setSelectedValue] = useState<string>("centralized");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  let uniqueGroup;
  if (selectedValue !== "centralized") {
    uniqueGroup = Array.from(new Set(rawData.map((item) => item.dexEchange)));
  } else {
    uniqueGroup = Array.from(new Set(rawData.map((item) => item.exchange)));
  }
  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <form className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Connect New Exchange
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <span className="capitalize">{selectedValue}</span>
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <CustomRadioGroup
            defaultValue={selectedValue}
            options={[
              { label: "Centralized ( CEX )", value: "centralized" },
              { label: "Decentralized ( DEX )", value: "decentralized" },
            ]}
            addClass="flex gap-5"
            onChange={handleRadioChange}
          />
          <div className="w-full">
            <Label htmlFor="group" className="mb-2">Select Exchange</Label>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="w-full h-10">
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
          {selectedValue !== "decentralized" ? (
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <Label htmlFor="group" className="mb-2">API Key</Label>
                <Input
                  className="focus-visible:ring-transparent"
                  id="apiKey"
                  type="text"
                  placeholder="Enter API Key"
                  required
                />
              </div>
              <div className="w-full">
                <Label htmlFor="group" className="mb-2">Secret Key</Label>
                <Input
                  className="focus-visible:ring-transparent"
                  id="secretKey"
                  type="password"
                  placeholder="Enter Secret Key"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="w-full">
              <Label htmlFor="group" className="mb-2">Private Key</Label>
              <Input
                className="focus-visible:ring-transparent"
                id="privateKey"
                type="password"
                placeholder="Enter Private Key"
                required
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Button type="submit" className="w-full cursor-pointer">
            Connect Exchange
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
