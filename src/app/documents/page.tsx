// import { columns } from "./columns"
// import { Bulk_Document } from "./types"
// import { DataTable } from "./data-table"


// async function getData(): Promise<Bulk_Document[]> {
//   return [
//     {
//       id: 'LIQ-EXPORT-2025-001',
//       date_range: [new Date("2023-01-01"), new Date("2023-01-31")],
//       document_no: 100,
//       status: "Unpaid",
//     }
//   ]
// }

// export default async function DocumentsPage() {
//     const data = await getData()
//     return (
//         <div className="container mx-auto py-10">
//             <DataTable columns={columns} data={data} />
//         </div>
//     )
// }