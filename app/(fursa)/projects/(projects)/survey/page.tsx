"use client"
import {survey} from '@/constants/survey'
import {CustomDataTable} from '@/components/datatable/CustomDataTable'
import {Chip,Tooltip,IconButton} from '@material-tailwind/react'
import { MdModeEditOutline,MdOutlineDeleteOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import Link from 'next/link'
import moment from 'moment'
import {TableColumn} from 'react-data-table-component';


interface DataRow{
    id:number,
    project_name:string;
    project_manager:string;
    budget:string;
    status:string;
    created_at:string;

}

export default function Survey() {


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
            <CustomDataTable searchAttr={'project_name'} componentData={survey}
                             componentColumns={columns}/>

        </main>
    );
}
