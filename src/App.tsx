import { Portfolio } from "./components/Portfolio/Portfolio";
import styles from "./App.module.scss";
import { Modal } from "./components/Modal/Modal";
import { PortfolioResource } from "./components/PortfolioResource/PortfolioResource";
import { useDispatch, useSelector } from "react-redux";
import { selectIsEditMode } from "./store/portfolio/selectors";
import { selectIsModalOpen } from "./store/modal/selectors";
import { closeModal } from "./store/modal/modalSlice";
import {
  clearCurrentTargetPortfolio,
  exitEditMode,
  loadPortfolio,
} from "./store/portfolio/portfolioSlice";
import { useEffect } from "react";
import { useFetch } from "./hooks/useFetch";
import { Currencies, loadCurrencies } from "./store/currencies/currenciesSlice";
import { CoinMetadata } from "./components/CoinMetadata/CoinMetadata";
import {
  CURRENCIES_ITEMS_LOCAL_STORAGE_KEY,
  PORTFOLIO_ITEMS_LOCAL_STORAGE_KEY,
} from "./constants";

export interface CurrenciesDataResponse {
  id: string;
  name: string;
  symbol: string;
}

function App() {
  const {
    data: currenciesData,
    fetchData: fetchCurrenciesData,
    loading,
  } = useFetch<CurrenciesDataResponse[]>({
    url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1",
    autoFetch: false,
  });

  const dispatch = useDispatch();

  const isEditMode = useSelector(selectIsEditMode);
  const isModalOpen = useSelector(selectIsModalOpen);

  const handleOnClose = () => {
    dispatch(closeModal());
    dispatch(clearCurrentTargetPortfolio());

    if (isEditMode) {
      dispatch(exitEditMode());
    }
  };

  useEffect(() => {
    const savedPortfolio = localStorage.getItem(
      PORTFOLIO_ITEMS_LOCAL_STORAGE_KEY
    );

    if (savedPortfolio) {
      dispatch(loadPortfolio(JSON.parse(savedPortfolio)));
    }
  }, [dispatch]);

  useEffect(() => {
    const savedCurrencies = localStorage.getItem(
      CURRENCIES_ITEMS_LOCAL_STORAGE_KEY
    );

    if (!savedCurrencies) {
      fetchCurrenciesData();

      if (currenciesData) {
        const currenciesDataToMap: Currencies[] = currenciesData.map(
          ({ id, name, symbol }) => ({
            id,
            name: `${name} (${symbol.toUpperCase()})`,
          })
        );

        dispatch(loadCurrencies(currenciesDataToMap));
      }
    } else {
      dispatch(loadCurrencies(JSON.parse(savedCurrencies)));
    }
  }, [currenciesData, dispatch, fetchCurrenciesData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Portfolio />
      <CoinMetadata />

      {isModalOpen && (
        <Modal
          classNames={styles.modal}
          modalTitle={
            isEditMode ? "Edit Cryptocurrency" : "Add new Cryptocurrency"
          }
          onClose={handleOnClose}
        >
          <PortfolioResource />
        </Modal>
      )}
    </div>
  );
}

export default App;
