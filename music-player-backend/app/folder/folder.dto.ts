import { type BaseSchema } from "../common/dto/base.dto";

/**
 * Represents a Folder object in the system, extending the BaseSchema.
 *
 * @interface IFolder
 * @extends {BaseSchema}
 */
export interface IFolder extends BaseSchema {
  /**
   * The name of the folder.
   *
   * @type {string}
   */
  name: string;

  /**
   * The ID of the parent folder. If null or undefined, it's a root folder.
   *
   * @type {string | null}
   * @optional
   */
  parentId?: string | null;

  /**
   * List of files contained in the folder, represented as an array of file IDs.
   *
   * @type {string[]}
   * @optional
   */
  files?: string[];

  /**
   * The activation status of the folder. Default to true (active).
   *
   * @type {boolean}
   * @optional
   */
  active?: boolean;
}
