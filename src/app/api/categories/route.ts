import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";

export async function POST(req: Request) {
    const body = await req.json();
    const { title, slug, parent } = body;
    await mongooseConnect();
    const categoryDoc = await Category.create({
        title, slug, parent
    });
    return Response.json(categoryDoc);
}

export async function PUT(req: Request) {
    const body = await req.json();
    const { _id, title, slug, parent } = body;
    await mongooseConnect();
    const categoryDoc = await Category.updateOne({ _id: _id }, {
        title, slug, parent
    });
    return Response.json(categoryDoc);
}

export async function DELETE(req: Request) {
    await mongooseConnect();
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id');
    if (_id && _id.length) {
        await Category.deleteOne({ _id: _id });
        return Response.json(true);
    } else {
        return Response.json(true);
    }
}

export async function GET(req: Request) {
    await mongooseConnect();
    return Response.json(await Category.find().populate('parent'));
}



