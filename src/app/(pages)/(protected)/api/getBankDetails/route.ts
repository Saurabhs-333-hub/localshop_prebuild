import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const res = await fetch('https://ifsc.razorpay.com/' + req.body);
        const data = await res.json();
        console.log(data)
        return NextResponse.json(data);
    } catch (error) {


        return NextResponse.json(error);
    }

}