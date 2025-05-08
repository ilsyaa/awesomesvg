import mongooseConnect from "@/lib/mongoose";
import Icon from "@/models/Icon";

export async function GET(req) {
    try {
        await mongooseConnect();
        
        const { searchParams } = new URL(req.url);
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit")) || 10));
        const search = searchParams.get("search")?.toLowerCase().trim();
    
        const pipeline = [];
        
        if (search) {
            pipeline.push({
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
            pipeline.push({ $match: { score: { $gt: 0 } } });
            pipeline.push({ $sort: { score: -1 } });
        }
        
        pipeline.push(
            { $unwind: "$packs" }
        );
        pipeline.push({ $unwind: "$packs.styles" });
        pipeline.push({
            $group: {
                _id: {
                    pack: "$packs.key",
                    style: "$packs.styles.key"
                },
                icons: {
                    $push: {
                        _id: "$_id",
                        key: "$key",
                        label: "$label",
                        score: { $ifNull: ["$score", 0] },
                        svg: "$packs.styles.svg"
                    }
                }
            }
        });
        
        if (search) {
            pipeline.push({
                $addFields: {
                    icons: {
                        $sortArray: {
                            input: "$icons",
                            sortBy: { score: -1 }
                        }
                    }
                }
            });
        }
        
        pipeline.push(
            {
                $project: {
                    _id: 0,
                    pack: "$_id.pack",
                    style: "$_id.style",
                    icons: { 
                        $map: {
                            input: { $slice: ["$icons", limit] },
                            as: "icon",
                            in: {
                                _id: "$$icon._id",
                                key: "$$icon.key",
                                label: "$$icon.label",
                                svg: "$$icon.svg"
                            }
                        }
                    },
                    count: { $size: "$icons" }
                }
            },
            { $match: { count: { $gt: 0 } } },
            { $project: { pack: 1, style: 1, icons: 1 } },
            { $sort: { pack: 1, style: 1 } }
        );

        const result = await Icon.aggregate(pipeline);
        
        return new Response(
            JSON.stringify({ 
                total: result.length,
                data: result,
                filters: {
                    search: search || null,
                }
            }),
            { headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error in icon discovery API:", error);
        return new Response(
            JSON.stringify({ 
                error: "Failed to fetch icon discovery data",
                message: error.message 
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}