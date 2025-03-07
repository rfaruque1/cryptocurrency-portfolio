export enum PORTFOLIO_ACTION_TYPE {
  "SHOW",
  "EDIT",
  "DELETE",
}

export interface PortfolioItemProps {
  id: string;
  name: string;
  quantity: number;
  currentPrice: number;
  total: number;
  onClick: (action: PORTFOLIO_ACTION_TYPE, id: string) => void;
  classNames?: string;
}
