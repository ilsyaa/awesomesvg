import mongooseConnect from "@/lib/mongoose";
import Icon from "@/models/Icon";

export async function GET(req) {
    try {
        await mongooseConnect();
        
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        const result = await Icon.findById(id);
        
        return new Response(
            JSON.stringify(result),
            { headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error in icon API:", error);
        return new Response(
            JSON.stringify({ 
                error: "Failed to fetch icon data",
                message: error.message 
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}