"use client"
import {project_disputes} from '@/constants/project_disputes'
import {CustomDataTable} from '@/components/datatable/CustomDataTable'
import {Chip} from '@material-tailwind/react'
import moment from 'moment'
import Link from 'next/link'
import {TableColumn} from 'react-data-table-component';


interface DataRow{
    id:number,
    project_name:string;
    dispute_type:string;
    initiated_by:string;
    status:string;
    created_at:string;

}

export default function Disputes() {


    const columns:TableColumn<DataRow>[] = [
        {
            name: 'Project Name',
            selector: row => row.project_name,
            cell:row=>(
                <Link href={'/projects/details/'+row.id}>
                    {row.project_name}
                </Link>
            ),
            sortable: true,
        },
        {
            name: 'Dispute type',
            selector: row => row.dispute_type,
            sortable: true,
        },
        {
            name: 'Opened by',
            selector: row => row.initiated_by,
            sortable: true,
        },
        {
            name: 'Status',
            cell: row => (
                <Chip
                    size="sm"
                    variant="ghost"
                    value={row.status}
                    color={
                        row.status === "settled"
                            ? "green" :
                            "amber"

                    }
                />

            ),
        },
        {
            name: 'Created At',
            selector: row => moment(row.created_at).format('MM-D-YYYY'),
            sortable: true,
        },
        {
            name: 'Action',
            cell: () => (
                <div className={'flex '}>

                    <button className={'px-2 py-1 rounded bg-blue-300/20 font-bold text-blue-900'}>
                        settle
                    </button>



                </div>

            ),
        },
    ]

    return (
        <main className="flex   flex-col items-center">
            <CustomDataTable searchAttr={'project_name'} componentData={project_disputes}
                             componentColumns={columns}/>

        </main>
    );
}
