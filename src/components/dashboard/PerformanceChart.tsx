import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Calendar, ChevronDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const PerformanceChart = () => {
  const { portfolioSummary } = usePortfolio();
  const [timeRange, setTimeRange] = useState('1y');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [chartLoaded, setChartLoaded] = useState(false);
  const [chartInstance, setChartInstance] = useState<any>(null);

  useEffect(() => {
    if (!chartLoaded) {
      // Load Chart.js dynamically
      import('chart.js/auto').then(() => {
        import('chart.js').then((ChartJS) => {
          // Register required components
          ChartJS.Chart.register(
            ChartJS.CategoryScale,
            ChartJS.LinearScale,
            ChartJS.PointElement,
            ChartJS.LineElement,
            ChartJS.Title,
            ChartJS.Tooltip,
            ChartJS.Legend
          );
          setChartLoaded(true);
        });
      });
    } else if (chartLoaded && portfolioSummary.performanceData.length > 0) {
      renderChart();
    }
    
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartLoaded, portfolioSummary, timeRange]);

  const renderChart = () => {
    const ctx = document.getElementById('performanceChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    if (chartInstance) {
      chartInstance.destroy();
    }
    
    // Get the chart data based on time range
    const chartData = filterDataByTimeRange(portfolioSummary.performanceData, timeRange);
    
    // Performance line chart
    const isDarkMode = document.documentElement.classList.contains('dark');
    const textColor = isDarkMode ? '#e5e7eb' : '#4b5563';
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    import('chart.js').then((ChartJS) => {
      const newChartInstance = new ChartJS.Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.map(item => {
            const date = new Date(item.date);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }),
          datasets: [
            {
              label: 'Portfolio Value',
              data: chartData.map(item => item.value),
              fill: true,
              backgroundColor: isDarkMode 
                ? 'rgba(14, 165, 233, 0.1)' 
                : 'rgba(14, 165, 233, 0.1)',
              borderColor: '#0ea5e9',
              borderWidth: 2,
              tension: 0.4,
              pointBackgroundColor: '#0ea5e9',
              pointBorderColor: isDarkMode ? '#111827' : '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 4,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: isDarkMode ? '#374151' : '#ffffff',
              titleColor: isDarkMode ? '#e5e7eb' : '#111827',
              bodyColor: isDarkMode ? '#e5e7eb' : '#111827',
              borderColor: isDarkMode ? '#4b5563' : '#e5e7eb',
              borderWidth: 1,
              displayColors: false,
              callbacks: {
                label: function(context) {
                  return formatCurrency(context.parsed.y);
                }
              }
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: textColor,
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 6,
              },
            },
            y: {
              grid: {
                color: gridColor,
              },
              ticks: {
                color: textColor,
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              },
              beginAtZero: false,
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
            }
          },
        }
      });
      
      setChartInstance(newChartInstance);
    });
  };

  const filterDataByTimeRange = (data: any[], range: string) => {
    // For this mockup, we'll return the same data but in real app would filter by date
    return data;
  };

  const timeRangeOptions = [
    { value: '1m', label: '1M' },
    { value: '3m', label: '3M' },
    { value: '6m', label: '6M' },
    { value: '1y', label: '1Y' },
    { value: 'all', label: 'All' },
  ];

  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Performance</h2>
        
        <div className="flex items-center">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 py-1 px-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <span>{timeRangeOptions.find(opt => opt.value === timeRange)?.label}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10 animate-fade-in">
                {timeRangeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTimeRange(option.value);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      timeRange === option.value ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="ml-2 p-1.5 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors duration-200">
            <Calendar className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="h-[300px] relative">
        {!chartLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="dot-flashing"></div>
          </div>
        )}
        <canvas id="performanceChart"></canvas>
      </div>
    </div>
  );
};

export default PerformanceChart;