import { ResponsiveBar } from '@nivo/bar';

type BarChartProps = {
  transactions: {
    numSold: number;
    totalNights: number;
    totalSales: number;
    vanName: string;
  }[];
  className?: string;
};

export default function BarChart({ transactions, className }: BarChartProps) {
  const data = transactions.map((van) => ({
    name: van.vanName,
    Sales: van.totalSales,
  }));
  return (
    <div className={className}>
      <ResponsiveBar
        data={data}
        keys={['Sales']}
        indexBy='name'
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={['rgb(249 115 22)']}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px',
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px',
            },
          },
          grid: {
            line: {
              stroke: '#f3f4f6',
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role='application'
        ariaLabel='A bar chart showing data'
      />
    </div>
  );
}
