import React, { useState, useEffect } from 'react';
import { Column, Table, AutoSizer,SortDirection,InfiniteLoader } from "react-virtualized";
import "react-virtualized/styles.css";
import _ from "lodash";
import './CustomTable.css';

const CustomTable = ({ list, headers, onItemClick, onScroll,widths, selectedItems }) => {
	const TOTAL_WIDTH = window.innerWidth - 50;
	const TOTAL_HEIGHT = window.innerHeight - 50;
	const HEADER_HEIGHT = 70;
	const ROW_HEIGHT = 50;

	const [sortBy, setSortBy] = useState("firstName");
	const [sortDirection, setSortDirection] = useState(SortDirection.ASC);
	const [sortedList, setSortedList] = useState([]);

	const handleOnItemClick = ({index, rowData }) => {
		onItemClick({...rowData});
	}
	const _sortList = ({ sortBy, sortDirection }) => {
	    let newList = _.sortBy(list, [sortBy]);
	    if (sortDirection === SortDirection.DESC) {
	      newList.reverse();
	    }
	    return newList;
	};

	const _sort = ({ sortBy, sortDirection }) => {
	    const sortedList = _sortList({ sortBy, sortDirection });
	    setSortBy(sortBy);
	    setSortDirection(sortDirection);
	    setSortedList(sortedList)
	};

	useEffect(function() {
		setSortedList(_sortList({ sortBy, sortDirection }));
	}, [list])
	return (
		<div className="container">
		 	<InfiniteLoader
                isRowLoaded={({ index}) => !!sortedList[index]}
                threshold={1}
                loadMoreRows={onScroll}
                rowCount={1000000}
            >
	            {({onRowsRendered, registerChild, scrollTop}) => (
	            	<AutoSizer>
						{() => (
							<Table
								onRowsRendered={onRowsRendered}
								ref={registerChild}
						        width={TOTAL_WIDTH}
						        height={TOTAL_HEIGHT}
						        headerHeight={HEADER_HEIGHT}
						        rowHeight={ROW_HEIGHT}
						        sort={_sort}
							    sortBy={sortBy}
							    sortDirection={sortDirection}
						        rowCount={sortedList.length}
						        rowGetter={({ index }) => sortedList[index]}
						       	rowClassName={({ index }) => {
						     		if(sortedList[index]){
						     			return selectedItems[sortedList[index].id] ? "table_row_active" : "";
						     		}
						       	}}
						        onRowClick={({index, rowData}) => handleOnItemClick({index,rowData})}
						        autoHeight={false}
						    >
						        <Column
						          headerRenderer={headers}
						          dataKey="firstName"
						          label="First Name"
						          width={widths.firstName*120}
						        />
						        <Column
						          headerRenderer={headers}
						          dataKey="lastName"
						          label="Last Name"
						          width={widths.lastName*120}
						          disableSort={true}
						        />
						    </Table>
						)}
					</AutoSizer>
	            )}
			</InfiniteLoader>
		</div>
	)
};

export default CustomTable;