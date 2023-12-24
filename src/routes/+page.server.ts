import { getVehicleDictionary } from "$lib";
import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("vehicles").select().order("caption", { ascending: true });
  const vehicleDictionary = await getVehicleDictionary();
  return {
    vehicles: data ?? [],
    vehicleDictionary: vehicleDictionary ?? []
  };
}