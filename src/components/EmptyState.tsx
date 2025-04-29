
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  searchTerm: string;
  selectedType: string;
  onReset: () => void;
}

const EmptyState = ({ searchTerm, selectedType, onReset }: EmptyStateProps) => {
  const typeFilter = selectedType !== "all" ? ` type "${selectedType}"` : "";
  
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 text-center">
      <SearchX className="h-12 w-12 text-gray-400 mb-4" />
      <h2 className="text-xl font-bold text-gray-800 mb-2">No Pokémon found</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We couldn't find any Pokémon matching "{searchTerm}"{typeFilter}
      </p>
      <Button onClick={onReset} variant="outline">
        Clear filters
      </Button>
    </div>
  );
};

export default EmptyState;
