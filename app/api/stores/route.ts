import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function POST (
    req: Request,
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name } = body;
        
        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        if (!name) {
            return new NextResponse("Name is reqired", {status: 400});
        }

        const store = await prismadb.store.create({
            data:{
                name,
                userId
            }
        });
        return NextResponse.json(store);
        
    }catch (error) {
        console.log("[Stores_POST]", error);
        return new NextResponse("Interal error", {status: 500})
    }
}