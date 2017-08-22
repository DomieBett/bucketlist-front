export class Items{
  id: number;
  name: string;
  date_created: string;
  date_modified: string;
  done: boolean;
}
export class BucketList{
  id: number;
  name: string;
  items: Items[];
  date_created: string;
  date_modified: string;
  created_by: string;
}