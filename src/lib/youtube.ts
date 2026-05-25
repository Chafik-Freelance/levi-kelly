import { XMLParser } from "fast-xml-parser";

const channelID = "UC3hEhxxlq9OWXWp4t4uYXKw";

export const getLatestVideos = async () => {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=UC3hEhxxlq9OWXWp4t4uYXKw`;

    const response = await fetch(url);
    const xml = await response.text();

    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "",
    });

    const data = parser.parse(xml);

    const videos = data.feed.entry.slice(0, 6).map((video: any) => ({
        id: video["yt:videoId"],
        title: video.title,
        link: video.link.href,
        published: new Date(video.published).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        }),
        thumbnail: `https://i.ytimg.com/vi/${video["yt:videoId"]}/hqdefault.jpg`,
    }));

    return videos;
}