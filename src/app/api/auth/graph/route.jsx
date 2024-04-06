import { NextResponse } from "next/server";


export async function POST(req, res) {
    const obj = {
        metadataBase: 'https://cvcreator-eight.vercel.app',
        title: "cv creator",
        description: "create your cv this web site make by sifat",
        keywords: [
            "sifat",
            "rasifat",
            "smn",
            "cv",
            "resume",
            "prfational cv",
            "cv website",
            "best cv",
            "nice cv",
            "website",
            "create cv",
        ],

        openGraph: "https://cvcreator-eight.vercel.app/jspdf2.png"
    }
    return NextResponse.json({
        status: "success", data: obj
    })

}