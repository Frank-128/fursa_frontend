import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
    const token = cookies().get('token');

    console.log(token);

    if (token) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/signin', request.url));
}


export const config = {
  matcher: ['/','/clients','/payments'],
};
