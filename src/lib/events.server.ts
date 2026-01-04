import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Event } from "./events";

const eventsDirectory = path.join(process.cwd(), "content/events");

export function getAllEventsServer(): Event[] {
  if (!fs.existsSync(eventsDirectory)) return [];

  const fileNames = fs.readdirSync(eventsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(eventsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return { ...data, content } as Event;
    });
}

export function getActiveEventsServer(): Event[] {
  return getAllEventsServer().filter((e) => e.isActive);
}

export function getEventBySlugServer(slug: string): Event | undefined {
  return getAllEventsServer().find((e) => e.slug === slug);
}

export function getAllEventSlugsServer(): string[] {
  return getAllEventsServer().map((e) => e.slug);
}
