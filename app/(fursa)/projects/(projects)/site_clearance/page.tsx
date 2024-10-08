"use client"
import {site_clearance} from '@/constants/site_clearance'
import {CustomDataTable} from '@/components/datatable/CustomDataTable'
import {Chip,Tooltip,IconButton} from '@material-tailwind/react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import moment from 'moment'
import Link from 'next/link'
import {TableColumn} from 'react-data-table-component';


interface DataRow{
    id:number,
    project_name:string;
    project_manager:string;
    budget:string;
    status:string;
    created_at:string;

}

export default function SiteClearance() {


    const columns:TableColumn<DataRow>[] = [
        {
            name: 'Project Name',
            selector: row => row.project_name,
            cell:row=>(
                <Link className={'text-[#17225a] '} href={'/projects/details/'+row.id}>
                    {row.project_name}
                </Link>
            ),
            sortable: true,
        },
        {
            name: 'Project manager',
            selector: row => row.project_manager,
            sortable: true,
        },
        {
            name: 'Budget',
            selector: row => row.budget,
            sortable: true,
        },
        {
            name: 'Status',
            cell: row => (
                <Chip
                    size="sm"
                    variant="ghost"
                    value={row.status ? 'accepted' : 'denied'}
                    color={
                        row.status
                            ? "green"
                            :
                            "red"

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
                    <Tooltip content={"accept"}>
                        <IconButton variant={'text'}>
                            <TiTick color={'#06d6a0'} />
                        </IconButton>

                    </Tooltip>


                    <Tooltip content={"decline request"}>
                        <IconButton variant={'text'}>
                            <MdOutlineDeleteOutline color={'#d00000'} />
                        </IconButton>


                    </Tooltip>
                </div>

            ),
        },
    ]

    return (
        <main className="flex   flex-col items-center">
            <CustomDataTable searchAttr={'project_name'} componentData={site_clearance}
                             componentColumns={columns}/>

        </main>
    );
}
