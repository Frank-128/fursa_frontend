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
        link:'/'
    },
    {
        name:'Projects',
        icon:RiLandscapeLine,
        link:'/projects'
    },
    ,
    {
        name:'Sales',
        icon:BsGraphUpArrow,
        link:'/sales'
    },
    {
        name:'Payments',
        icon:BsCashCoin,
        link:'/payments'
    },
    {
        name:'Staff',
        icon:ImUsers,
        link:'/staff'
    },
    {
        name:'Clients',
        icon:FaUsers,
        link:'/clients'
    },
    {
        name:'Promotions',
        icon:CiTrophy,
        link:'/promotions'
    },
    {
        name:'Reports',
        icon:TbReport,
        link:'/reports'
    },
]
