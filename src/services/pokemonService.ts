
import { Pokemon, PokemonBasic } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchAllPokemon(limit = 150): Promise<PokemonBasic[]> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon list");
    }
    
    const data = await response.json();
    return data.results.map((pokemon: any, index: number) => ({
      ...pokemon,
      id: index + 1
    }));
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    throw error;
  }
}

export async function fetchPokemonDetails(id: number): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon #${id}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching Pokemon #${id}:`, error);
    throw error;
  }
}

export async function fetchAllPokemonWithDetails(limit = 150): Promise<Pokemon[]> {
  try {
    const basicPokemon = await fetchAllPokemon(limit);
    const detailsPromises = basicPokemon.map(pokemon => 
      fetchPokemonDetails(pokemon.id)
    );
    
    return await Promise.all(detailsPromises);
  } catch (error) {
    console.error("Error fetching Pokemon details:", error);
    throw error;
  }
}

export const getAllPokemonTypes = [
  { value: "all", label: "All Types" },
  { value: "normal", label: "Normal" },
  { value: "fire", label: "Fire" },
  { value: "water", label: "Water" },
  { value: "electric", label: "Electric" },
  { value: "grass", label: "Grass" },
  { value: "ice", label: "Ice" },
  { value: "fighting", label: "Fighting" },
  { value: "poison", label: "Poison" },
  { value: "ground", label: "Ground" },
  { value: "flying", label: "Flying" },
  { value: "psychic", label: "Psychic" },
  { value: "bug", label: "Bug" },
  { value: "rock", label: "Rock" },
  { value: "ghost", label: "Ghost" },
  { value: "dragon", label: "Dragon" },
  { value: "dark", label: "Dark" },
  { value: "steel", label: "Steel" },
  { value: "fairy", label: "Fairy" },
];
