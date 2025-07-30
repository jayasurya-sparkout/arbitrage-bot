'use client';

import { ConnectExchange } from "../../../components/connect-exchange";
import { ConnectedExchanges } from "../../../components/connectd-exchanges";
import { ExchangeCounts } from "../../../components/exchange-counts";
import { BotConfiguration } from "../../../components/bot-configuration";

export default function Page() {
  return (
    <>
      <ConnectExchange />
      <ConnectedExchanges />
      <ExchangeCounts />
      <BotConfiguration />
    </>
  )
}
