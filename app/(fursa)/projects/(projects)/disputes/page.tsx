"use client"
import Image from "next/image";
import {usePathname} from 'next/navigation';
import {RiBuilding2Line} from "react-icons/ri";
import {TbDeviceImacSearch} from "react-icons/tb";
import {MdDomainVerification} from "react-icons/md";
import {TbFlagCancel} from "react-icons/tb";
import {IoTelescopeOutline} from "react-icons/io5";
import {project_disputes} from '../../../../../constants/project_disputes'
import {CustomDataTable} from '../../../../../components/datatable/CustomDataTable'
import {Chip} from '@material-tailwind/react'
import moment from 'moment'
import Link from 'next/link'

export default function Disputes() {


    const columns = [
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
            cell: row => (
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
