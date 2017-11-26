export class Item {
  id: number;
  name: string;
  date_created: string;
  date_modified: string;
  done: boolean;

  constructor(id: number, name: string, date_created: string,
              date_modified: string, done: boolean){
      this.id = id;
      this.name = name;
      this.date_created = date_created;
      this.date_modified = date_modified;
      this.done = done;
  }
}

export class BucketList {
  id: number;
  name: string;
  items: Item[];
  date_created: string;
  date_modified: string;
  created_by: string;

  constructor(id: number, name: string, items: Item[],
              date_created: string, date_modified: string,
              created_by: string) {
      this.id = id;
      this.name = name;
      this.items = items;
      this.date_created = date_created;
      this.date_modified = date_modified;
      this.created_by = created_by;
  }
}