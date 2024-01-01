import type { Vehicle } from '@lss-manager/missionchief-type-definitions/src/api/Vehicle';
import Dexie, { type Table } from 'dexie';


export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  vehicles!: Table<Vehicle>; 

  constructor() {
    super('LSSPlannerDB');
    this.version(1).stores({
        vehicles: '++id, caption, building_id,vehicle_type, fms_real ', // Primary key and indexed props
        buildings: '++id, caption, hiring_phase, leitstelle_building_id, building_type, enabled, small_building, hiring_automatic '
    });
  }
}

export const db = new MySubClassedDexie();