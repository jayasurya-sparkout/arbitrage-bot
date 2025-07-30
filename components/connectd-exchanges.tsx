'use client';

import { ConnectedExchangeTable } from "./connected-exchange-table";
import data from "../app/user/dashboard/dataconnectdexchanges.json";

export function ConnectedExchanges () {
    
    return (
        <div className="px-4 lg:px-6">
            <ConnectedExchangeTable data={data} />
        </div>
    )

}