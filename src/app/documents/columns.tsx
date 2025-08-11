'use client'

import { ColumnDef} from '@tanstack/react-table'
import { Bulk_Document } from './types'

import { EllipsisVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Bulk_Document>[] = [
    {
        accessorKey: 'date_range',
        header: 'Date',
        size: 560,
        meta: { className: 'pl-6'},
        cell: ({ row }) => {
            const dateRange = row.getValue('date_range') as Date[]
            return (
                <div className='cursor-default font-medium'>
                    <span className='hover:underline underline-offset-5 select-none'>{dateRange[0].toDateString()} to {dateRange[1].toDateString()}</span>
                </div>
            )
        }
    },
    {
        accessorKey: 'document_no',
        header: 'Documents',
        size: 64,
        meta: { className: 'text-right' }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        size: 96,
        meta: { className: 'pr-0 text-center' },
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            const common = 'h-5 min-w-5 font-mono tabular-nums text-center'

            return (
                <div className="grid w-full place-items-center">
                    {status === 'Unpaid' ? (
                        <Badge variant='secondary' className={common}>{status}</Badge>
                    ) : (
                        <Badge className={`${common} bg-lime-200 text-black px-4`}>{status}</Badge>
                    )}
                </div>
            )
        }
    },
    {
        id: 'actions',
        size: 40,
        meta: { className: 'text-right px-0 pr-6' },
        cell: ({ row }) => {
            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <EllipsisVertical className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Renew</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    }
]