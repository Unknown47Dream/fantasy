export interface Deletion {
  change_type: string;
  id: number;
  modified_at: string;
  object: Object;
  type: string;
}

interface Object {
  deleted_at: string;
  reason: string;
  videogame_id: number;
}
