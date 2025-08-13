// // 'use client'

// // import { Button } from "@/components/ui/button"

// // import {
// //     ColumnDef,
// //     flexRender,
// //     getCoreRowModel,
// //     getPaginationRowModel,
// //     useReactTable
// // } from "@tanstack/react-table"

// // import {
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableHead,
// //     TableHeader,
// //     TableRow
// // } from "@/components/ui/table"

// // import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from "lucide-react"

// // interface DataTableProps<TData, TValue> {
// //   columns: ColumnDef<TData, TValue>[]
// //   data: TData[]
// // }

// // export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
// //     const table = useReactTable({
// //         data,
// //         columns,
// //         getCoreRowModel: getCoreRowModel()
// //     })

// //     return (
// //         <div>

// //         </div>
// //     )
// // }

// // // export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
// // //     const table = useReactTable({
// // //         data,
// // //         columns,
// // //         getCoreRowModel: getCoreRowModel(),
// // //         getPaginationRowModel: getPaginationRowModel()
// // //     })

// // //     return (
// // //         <div>
// // //             <div className="overflow-hidden rounded-md border h-[530px]">
// // //                 <Table className="w-full">
// // //                     <TableHeader>
// // //                         {table.getHeaderGroups().map((headerGroup) => (
// // //                             <TableRow key={headerGroup.id}>
// // //                                 {headerGroup.headers.map((header => {
// // //                                     const meta = header.column.columnDef.meta as { className?: string } | undefined
// // //                                     return (
// // //                                         <TableHead key={header.id} className={`${meta?.className ?? ""} bg-gray-50`} style={{ width: header.column.columnDef.size }}>
// // //                                             {header.isPlaceholder ? null : flexRender( header.column.columnDef.header, header.getContext())}
// // //                                         </TableHead>
// // //                                     )
// // //                                 }))}
// // //                             </TableRow>
// // //                         ))}
// // //                     </TableHeader>

// // //                     <TableBody>
// // //                         {table.getRowModel().rows.map((row) => (
// // //                             <TableRow key={row.id}>
// // //                                 {row.getVisibleCells().map((cell, i) => {
// // //                                     const meta = cell.column.columnDef.meta as { className?: string } | undefined
// // //                                     return (
// // //                                         <TableCell key={cell.id} className={`${meta?.className ?? ""}`} style={{ width: cell.column.columnDef.size }}>
// // //                                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
// // //                                         </TableCell>
// // //                                     )
// // //                                 })}
// // //                             </TableRow>
// // //                         ))}
// // //                     </TableBody>
// // //                 </Table>
// // //             </div>
// // //             <div className="flex items-center justify-end space-x-2 py-4">

// // //                 <span className="text-sm text-gray-500">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>

// // //                 <Button variant="outline" size="sm" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
// // //                     <ChevronsLeft />
// // //                 </Button>
// // //                 <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
// // //                     <ChevronLeft />
// // //                 </Button>
// // //                 <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
// // //                     <ChevronRight />
// // //                 </Button>
// // //                 <Button variant="outline" size="sm" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
// // //                     <ChevronsRight />
// // //                 </Button>
// // //             </div>
// // //         </div>
// // //     )
// // // }