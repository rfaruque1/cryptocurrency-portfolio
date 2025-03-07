import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../UI/Button/Button";
import { PortfolioItem } from "../PortfolioItem/PortfolioItem";

import styles from "./Portfolio.module.scss";
import { selectPortfolioItems } from "../../store/portfolio/selectors";
import { openModal } from "../../store/modal/modalSlice";
import { PORTFOLIO_ACTION_TYPE } from "../PortfolioItem/types";
import {
  deletePortfolioItem,
  enterEditMode,
  setCurrentTargetPortfolio,
  setPortfolioItemToViewData,
} from "../../store/portfolio/portfolioSlice";
import { Panel } from "../../UI/Panel/Panel";
import { Input } from "../../UI/Input/Input";
import { useState } from "react";

export const Portfolio = () => {
  const [filteredPortfolio, setFilteredPortfolio] = useState<string>("");
  const portfolioItems = useSelector(selectPortfolioItems);
  const dispatch = useDispatch();

  const handleOnClick = (action: PORTFOLIO_ACTION_TYPE, id: string) => {
    switch (action) {
      case PORTFOLIO_ACTION_TYPE.EDIT: {
        dispatch(setCurrentTargetPortfolio(id));
        dispatch(enterEditMode());
        dispatch(openModal());
        break;
      }

      case PORTFOLIO_ACTION_TYPE.DELETE: {
        dispatch(deletePortfolioItem(id));
        break;
      }

      case PORTFOLIO_ACTION_TYPE.SHOW: {
        dispatch(setPortfolioItemToViewData(id));
        break;
      }
    }
  };

  return (
    <Panel>
      <span className={styles.titleBlock}>
        <h4>Crypto Portfolio</h4>
        <Button
          classNames={styles.cta}
          label="+ Add New Holding"
          onClick={() => dispatch(openModal())}
        />
      </span>

      {portfolioItems.length > 0 && (
        <Input
          classNames={styles.filter}
          placeholder="Filter your portfolio"
          onChange={(value) => setFilteredPortfolio(value)}
        />
      )}

      <>
        {portfolioItems
          .filter(({ name }) =>
            name.toLowerCase().includes(filteredPortfolio.toLowerCase())
          )
          .map(({ id, name, quantity, currentPrice, total }) => (
            <PortfolioItem
              key={id}
              classNames={styles.items}
              id={id}
              name={name}
              quantity={quantity}
              currentPrice={currentPrice}
              total={total}
              onClick={handleOnClick}
            />
          ))}

        {portfolioItems.length <= 0 && (
          <h5 className={styles.noItems}>Add your first currency</h5>
        )}
      </>
    </Panel>
  );
};
