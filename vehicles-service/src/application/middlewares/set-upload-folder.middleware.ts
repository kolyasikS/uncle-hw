import { UploadRequest } from "@/domain/interfaces/request.interface";

export const setUploadFolder =
  (folder: string) => (req: UploadRequest, res: any, next: any) => {
    req.uploadFolder = folder;
    next();
  };
