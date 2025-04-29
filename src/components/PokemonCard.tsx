
import { Pokemon } from "@/types/pokemon";
import { Card, CardContent } from "@/components/ui/card";
import PokemonTypeBadge from "./PokemonTypeBadge";
import { useState } from "react";
import PokemonDetailsDialog from "./PokemonDetailsDialog";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { id, name, sprites, types } = pokemon;
  const paddedId = String(id).padStart(3, '0');
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <>
      <Card 
        className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-2 border-gray-100 cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative pt-4 bg-gray-50 flex justify-center">
          <span className="absolute top-2 right-3 text-sm font-mono text-gray-500">#{paddedId}</span>
          <img 
            src={sprites.other["official-artwork"].front_default || sprites.front_default} 
            alt={`${name} sprite`}
            className="h-32 w-32 object-contain transition-transform hover:scale-110"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-bold capitalize text-center mb-2">{name}</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {types.map(({ type }) => (
              <PokemonTypeBadge key={type.name} type={type.name} />
            ))}
          </div>
        </CardContent>
      </Card>

      {showDetails && (
        <PokemonDetailsDialog 
          pokemon={pokemon} 
          isOpen={showDetails} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </>
  );
};

export default PokemonCard;
