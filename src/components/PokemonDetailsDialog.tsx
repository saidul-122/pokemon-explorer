
import { Pokemon, typeEffectiveness } from "@/types/pokemon";
import PokemonTypeBadge from "./PokemonTypeBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Info } from "lucide-react";

interface PokemonDetailsDialogProps {
  pokemon: Pokemon;
  isOpen: boolean;
  onClose: () => void;
}

const PokemonDetailsDialog = ({ pokemon, isOpen, onClose }: PokemonDetailsDialogProps) => {
  const { id, name, sprites, types, weight, height, stats, abilities } = pokemon;
  
  // Calculate weaknesses based on pokemon types
  const getTypeEffectiveness = () => {
    const weaknesses = new Set<string>();
    const resistances = new Set<string>();
    const immunities = new Set<string>();
    
    types.forEach(({ type }) => {
      const typeData = typeEffectiveness[type.name];
      if (typeData) {
        typeData.weakTo.forEach(t => weaknesses.add(t));
        typeData.resistantTo.forEach(t => resistances.add(t));
        typeData.immuneTo.forEach(t => immunities.add(t));
      }
    });
    
    // Remove resistances from weaknesses (they cancel out)
    [...resistances].forEach(type => weaknesses.delete(type));
    
    // If immune, remove from both weaknesses and resistances
    [...immunities].forEach(type => {
      weaknesses.delete(type);
      resistances.delete(type);
    });
    
    return { weaknesses: [...weaknesses], resistances: [...resistances], immunities: [...immunities] };
  };
  
  const { weaknesses, resistances, immunities } = getTypeEffectiveness();
  
  const formatStatName = (statName: string) => {
    switch (statName) {
      case 'hp': return 'HP';
      case 'attack': return 'Attack';
      case 'defense': return 'Defense';
      case 'special-attack': return 'Sp. Atk';
      case 'special-defense': return 'Sp. Def';
      case 'speed': return 'Speed';
      default: return statName;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize flex items-center">
            <span>#{String(id).padStart(3, '0')}</span>
            <span className="mx-2">•</span>
            <span>{name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4">
            <img 
              src={sprites.other["official-artwork"].front_default || sprites.front_default}
              alt={name}
              className="h-48 w-48 object-contain"
            />
            <div className="flex gap-2 mt-4">
              {types.map(({ type }) => (
                <PokemonTypeBadge key={type.name} type={type.name} className="text-sm" />
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Basic Info</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">Height</div>
                <div>{(height / 10).toFixed(1)} m</div>
                <div className="text-gray-600">Weight</div>
                <div>{(weight / 10).toFixed(1)} kg</div>
              </div>
            </div>
            
            {abilities && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {abilities.map(({ ability, is_hidden }) => (
                    <Badge key={ability.name} variant={is_hidden ? "outline" : "default"} className="capitalize">
                      {ability.name.replace('-', ' ')}
                      {is_hidden && <span className="ml-1 text-xs">(Hidden)</span>}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {stats && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Base Stats</h3>
                <div className="space-y-2">
                  {stats.map(({ stat, base_stat }) => (
                    <div key={stat.name} className="flex items-center">
                      <span className="w-20 text-sm text-gray-600">{formatStatName(stat.name)}</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-pokemon-red" 
                          style={{ width: `${Math.min(100, (base_stat / 255) * 100)}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-sm font-medium">{base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-1">
            <Info className="h-4 w-4" /> Type Effectiveness
          </h3>
          
          {weaknesses.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">Weak to (2x damage)</p>
              <div className="flex flex-wrap gap-1">
                {weaknesses.map(type => (
                  <PokemonTypeBadge key={type} type={type} className="text-xs py-0.5" />
                ))}
              </div>
            </div>
          )}
          
          {resistances.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">Resistant to (½ damage)</p>
              <div className="flex flex-wrap gap-1">
                {resistances.map(type => (
                  <PokemonTypeBadge key={type} type={type} className="text-xs py-0.5" />
                ))}
              </div>
            </div>
          )}
          
          {immunities.length > 0 && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-1">Immune to (0 damage)</p>
              <div className="flex flex-wrap gap-1">
                {immunities.map(type => (
                  <PokemonTypeBadge key={type} type={type} className="text-xs py-0.5" />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonDetailsDialog;
