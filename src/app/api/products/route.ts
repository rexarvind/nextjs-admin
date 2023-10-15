import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/product';

export async function POST(req: Request) {
    const body = await req.json();
    const { title, description, price, category } = body;
    await mongooseConnect();
    const productDoc = await Product.create({
        title, description, price, category
    });
    return Response.json(productDoc);
}

export async function PUT(req: Request) {
    const body = await req.json();
    const { title, description, price, category, _id } = body;
    await mongooseConnect();
    await Product.updateOne({ _id: _id }, { title, description, price, category });
    return Response.json(true);
}

export async function DELETE(req: Request) {
    await mongooseConnect();
    const url = new URL(req.url)
    const id = url.searchParams.get('id');
    if (id && id.length) {
        await Product.deleteOne({ _id: id });
        return Response.json(true);
    } else {
        return Response.json(true);
    }
}

export async function GET(req: Request) {
    await mongooseConnect();
    const url = new URL(req.url)
    const id = url.searchParams.get('id');
    if (id && id.length) {
        return Response.json(await Product.findOne({ _id: id }));
    } else {
        return Response.json(await Product.find());
    }
}
