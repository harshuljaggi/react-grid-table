import { useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const useRowVirtualizer = (props, tableManager) => {
  const {
    config: {
      isPaginated,
      isVirtualScroll,
      additionalProps: { rowVirtualizer: rowVirtualizerProps },
    },
    refs: { tableRef },
    paginationApi: { page, pageSize, totalPages },
    rowsApi: { totalRows },
  } = tableManager;

  const rowCount = useMemo(() => {
    if (!isPaginated) return totalRows;

    return totalPages === page
      ? totalRows - (totalPages - 1) * pageSize
      : pageSize;
  }, [isPaginated, totalRows, totalPages, page, pageSize]);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => (isVirtualScroll ? tableRef?.current : null),
    estimateSize: () => 35,
    overscan: 20,
    ...rowVirtualizerProps,
  });

  return rowVirtualizer;
};

export default useRowVirtualizer;
