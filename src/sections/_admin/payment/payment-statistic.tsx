import dayjs from 'dayjs';
import { useMemo, useState, useEffect } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Card, Stack, Divider, MenuItem, TextField, CircularProgress } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import { useGetPaymentStatistic } from 'src/actions/payment';

import { Chart, useChart } from 'src/components/chart';
import { EmptyContent } from 'src/components/empty-content';

export default function PaymentStatistic() {
  const [group, setGroup] = useState<'day' | 'month' | 'year'>('month');
  const [startDate, setStartDate] = useState<any>(() =>
    dayjs().subtract(3, 'month').startOf('month')
  );
  const [endDate, setEndDate] = useState<any>(() => dayjs().endOf('month'));
  const { statistics, statisticsLoading, statisticsEmpty } = useGetPaymentStatistic(
    startDate,
    endDate,
    group
  );
  const chartSeries = useMemo(() => statistics.map((i) => i.totalAmount), [statistics]);

  const categories = useMemo(() => statistics.map((i) => i.group), [statistics]);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value: number) => fCurrency(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        //   barHeight: '28%',
        borderRadius: 2,
      },
    },
    xaxis: {
      categories,
    },
  });

  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          select
          label="Thời gian"
          fullWidth
          sx={{ maxWidth: 200 }}
          size="small"
          value={group}
          onChange={(event) => setGroup(event.target.value as 'day' | 'month' | 'year')}
        >
          <MenuItem value="day">Ngày</MenuItem>
          <MenuItem value="month">Tháng</MenuItem>
          <MenuItem value="year">Năm</MenuItem>
        </TextField>
        <FilterDate label="Ngày bắt đầu" defaultValue={startDate} onChange={setStartDate} />
        <FilterDate label="Ngày kết thúc" defaultValue={endDate} onChange={setEndDate} />
      </Stack>
      <Divider sx={{ my: 2 }} />

      {!statisticsEmpty && (
        <Chart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          width="100%"
          height={364}
        />
      )}
      {statisticsEmpty && <EmptyContent filled title="Chưa có dữ liệu !" />}
      {statisticsLoading && (
        <Stack alignItems="center" height={1} width={1} p={2}>
          <CircularProgress />
        </Stack>
      )}
    </Card>
  );
}

type FilterDateProps = {
  label: string;
  defaultValue: string;
  onChange: (date: string) => void;
};
function FilterDate({ label, defaultValue, onChange }: FilterDateProps) {
  const [value, setValue] = useState<any>(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (dayjs(value).isValid()) onChange(value);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, onChange]);

  return (
    <DatePicker
      slotProps={{
        textField: {
          size: 'small',
        },
      }}
      label={label}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
}
