'use client';

import { ConnectExchange } from "../../../components/connect-exchange";
import { ConnectedExchanges } from "../../../components/connectd-exchanges";

export default function WalletManagement () {
    return (
        <>
            <ConnectExchange />
            <ConnectedExchanges />
        </>
    )
} 