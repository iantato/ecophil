'use client'

import { ColumnDef} from '@tanstack/react-table'
import { Bulk_Document } from './types'

export const columns: ColumnDef<Bulk_Document>[] = [
    {
        accessorKey: 'date_range',
        header: 'Date',
        size: 220,
        meta: { className: 'pl-6'}
    },
    {
        accessorKey: 'document_no',
        header: 'Documents',
        size: 50,
        meta: { className: 'text-right' }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        size: 50,
        meta: { className: 'text-right pr-6' }
    }
]