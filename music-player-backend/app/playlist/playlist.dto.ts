import { type BaseSchema } from "../common/dto/base.dto";

export interface IPlaylist extends BaseSchema {
  name: string;
  createdBy: string;
 
  songs?: Array<string>;

}
