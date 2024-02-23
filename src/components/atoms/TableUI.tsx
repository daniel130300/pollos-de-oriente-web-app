import { FC, memo, useMemo } from "react";
import { Box, Paper, Table as MuiTable, TableHead, TableCell, TableBody, TableRow, TablePagination, Skeleton } from "@mui/material";
import { Cell, ColumnDef, flexRender, getCoreRowModel, Row, useReactTable } from "@tanstack/react-table";

interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
  isFetching?: boolean;
  skeletonCount?: number;
  skeletonHeight?: number;
  headerComponent?: JSX.Element;
  page: number;
  handleChangePage: (page: number) => void;
  rowsPerPage: number;
  handleChangeRowsPerPage: (e: any) => void;
  onClickRow?: (cell: Cell<any, unknown>, row: Row<any>) => void;
  emptyText?: string;
  handleRow?: () => void;
  recordsCount: number | undefined | null;
  recordsCountLoading?: boolean;
}

const TableUI: FC<TableProps> = ({
  data,
  columns,
  isFetching,
  skeletonCount = 10,
  skeletonHeight = 26,
  headerComponent,
  onClickRow,
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  emptyText,
  handleRow,
  recordsCount,
  recordsCountLoading = false,
}) => {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoisedHeaderComponent = useMemo(() => headerComponent, [headerComponent]);

  const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const skeletons = Array.from({ length: skeletonCount }, (_, i) => i);

  const columnCount = getAllColumns().length;

  const noDataFound = !isFetching && (!memoizedData || memoizedData.length === 0);

  return (
    <Paper elevation={2} style={{ padding: "0 0 1rem 0" }}>
      <Box paddingX="1rem">
        {memoisedHeaderComponent && <Box>{memoisedHeaderComponent}</Box>}
      </Box>
      <Box style={{ overflowX: "auto", minHeight: 600 }}>
        <MuiTable>
          {!isFetching && (
            <TableHead>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
          )}
          <TableBody>
            {!isFetching ? (
              getRowModel()?.rows.map((row) => (
                <TableRow key={row.id} onClick={handleRow}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell onClick={() => onClickRow?.(cell, row)} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                {skeletons.map((skeleton) => (
                  <TableRow key={skeleton}>
                    {Array.from({ length: columnCount }, (_, i) => i).map((elm) => (
                      <TableCell key={elm}>
                        <Skeleton height={skeletonHeight} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </MuiTable>
      </Box>
      {noDataFound && (
        <Box my={2} textAlign="center">
          {emptyText}
        </Box>
      )}
      {recordsCountLoading ? (
        <Box pt={1} px={2} display="flex" justifyContent="flex-end">
          <Skeleton width={300} height={skeletonHeight} />
        </Box>
      ) : (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={recordsCount ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => handleChangePage(page)}
          onRowsPerPageChange={(e) => handleChangeRowsPerPage(+e.target.value)}
          labelRowsPerPage="Filas por pagina"
          labelDisplayedRows={({ from, to, count }) => `${from} al ${to} ${count !== -1 ? `de ${count} registros` : `más que ${to}`}`}
        />
      )}
    </Paper>
  );
};

export default memo(TableUI);