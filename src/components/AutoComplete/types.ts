import { PortfolioItem } from "../../store/portfolio/portfolioSlice";

export interface Suggestions {
  id: string;
  name: string;
}

export interface AutoCompleteProps {
  suggestions: Suggestions[];
  onItemSelect: (item: Suggestions) => void;
  inputValue?: string;
  suggestionsToRemove?: PortfolioItem[];
  placeholder?: string;
  suggestionValid?: (valid: boolean) => void;
}
