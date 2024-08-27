import { MdDashboard } from "react-icons/md";
import { RiLandscapeLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { CiTrophy } from "react-icons/ci";
import { BsGraphUpArrow } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
export const sidebar_links = [
    {
        name:'Dashboard',
        icon:MdDashboard,
        link:'/',
        permission:"all"
    },
    {
        name:'Projects',
        icon:RiLandscapeLine,
        link:'/projects',
        permission:"all"
    },
    ,
    {
        name:'Sales',
        icon:BsGraphUpArrow,
        link:'/sales',
        permission:"all"
    },
    {
        name:'Payments',
        icon:BsCashCoin,
        link:'/payments',
        permission:"payments.view_payments"
    },
    {
        name:'Staff',
        icon:ImUsers,
        link:'/staff',
        permission:"custom_user.view_customuser"
    },
    {
        name:'Clients',
        icon:FaUsers,
        link:'/clients',
        permission:"all"
    },
    {
        name:'Promotions',
        icon:CiTrophy,
        link:'/promotions',
        permission:"all"
    },
    {
        name:'Reports',
        icon:TbReport,
        link:'/reports',
        permission:"reports.view_reports"
    },
]
