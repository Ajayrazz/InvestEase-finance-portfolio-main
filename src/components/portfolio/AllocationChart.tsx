import { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';

const AllocationChart = () => {
  const { portfolioSummary } = usePortfolio();
  const [chartLoaded, setChartLoaded] = useState(false);
  const chartInstanceRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartLoaded) {
      // Load Chart.js dynamically
      import('chart.js/auto').then(() => {
        setChartLoaded(true);
      });
    } else if (chartLoaded && portfolioSummary.allocationByType.length > 0) {
      renderChart();
    }
    
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartLoaded, portfolioSummary]);

  const renderChart = () => {
    if (!canvasRef.current) return;
    
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const colors = [
      '#3B82F6', // blue
      '#10B981', // green
      '#F59E0B', // amber
      '#8B5CF6', // purple
      '#EC4899', // pink
      '#EF4444', // red
      '#6366F1', // indigo
      '#14B8A6', // teal
    ];
    
    import('chart.js').then((ChartJS) => {
      chartInstanceRef.current = new ChartJS.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: portfolioSummary.allocationByType.map(item => 
            item.type.charAt(0).toUpperCase() + item.type.slice(1)
          ),
          datasets: [
            {
              data: portfolioSummary.allocationByType.map(item => item.value),
              backgroundColor: colors.slice(0, portfolioSummary.allocationByType.length),
              borderWidth: 1,
              borderColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#4b5563',
                padding: 15,
                usePointStyle: true,
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const labelIndex = context.dataIndex;
                  const value = context.dataset.data[labelIndex] as number;
                  const percentage = portfolioSummary.allocationByType[labelIndex].percentage;
                  return ` ${context.label}: $${value.toLocaleString()} (${percentage.toFixed(1)}%)`;
                }
              }
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true
          }
        }
      });
    });
  };

  return (
    <div className="card h-[400px] flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Asset Allocation</h2>
      </div>
      <div className="flex-1 p-4 relative">
        {!chartLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="dot-flashing"></div>
          </div>
        )}
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default AllocationChart;