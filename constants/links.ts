import { MdDashboard, MdList } from "react-icons/md";
import { RiLandscapeLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { FaList, FaUsers } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { CiTrophy } from "react-icons/ci";
import { BsGraphUpArrow } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
import { BiBriefcase } from "react-icons/bi";
import { PiUserListDuotone } from "react-icons/pi";
import { LiaPollSolid } from "react-icons/lia";
export const sidebar_links = [
    {
        name:'Dashboard',
        icon:MdDashboard,
        link:'/dashboard',
        permission:"all",
        sublinks:[]
    },
    {
        name:'Projects',
        icon:BiBriefcase,
        link:'/projects',
        permission:"all",
        sublinks:[
            {
                name:'Projects List',
        icon:FaList,
        link:'/projects',
        permission:"all",
            },
            {
                name:'Plots List',
        icon:MdList,
        link:'/projects/plots',
        permission:"all",
            }
        ]
    },
    ,
    {
        name:'Sales',
        icon:BsGraphUpArrow,
        link:'/sales',
        permission:"all",
        sublinks:[
            {
                name:'Leads management',
                icon:PiUserListDuotone,
                link:'/sales/leads',
                permission:"all",},
                {
                    name:'Sales Orders',
                     icon:LiaPollSolid,
                    link:'/sales/orders',
                     permission:"all",
                },
                {
                    name:'Sales List',
                    icon:FaList,
                 link:'/sales',
                 permission:"all",
                }
        ]
    },
    {
        name:'Payments',
        icon:BsCashCoin,
        link:'/payments',
        permission:"payments.view_payments",
        sublinks:[]
    },
    {
        name:'Human Resource',
        icon:ImUsers,
        link:'/human_resource',
        permission:"custom_user.view_customuser",
        sublinks:[
            {
                name:'Staff List',
        icon:ImUsers,
        link:'/human_resource/staff',
        permission:"all",
            }
        ]
    },
    {
        name:'Title deeds',
        icon:FaUsers,
        link:'/title_deeds',
        permission:"all",
        sublinks:[]
    },
    {
        name:'Promotions',
        icon:CiTrophy,
        link:'/promotions',
        permission:"all",
        sublinks:[]
    },
    {
        name:'Reports',
        icon:TbReport,
        link:'/reports',
        permission:"all",
        sublinks:[]
    },
]
