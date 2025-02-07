import fs from 'fs';
import path from 'path';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 25;
    const search = searchParams.get('search') || null;

    const jsonData = fs.readFileSync(path.join(process.cwd(), 'data', 'icons.json'));
    const data = JSON.parse(jsonData);
    let filteredIcons = []

    if (search) {
        filteredIcons = Object.entries(data).filter(
            ([key, value]) => {
                return key.toLowerCase().includes(search.toLowerCase()) ||
                    value.label.toLowerCase().includes(search.toLowerCase()) ||
                    value.search.terms.some(term => term.toLowerCase().includes(search.toLowerCase()));
            }
        )
    } else {
        filteredIcons = Object.entries(data);
    }

    filteredIcons.sort((a, b) => {
        return b[1].voted - a[1].voted;
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedIcons = filteredIcons.slice(startIndex, endIndex);

    return new Response(JSON.stringify({
        total: filteredIcons.length,
        page: page,
        limit: limit,
        data: paginatedIcons,
    }), {
        headers: { 'Content-Type': 'application/json' },
    });
}