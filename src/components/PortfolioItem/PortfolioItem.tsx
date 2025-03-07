import { Button } from "../../UI/Button/Button";
import styles from "./PortfolioItem.module.scss";
import clsx from "clsx";
import { PORTFOLIO_ACTION_TYPE, PortfolioItemProps } from "./types";

export const PortfolioItem = ({
  id,
  name,
  quantity,
  currentPrice,
  total,
  onClick,
  classNames,
}: PortfolioItemProps) => {
  return (
    <div className={clsx(styles.container, classNames)}>
      <span>
        <p className={styles.name}>{name}</p>
        <p className={styles.metadata}>Quantity: {quantity}</p>
        <p className={styles.metadata}>Current price: ${currentPrice}</p>
        <p className={styles.metadata}>Total: ${total}</p>
      </span>

      <span className={styles.ctaGroup}>
        <Button
          label="Show history"
          onClick={() => onClick(PORTFOLIO_ACTION_TYPE.SHOW, id)}
        />
        <Button
          label="Edit"
          onClick={() => onClick(PORTFOLIO_ACTION_TYPE.EDIT, id)}
        />
        <Button
          label="Delete"
          onClick={() => onClick(PORTFOLIO_ACTION_TYPE.DELETE, id)}
        />
      </span>
    </div>
  );
};
