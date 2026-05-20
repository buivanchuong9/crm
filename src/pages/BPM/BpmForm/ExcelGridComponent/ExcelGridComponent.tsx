import React from 'react';
import DataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
  { key: 'status', name: 'Status' }
];

const rows = [
  { id: 0, title: 'Example Task 1', status: 'Pending' },
  { id: 1, title: 'Example Task 2', status: 'Completed' },
];

const ExcelLikeComponent = () => {
  return (
    <DataGrid columns={columns} rows={rows} />
  );
};

export default ExcelLikeComponent;