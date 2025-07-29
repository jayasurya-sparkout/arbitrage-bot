'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { useEffect, useState } from "react";

export function ExchangeCounts() {
    const [cexCount, setCexCount] = useState(0);
    const [dexCount, setDexCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCexCount((prev) => {
                if (prev < 10) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDexCount((prev) => {
                if (prev < 37) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const cexList = ["Binance", "Coinbase", "Kraken"];
    const dexList = ["Uniswap", "SushiSwap", "PancakeSwap", "Raydium"];

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 flex gap-6 flex-nowrap">
            <Card className="@container/card w-1/2 gap-2">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        Centralized Exchanges (CEX)
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                    <div className="text-2xl font-bold text-primary">
                        <div className="">Count : <span className="">{cexCount}</span></div>
                    </div>
                    <ul className="list-disc list-inside text-muted-foreground text-sm pl-4">
                        {cexList.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="@container/card w-1/2 gap-2">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        Decentralized Exchanges (DEX)
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                    <div className="text-2xl font-bold text-primary">
                        <div className="">Count : <span className="">{dexCount}</span></div>
                    </div>
                    <ul className="list-disc list-inside text-muted-foreground text-sm pl-4">
                        {dexList.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
