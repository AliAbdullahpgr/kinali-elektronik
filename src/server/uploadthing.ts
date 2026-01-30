import { UploadThingError } from "@uploadthing/shared";
import { createUploadthing } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

import { auth } from "~/server/auth";

const f = createUploadthing();
const utapi = new UTApi();

export const uploadRouter = {
  productImages: f({ image: { maxFileCount: 8, maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) {
        throw new UploadThingError("Unauthorized");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      try {
        const response = await fetch(file.url);
        const buffer = Buffer.from(await response.arrayBuffer());
        const sharp = (await import("sharp")).default;
        const webp = await sharp(buffer)
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer();

        const webpFile = new File(
          [new Uint8Array(webp)],
          file.name.replace(/\.[^/.]+$/, ".webp"),
          { type: "image/webp" }
        );
        const uploaded = await utapi.uploadFiles(webpFile);

        return {
          url: uploaded.data?.url ?? file.url,
          key: uploaded.data?.key ?? file.key,
          originalUrl: file.url,
        };
      } catch {
        return { url: file.url, key: file.key };
      }
    }),
};

export type UploadRouter = typeof uploadRouter;
