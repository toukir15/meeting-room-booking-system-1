export type TRoom = {
  name: string;
  capacity: number;
  pricePerSlot: number;
  roomNo: number;
  floorNo: number;
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
