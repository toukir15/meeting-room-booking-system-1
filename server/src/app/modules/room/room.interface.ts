export type TRoom = {
  roomName: string;
  capacity: string;
  pricePerSlot: string;
  roomNo: string;
  floorNo: string;
  availableQuantity: string;
  images?: string[];
  amenities: string[];
  isDeleted: boolean;
};

export type TMulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

export type TQuery = {
  search?: string;
  priceMin?: string;
  priceMax?: string;
  capacityMin?: string;
  capacityMax?: string;
  sort?: string;
};
