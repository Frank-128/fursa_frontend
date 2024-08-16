"use client"
import {official_search_requests} from '@/constants/official_search'
import {CustomDataTable} from '@/components/datatable/CustomDataTable'
import {Chip,Tooltip,IconButton} from '@material-tailwind/react'
import { MdModeEditOutline,MdOutlineDeleteOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import moment from 'moment'
import Link from 'next/link'
import {TableColumn} from 'react-data-table-component';


interface DataRow{
    id:number,
    project_name:string;
    initiator_name:string;
    budget:string;
    status:string;
    created_at:string;

}

export default function OfficialSearch() {



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
            name: 'Requested By',
            selector: row => row.initiator_name,
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
                    value={row.status}
                    color={
                        row.status === "completed"
                            ? "green" :
                            row.status === "accepted"
                            ? "light-blue":
                                row.status === "modification"
                                    ? "purple"
                            :
                                    row.status === "pending"
                                        ? "amber"
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

                    <Tooltip content={"reject with modifications"}>
                        <IconButton variant={'text'}>
                            <MdModeEditOutline color={'#7209b7'} />
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
            <CustomDataTable searchAttr={'project_name'} componentData={official_search_requests} componentColumns={columns}  />

        </main>
    );
}
