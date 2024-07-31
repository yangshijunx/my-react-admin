import { init, Chart } from 'klinecharts';
import React, { useEffect, useRef } from 'react';

// 定义数据类型
interface Data {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  turnover: number;
}

function KLineChart(): React.ReactElement {
  const chartRef = useRef<Chart | null>(null);

  // 数据生成函数
  const genData = (timestamp = new Date().getTime(), length = 800): Data[] => {
    let basePrice = 5000;
    timestamp = Math.floor(timestamp / 1000 / 60) * 60 * 1000 - length * 60 * 1000;
    const dataList: Data[] = [];
    for (let i = 0; i < length; i += 1) {
      const prices: number[] = [];
      for (let j = 0; j < 4; j += 1) {
        prices.push(basePrice + Math.random() * 60 - 30);
      }
      prices.sort((a, b) => a - b);
      const open = +prices[Math.round(Math.random() * 3)].toFixed(2);
      const high = +prices[3].toFixed(2);
      const low = +prices[0].toFixed(2);
      const close = +prices[Math.round(Math.random() * 3)].toFixed(2);
      const volume = Math.round(Math.random() * 100) + 10;
      const turnover = ((open + high + low + close) / 4) * volume;
      dataList.push({ timestamp, open, high, low, close, volume, turnover });

      basePrice = close;
      timestamp += 60 * 1000;
    }
    return dataList;
  };

  useEffect(() => {
    if (chartRef.current === null) {
      chartRef.current = init('k-line-chart');
      chartRef.current?.applyNewData(genData());
    }

    // 更新数据
    const updateData = () => {
      setTimeout(() => {
        const dataList = chartRef.current!.getDataList();
        const lastData = dataList[dataList.length - 1];
        const newData: any = { ...lastData };
        newData.close += Math.random() * 20 - 10;
        newData.high = Math.max(newData.high, newData.close);
        newData.low = Math.min(newData.low, newData.close);
        newData.volume += Math.round(Math.random() * 10);
        chartRef.current!.updateData(newData);
        updateData();
      }, 600);
    };

    updateData();

    // 加载更多数据
    chartRef.current?.loadMore((timestamp) => {
      setTimeout(() => {
        chartRef.current!.applyMoreData(genData(timestamp as number), true);
      }, 2000);
    });

    // 清理函数
    return () => {
      if (chartRef.current) {
        (chartRef.current as any).dispose();
        chartRef.current = null;
      }
    };
  }, []);

  return <div id="k-line-chart" style={{ height: '100%', width: '100%' }} />;
}

export default KLineChart;
