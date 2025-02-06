import fs from "fs";

export async function getIcons() {
    try {
        const icons = await fs.promises.readFile("./public/icons.json", "utf-8");
        return JSON.parse(icons);
    } catch (error) {
        console.error(error);
    }
}