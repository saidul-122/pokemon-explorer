
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pokemon } from "@/types/pokemon";
import { fetchAllPokemonWithDetails, getAllPokemonTypes } from "@/services/pokemonService";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

const PokemonExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const { 
    data: pokemonList, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["pokemon"],
    queryFn: () => fetchAllPokemonWithDetails(150),
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
  };

  const filteredPokemon = pokemonList?.filter((pokemon: Pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || pokemon.types.some(t => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  if (isLoading) return <LoadingState />;

  if (error) return (
    <ErrorState 
      message="Failed to load Pokémon data. Please check your connection and try again." 
      onRetry={refetch}
    />
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          typeOptions={getAllPokemonTypes}
        />
      </div>

      {filteredPokemon && filteredPokemon.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemon.map((pokemon: Pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <EmptyState 
          searchTerm={searchTerm} 
          selectedType={selectedType} 
          onReset={resetFilters} 
        />
      )}
    </div>
  );
};

export default PokemonExplorer;
