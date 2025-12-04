import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
    try{
        await connectToDatabase();
        const products = await Product.find();

        return new Response(JSON.stringify(products),{
            status:200,
            headers:{"Content-Type":"application/json"},
        });
    }catch(error){
        return new Response(
            JSON.stringify({message: "Error fetching products",error:error.message}),
            {status:500}
        );
    }
}