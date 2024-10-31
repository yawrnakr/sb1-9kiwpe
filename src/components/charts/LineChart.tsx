import React from 'react';

interface LineChartProps {
  data: number[];
  labels: string[];
  color: string;
}

export function LineChart({ data, labels, color }: LineChartProps) {
  const maxValue = Math.max(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((maxValue - value) / maxValue) * 100;
    return `${x},${y}`;
  }).join(' ');

  const colorMap = {
    blue: '#3B82F6',
    green: '#10B981',
    yellow: '#F59E0B',
  };

  return (
    <div className="relative h-16">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={colorMap[color as keyof typeof colorMap]}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between">
        {labels.map((label, index) => (
          <span key={index} className="text-xs text-gray-400">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}