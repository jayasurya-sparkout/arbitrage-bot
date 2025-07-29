'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { useState } from "react";
import { Button } from "./ui/button";
import clsx from "clsx";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function BotConfiguration() {
    const [step, setStep] = useState<number>(0);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedExchanges, setSelectedExchanges] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const arbitrageOptions = [
        { label: "CEX to CEX", value: "cex" },
        { label: "DEX to DEX", value: "dex" },
        { label: "Mixed (CEX/DEX)", value: "mixed" },
    ];

    const exchangesArbitrageOptions = [
        { label: "Coinbase", value: "coinbase", type: "CEX" },
        { label: "Binance", value: "binance", type: "CEX" },
        { label: "Kraken", value: "kraken", type: "CEX" },
        { label: "Uniswap", value: "uniswap", type: "DEX" },
        { label: "SushiSwap", value: "sushiswap", type: "DEX" },
        { label: "PancakeSwap", value: "pancakeswap", type: "DEX" },
        { label: "Raydium", value: "raydium", type: "DEX" },
    ];

    const filteredExchanges = exchangesArbitrageOptions
        .filter((ex) => {
            if (selectedType === "cex") return ex.type === "CEX";
            if (selectedType === "dex") return ex.type === "DEX";
            return true;
        })
        .filter((ex) => ex.label.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleExchangeToggle = (value: string) => {
        setSelectedExchanges((prev) =>
            prev.includes(value) ? prev.filter((ex) => ex !== value) : [...prev, value]
        );
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const isNextDisabled = () => {
        if (step === 1 && !selectedType) return true;
        if (step === 2 && selectedExchanges.length === 0) return true;
        return false;
    };

    return (
        <div className="px-4 lg:px-6">
            <Card className="@container/card gap-6">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Bot Configuration</CardTitle>
                    {step === 0 && (
                        <Button className="w-max m-auto" onClick={() => setStep(1)}>
                            Configure New Bot
                        </Button>
                    )}
                </CardHeader>

                {step > 0 && (
                    <div className="flex flex-col gap-6">
                        
                        {step === 1 && (
                            <CardContent className="flex flex-col gap-4">
                                <div className="text-lg font-bold text-primary">Choose Arbitrage Type</div>
                                <div className="flex gap-6">
                                    {arbitrageOptions.map((option) => (
                                        <Card
                                            key={option.value}
                                            onClick={() => {
                                                setSelectedType(option.value);
                                                setSelectedExchanges([]);
                                            }}
                                            className={clsx(
                                                "w-1/3 cursor-pointer transition-all",
                                                selectedType === option.value
                                                    ? "border-primary border-2 shadow-lg"
                                                    : "hover:border-muted"
                                            )}
                                        >
                                            <CardHeader>
                                                <CardTitle className="text-base font-semibold">{option.label}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                {option.value === "cex" && "Centralized Exchanges"}
                                                {option.value === "dex" && "Decentralized Exchanges"}
                                                {option.value === "mixed" && "CEX and DEX"}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        )}
                        
                        {step === 2 && (
                            <CardContent className="flex flex-col gap-4">
                                <div className="text-lg font-bold text-primary">Select Exchanges</div>
                                <Input
                                    className="focus-visible:ring-transparent"
                                    placeholder="Search exchanges..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <div className="flex flex-wrap gap-4">
                                    {filteredExchanges.map((option) => (
                                        <Card
                                            key={option.value}
                                            onClick={() => handleExchangeToggle(option.value)}
                                            className={clsx(
                                                "w-[30%] cursor-pointer transition-all",
                                                selectedExchanges.includes(option.value)
                                                    ? "border-primary border-2 shadow-lg"
                                                    : "hover:border-muted"
                                            )}
                                        >
                                            <CardHeader>
                                                <CardTitle className="text-base font-semibold">{option.label}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                {option.type === "CEX" ? "Centralized" : "Decentralized"}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        )}
                        
                        {step === 3 && (
                            <CardContent className="flex flex-col gap-4">
                                <div className="text-lg font-bold text-primary">Select Trading Pairs</div>
                                <div className="text-muted-foreground">
                                    Selected Exchanges:{" "}
                                    <span className="text-purple-600">{selectedExchanges.join(", ")}</span>
                                </div>
                                <Input
                                    className="focus-visible:ring-transparent"
                                    placeholder="Search pairs (e.g., BTC/USDT)"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </CardContent>
                        )}
                        
                        {step === 4 && (
                            <CardContent className="flex flex-col gap-4">
                                <div className="text-lg font-bold text-primary">Set Amount & Slippage</div>
                                <div>
                                    <Label htmlFor="amount">Trade Amount (USD)</Label>
                                    <Input id="amount" type="number" placeholder="e.g. 1000" className="focus-visible:ring-transparent" />
                                </div>
                                <div>
                                    <Label htmlFor="slippage">Max Slippage (%)</Label>
                                    <Input id="slippage" type="number" placeholder="e.g. 0.5" className="focus-visible:ring-transparent" />
                                </div>
                            </CardContent>
                        )}

                        <CardFooter className="flex justify-between">
                            {step > 1 && (
                                <Button variant="outline" onClick={prevStep} className="cursor-pointer">
                                    {step === 3
                                        ? "Back to Exchanges"
                                        : step === 4
                                        ? "Back to Pairs"
                                        :"Back to Arbitrage Type"
                                    }
                                </Button>
                            )}
                            <Button
                                className="ml-auto cursor-pointer"
                                onClick={() => {
                                    if (step === 4) {
                                        alert("Configuration saved!");
                                        setStep(0);
                                        setSelectedType(null);
                                        setSelectedExchanges([]);
                                        setSearchTerm("");
                                    } else {
                                        nextStep();
                                    }
                                }}
                                disabled={isNextDisabled()}
                            >
                                {step === 1
                                    ? "Next"
                                    : step === 2
                                    ? "Proceed To Pairs"
                                    : step === 3
                                    ? "Set Amount"
                                    : step === 4
                                    ? "Save Configuration"
                                    : "Next"}
                            </Button>
                        </CardFooter>
                    </div>
                )}
            </Card>
        </div>
    );
}
