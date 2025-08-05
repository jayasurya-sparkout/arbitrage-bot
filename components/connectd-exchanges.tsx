'use client';

import { useState, useEffect } from "react";
// import { ConnectedExchangeTable } from "./connected-exchange-table";
import { DynamicDataTable } from "./connected-exchange-table";
import { userListExchange } from "../service/user";

export function ConnectedExchanges() {
  const id = localStorage.getItem("userId");
  const [tableData, setTableData] = useState<any[]>([]);
  const [cexData, setCexData] = useState<any[]>([]);
  const [dexData, setDexData] = useState<any[]>([]);

  const fetchData = async (id: string) => {
    try {
      const response = await userListExchange(id);

      const cexData = response?.data?.cex || [];
      const dex = response?.data?.dex || [];
      const merged = [...cexData, ...dex];

      cexData?.map((item: any, index: any) => (
        console.log(item, 'item'),
        setCexData(item)
      ));
      setDexData(dex);
      setTableData(merged);
      console.log(merged, 'merged');
      console.log(dex, 'setDexData');
      console.log(cexData, 'setCexData');
    } catch (error) {
      console.error("Error fetching user exchanges:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <div className="px-4 lg:px-6">
      <DynamicDataTable 
        data={tableData} 
        title="Your Connected Exchanges" 
        columns={cexData} 
        tablehead={['S.No', 'ExchangedName', 'Type', 'Action']}  tabs={
          ['one', 'two']
        }
        tbody={dexData.map((item: any, index: number) => {
          console.log(item, 'item');
          return (
            {
              rowData: [
                (index + 1).toString(),
                item.exchange_name || '-',
                item.type || '-',
                item.status || 'Connected',
              ],
            }
          )
        })}
      />
    </div>
  );
}
