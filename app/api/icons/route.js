import mongooseConnect from "@/lib/mongoose";
import Icon from "@/models/Icon";

export async function GET(req) {
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 25;
    const search = searchParams.get("search")?.toLowerCase();
    const pack = searchParams.get("pack")?.toLowerCase();
    const style = searchParams.get("style")?.toLowerCase();
    const skip = (page - 1) * limit;

    const basePipeline = [];

    if (search) {
        basePipeline.push({
            $addFields: {
                score: {
                    $add: [
                        { $cond: [{ $eq: [{ $toLower: "$key" }, search] }, 100, 0] },
                        { $cond: [{ $regexMatch: { input: { $toLower: "$key" }, regex: search, options: "i" } }, 70, 0] },
                        { $cond: [{ $eq: [{ $toLower: "$label" }, search] }, 80, 0] },
                        { $cond: [{ $regexMatch: { input: { $toLower: "$label" }, regex: search, options: "i" } }, 50, 0] },
                        {
                            $cond: [
                                {
                                    $gt: [
                                        {
                                            $size: {
                                                $filter: {
                                                    input: { $ifNull: ["$terms", []] },
                                                    as: "term",
                                                    cond: {
                                                        $regexMatch: { input: { $toLower: "$$term" }, regex: search, options: "i" }
                                                    }
                                                }
                                            }
                                        },
                                        0
                                    ]
                                },
                                30,
                                0
                            ]
                        }
                    ]
                }
            }
        });
        basePipeline.push({ $match: { score: { $gt: 0 } } });
        basePipeline.push({ $sort: { score: -1 } });
    }

    basePipeline.push({ $unwind: "$packs" });
    basePipeline.push({ $unwind: "$packs.styles" });

    if (pack && style) {
        basePipeline.push({ $match: { "packs.key": pack } });
        basePipeline.push({ $match: { "packs.styles.key": style } });
    }

    const countPipeline = [...basePipeline, { $count: "total" }];
    const countResult = await Icon.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    const paginatedPipeline = [...basePipeline, { $skip: skip }, { $limit: limit }];
    const icons = await Icon.aggregate(paginatedPipeline);

    return new Response(JSON.stringify({
        data: icons,
        pagination: {
            total,
            page,
            totalPages,
            limit
        }
    }));
}
