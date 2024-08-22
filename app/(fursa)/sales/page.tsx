"use client"
import {CustomDataTable} from '@/components/datatable/CustomDataTable'
import {Chip} from '@material-tailwind/react'
import moment from 'moment'
import {TableColumn} from 'react-data-table-component';
import Link from "next/link";
import {sales} from "@/constants/sales";


interface DataRow{
    id:number;
    clientName:string;
    plots:string[];
    status:boolean;
    createdAt:string;

}

export default function Projects() {



    const columns : TableColumn<DataRow>[] = [
        {
            name: 'Project Name',
            selector: row => row.clientName,
            cell:row=>(
                <Link className={'text-[#17225a] '} href={'/projects/details/'+row.id}>
                    {row.clientName}
                </Link>
            ),
            sortable: true,
        },
        {
            name: 'Plots',
            selector: row => row.clientName,
                // .map((item,index)=><span key={index}>{item}</span>),
            sortable: true,
        },
        {
            name: 'created at',
            selector: row => moment(row.createdAt).format('MM-D-YYYY'),
            sortable: true,
        },
        {
            name: 'Status',
            cell: row => (
                <Chip
                    size="sm"
                    variant="ghost"
                    value={row.status?"sold out":"ongoing"}
                    color={
                        row.status
                            ? "green"
                            :
                            "amber"

                    }
                />

            ),
        },

    ]

    return (
        <main className="flex   flex-col items-center ">
            <div className={'flex items-end w-full mb-2'}>
                <Link href={'/sales/create'} className={'bg-[#17255a] hover:scale-105 duration-150 transition ease-in-out text-white p-2 rounded shadow-xl shadow-blue-900/20'}>
                    + new sale
                </Link>
            </div>
            <CustomDataTable searchAttr={'clientName'} componentData={sales} componentColumns={columns}  />

        </main>
    );
}
