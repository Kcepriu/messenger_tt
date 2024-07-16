import { Response, Request } from "express";

import { RequestType } from "../types/servises.type";
import fs from "fs";
import { filesService, FilesService } from "../services/files.service";

export class FilesController {
  constructor(private filesService: FilesService) {}

  async uploadFiles(req: Request, res: Response) {
    const { files } = req as RequestType;

    const urlFiles = await Promise.all(
      //@ts-ignore
      files?.map(async (file) => {
        const url = await this.filesService.uploadFile(
          file.filename,
          file.path
        );
        fs.rm(file.path, () => {});
        return url;
      })
    );

    res.status(200).json({ code: 200, data: urlFiles });
  }
}

const filesController = new FilesController(filesService);
export { filesController };
