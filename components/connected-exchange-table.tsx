"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
} from "@dnd-kit/sortable";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import clsx from "clsx";
import { Button } from "./ui/button";

interface DynamicTableProps {
  title: string;
  tablehead?: any[];
  data?: any[];
  columns?: any[];
  tabs?: string[];
  filterKey?: string;
  tbody: Array<{ rowData: (string | string[])[]; }>;
}

export function DynamicDataTable({ title, data, columns, tabs, filterKey, tablehead, tbody }: DynamicTableProps) {
  const [selectedTab, setSelectedTab] = useState(tabs?.[0] || "");

  const filteredData = useMemo(() => {
    if (!tabs || !filterKey) return data;
    return data?.filter((item) => item[filterKey]?.toLowerCase() === selectedTab.toLowerCase());
  }, [data, selectedTab, filterKey, tabs]);

  const [tableData, setTableData] = useState(filteredData);

  useEffect(() => {
    setTableData(filteredData);
  }, [filteredData]);

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => tableData!.map((item, idx) => item.id ?? idx),
    [tableData]
  );

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const table = useReactTable({
    data: tableData!,
    columns: columns!,
    getRowId: (row, index) => row.id?.toString() || index.toString(),
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      setTableData((prev) => arrayMove(prev!, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        {tabs && (
          <div className="bg-muted rounded-md p-[3px]">
            <div className="relative flex">
              <div
                className={clsx(
                  "absolute top-0 left-0 h-8 rounded-md bg-primary transition-all duration-300 w-[calc(100%/_tabs.length)]",
                  tabs.indexOf(selectedTab) > -1 && `translate-x-[${tabs.indexOf(selectedTab) * 100}%]`
                )}
              />
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  variant="ghost"
                  className={clsx(
                    `w-fit h-8 px-4 text-sm font-medium z-10 cursor-pointer`,
                    selectedTab === tab && "!text-white bg-primary hover:bg-primary"
                  )}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {tablehead && (
                <TableRow>
                  {tablehead.map((tableHead, index) => (
                    <TableHead key={index} colSpan={tablehead.length}>
                      {tableHead}
                    </TableHead>
                  ))}
                </TableRow>
              )}
            </TableHeader>
              {tbody.length > 0 ? (
                <TableBody>
                  {tbody.map(({ rowData }, index) => (
                    <TableRow key={index}>
                    {rowData.map((cell: any, colIndex: any) => (
                      <TableCell key={colIndex} colSpan={tablehead!.length}>
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                  ))}
                </TableBody>
              ) : (
                    <TableRow>
                      <TableCell rowSpan={1} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
              )}
          </Table>
        </DndContext>
      </div>
    </div>
  );
}