export class VehicleNotFoundError extends Error {
  constructor(id: string) {
    super(`Vehicle with id ${id} not found`);
    this.name = "VehicleNotFoundError";
  }
}

export class VehicleUpdateDBError extends Error {
  constructor(id: string) {
    super(`Vehicle with id ${id} failed to be updated.`);
    this.name = "VehicleUpdateDBError";
  }
}

export class VehicleDeleteDBError extends Error {
  constructor(id: string) {
    super(`Vehicle with id ${id} failed to be deleted.`);
    this.name = "VehicleDeleteDBError";
  }
}

export class VehicleUploadError extends Error {
  constructor() {
    super(`No photos uploaded.`);
    this.name = "VehicleUploadError";
  }
}
