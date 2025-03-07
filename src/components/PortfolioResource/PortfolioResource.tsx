import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../UI/Button/Button";
import { Input } from "../../UI/Input/Input";
import { AutoComplete } from "../AutoComplete/AutoComplete";
import styles from "./PortfolioResource.module.scss";
import {
  selectCurrentTargetPortfolioItem,
  selectIsEditMode,
  selectPortfolioItems,
} from "../../store/portfolio/selectors";
import { useEffect, useState } from "react";
import {
  addToPortfolio,
  PortfolioItem,
  updatePortfolioItem,
} from "../../store/portfolio/portfolioSlice";
import { closeModal } from "../../store/modal/modalSlice";
import { selectAvailableCurrencies } from "../../store/currencies/selectors";
import { useFetch } from "../../hooks/useFetch";
import { COINS_URL } from "../../constants";
import clsx from "clsx";
import { Suggestions } from "../AutoComplete/types";
import { CoinsResponse } from "./types";

export const PortfolioResource = () => {
  const { data: currentPriceForPotentialCoin, setPath } =
    useFetch<CoinsResponse>({
      url: COINS_URL,
      autoFetch: false,
    });

  const dispatch = useDispatch();
  const isEditMode = useSelector(selectIsEditMode);
  const currentTargetPortfolioItem = useSelector(
    selectCurrentTargetPortfolioItem
  );
  const currencies = useSelector(selectAvailableCurrencies);
  const portfolioItems = useSelector(selectPortfolioItems);

  const [id, setId] = useState(currentTargetPortfolioItem?.id || "");
  const [name, setName] = useState(currentTargetPortfolioItem?.name || "");
  const [quantity, setQuantity] = useState<number | undefined>(
    currentTargetPortfolioItem?.quantity
  );
  const [currentPrice, setCurrentPrice] = useState<number>(
    currentTargetPortfolioItem?.currentPrice || 0
  );
  const [autoCompleteErrors, setAutoCompleteErrors] = useState(false);

  const handleAutoCompleteClick = ({ name, id }: Suggestions) => {
    setName(name);
    setId(id);
    setAutoCompleteErrors(false);
  };

  const handleButtonClick = () => {
    const cryptoToTransform: PortfolioItem = {
      name,
      quantity,
      id,
      currentPrice,
      total: Number(((quantity as number) * currentPrice).toFixed(2)),
    } as PortfolioItem;

    const action = isEditMode ? updatePortfolioItem : addToPortfolio;

    dispatch(action(cryptoToTransform));
    dispatch(closeModal());
  };

  useEffect(() => {
    if (isEditMode && currentTargetPortfolioItem) {
      const { name, quantity, currentPrice } = currentTargetPortfolioItem;

      setName(name);
      setQuantity(quantity);
      setCurrentPrice(currentPrice);
    } else {
      setName("");
      setQuantity(undefined);
      setCurrentPrice(0);
    }
  }, [currentTargetPortfolioItem, isEditMode]);

  useEffect(() => {
    if (
      (id && quantity && !isEditMode) ||
      id !== currentTargetPortfolioItem?.id
    ) {
      setPath(`/${id}`);

      if (currentPriceForPotentialCoin) {
        setCurrentPrice(
          currentPriceForPotentialCoin?.market_data.current_price.usd
        );
      }
    }
  }, [
    currentPriceForPotentialCoin,
    currentTargetPortfolioItem?.id,
    id,
    isEditMode,
    quantity,
    setPath,
  ]);

  const enableButton =
    Boolean(name && quantity && currentPrice) && !autoCompleteErrors;

  /*
    This is the component that will be consumed within the modal for adding and editing a resource
  */
  return (
    <>
      <span className={styles.lineItem}>
        <label className={styles.label}>Name: </label>

        <div className={styles.autoComplete}>
          <AutoComplete
            onItemSelect={handleAutoCompleteClick}
            suggestions={currencies}
            suggestionsToRemove={portfolioItems}
            inputValue={name}
            placeholder="Click here to find Cryptocurrencies"
            suggestionValid={(valid) =>
              setAutoCompleteErrors(valid ? false : true)
            }
          />
          {autoCompleteErrors && (
            <h5 className={styles.error}>
              Please select an option from the list only
            </h5>
          )}
        </div>
      </span>
      <span className={styles.lineItem}>
        <label className={styles.label}>Quantity:</label>{" "}
        <Input
          classNames={styles.input}
          onChange={(value) =>
            setQuantity(Number(value) > 0 ? Number(value) : undefined)
          }
          value={String(quantity)}
          type="number"
          placeholder="Enter quantity held as a number"
          min={0.01}
        />
      </span>

      <span
        className={clsx({
          [styles.price]: enableButton,
          [styles.price_disabled]: !enableButton,
        })}
      >
        <div>Current price: ${currentPrice}</div>
        <div>Total: ${quantity ? (quantity * currentPrice).toFixed(2) : 0}</div>
      </span>

      <Button
        classNames={styles.cta}
        disabled={!enableButton}
        label={
          isEditMode ? "Update changes" : "Add Cryptocurrency to Portfolio"
        }
        onClick={handleButtonClick}
      />
    </>
  );
};
