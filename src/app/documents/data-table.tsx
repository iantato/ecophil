'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header => {
                                const meta = header.column.columnDef.meta as { className?: string } | undefined
                                return (
                                    <TableHead key={header.id} className={`${meta?.className ?? ""} bg-gray-50`} style={{ width: header.column.columnDef.size }}>
                                        {header.isPlaceholder ? null : flexRender( header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                )
                            }))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell, i) => {
                                const meta = cell.column.columnDef.meta as { className?: string } | undefined
                                return (
                                    <TableCell key={cell.id} className={`${meta?.className ?? ""}`} style={{ width: cell.column.columnDef.size }}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}