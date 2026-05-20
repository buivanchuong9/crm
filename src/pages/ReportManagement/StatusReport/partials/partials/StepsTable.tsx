import React from 'react';

interface StepsTableProps {
  steps: Record<string, number> | null;
}

export const StepsTable: React.FC<StepsTableProps> = ({ steps }) => {
  if (!steps || Object.keys(steps).length === 0) {
    return <p>Không có dữ liệu steps khả dụng.</p>;
  }

  return (
    <table className="steps-table">
      <thead>
        <tr>
          <th>Tên bước</th>
          <th>Số lượng</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(steps).map(([stepName, count], index) => (
          <tr key={index}>
            <td>{stepName}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};