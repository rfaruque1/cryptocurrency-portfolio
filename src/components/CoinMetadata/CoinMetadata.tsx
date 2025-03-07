import { useSelector } from "react-redux";
import { Panel } from "../../UI/Panel/Panel";
import {
  selectPortfolioItems,
  selectPortfolioItemToViewData,
} from "../../store/portfolio/selectors";
import { useFetch } from "../../hooks/useFetch";
import { COINS_URL } from "../../constants";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "./CoinMetadata.module.scss";
import { CoinHistoryResponse, CoinMetadataResponse } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const CoinMetadata = () => {
  const { data: historyData, setPath: setHistoryPath } =
    useFetch<CoinHistoryResponse>({
      url: COINS_URL,
      autoFetch: false,
    });

  const { data: metaData, setPath } = useFetch<CoinMetadataResponse>({
    url: COINS_URL,
    autoFetch: false,
  });

  const portfolioItemToView = useSelector(selectPortfolioItemToViewData);
  const portfolioItemsLength = useSelector(selectPortfolioItems).length;

  const [chartData, setChartData] = useState<{
    labels: string[];
    prices: number[];
  }>();

  useEffect(() => {
    if (portfolioItemToView) {
      setHistoryPath(
        `/${portfolioItemToView.id}/market_chart?vs_currency=usd&days=30`
      );

      setPath(`/${portfolioItemToView.id}`);
    }
  }, [portfolioItemToView, setHistoryPath, setPath]);

  useEffect(() => {
    if (historyData) {
      const labels = historyData.prices.map(([date]) =>
        new Date(date).toLocaleDateString()
      );

      const prices = historyData.prices.map(([, prices]) => prices);

      setChartData({ labels, prices });
    }
  }, [historyData]);

  const stringToRender =
    portfolioItemsLength > 0
      ? "Select a currency history to view data"
      : "Add a currency first to see performance";

  return (
    <Panel classNames={styles.container}>
      <h3 className={styles.title}>Coin Historic Performance</h3>
      {chartData && (
        <Line
          data={{
            labels: chartData.labels,
            datasets: [
              { label: portfolioItemToView?.name, data: chartData.prices },
            ],
          }}
          options={{ scales: { x: { type: "category" } } }}
        />
      )}

      {chartData && (
        <div className={styles.metadata}>
          <h5>Market Cap: ${metaData?.market_data.market_cap.usd}</h5>
          <h5>24 hour high: ${metaData?.market_data.high_24h.usd}</h5>
          <h5>24 hour low: ${metaData?.market_data.low_24h.usd}</h5>
          <h5>
            Price change over 24 hour: ${metaData?.market_data.price_change_24h}
          </h5>
          <h5>Total supply: ${metaData?.market_data.total_supply}</h5>
          <h5>Hashing algrothim: {metaData?.hashing_algorithm}</h5>
        </div>
      )}

      <h5 className={styles.description}>{!chartData && stringToRender}</h5>
    </Panel>
  );
};
