import fs from 'fs';
import path from 'path';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 25;
    const search = searchParams.get('search') || null;

    const jsonData = fs.readFileSync(path.join(process.cwd(), 'data', 'icons.json'));
    const data = JSON.parse(jsonData);
    let filteredIcons = [];

    if (search) {
        filteredIcons = Object.entries(data).map(([key, value]) => {
            let score = 0;
            if (key.toLowerCase().includes(search.toLowerCase())) {
                score += 3;
            }
            if (value.label.toLowerCase().includes(search.toLowerCase())) {
                score += 2;
            }
            const termMatches = value.search.terms.filter(term => term.toLowerCase().includes(search.toLowerCase()));
            score += termMatches.length;
            return [key, { ...value, score }];
        });
        filteredIcons = filteredIcons.filter(([key, value]) => value.score > 0);
        filteredIcons.sort((a, b) => b[1].score - a[1].score);
    } else {
        filteredIcons = Object.entries(data);
        filteredIcons.sort((a, b) => b[1].voted - a[1].voted);
    }

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