import { create } from 'zustand';
import Cookies from 'js-cookie';
import axios from 'axios';

const token = Cookies.get('token');
const theToken = token ? token : undefined;

interface Auth {
  token: string | undefined;
  user: { 
    first_name: string;
    middle_name: string;
    last_name:string;
    email:string;
    phonenumber:string;
    alt_phonenumber:string;
    identification_type:string;
    TIN:string;
    contract:string;
    application_letter:string;
    is_internal_employee:boolean;
    profile_image:string;
    bank_name:string;
    bank_card_number:string;
    tax_implication:string;
    created_at:string;
    updated_at:string;
    permissions: string[]; 

   } | null;
  setUser: () => void;
  logout:()=>void;
}

export const globalStore = create<Auth>((set) => ({
  token: theToken, 
  user: null,
  setUser: async () => {
    if (theToken) {
      try {
        const response = await axios.get('http://localhost:8000/user/detail', {
          headers: {
            Authorization: `Bearer ${theToken}`,
          },
        });
        
        
        set({ user: response.data });
      } catch (error) {
        console.error("Error fetching user details:", error);
        
      }
    }
  },
  logout : ()=>{
    Cookies.remove('token')
    set({user:null})
    
  }
}));
