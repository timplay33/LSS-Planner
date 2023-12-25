import { getBuildingDictionary } from "$lib";
import { supabase } from "$lib/supabaseClient";

export async function load() {
  const buildings = await supabase.from("buildings").select().order("caption", { ascending: true });
  const buildingDictionary = await getBuildingDictionary();
  return {
    buildings: buildings.data ?? [],
    buildingDictionary: buildingDictionary ?? [],
  };
}