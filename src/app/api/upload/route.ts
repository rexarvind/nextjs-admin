
export async function POST(req: Request) {
    const data = await req.formData();
    if(data){
        const file = data.get('file');
        console.log(file);
        return Response.json(true);
    } else {
        return Response.json(false);
    }
}
