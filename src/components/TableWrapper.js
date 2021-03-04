import React, {useEffect, useState} from 'react';
import CustomTable from './CustomTable';
import { SortIndicator } from "react-virtualized";
import { generateRandomItem, widths } from '../helpers';

const ADDED_ITEMS_COUNT = 20;

const TableWrapper = () => {
	const [list, setList] = useState({data: []});
	const [selectedItems, setSelectedItems] = useState({});

	useEffect(() => {
		let items = [];
		for(let i = 0; i < ADDED_ITEMS_COUNT; i++) {
			items.push(generateRandomItem(i))
		}
		setList({data: items})
	},[]);

	const headerRenderer = ({
	    columnData,
	    dataKey,
	    disableSort,
	    label,
	    sortBy,
	    sortDirection
	  }) => {
	    return (
	      <React.Fragment key={dataKey}>
	        <div>
	          {label}
	          {
	          	sortBy === dataKey &&
		          <SortIndicator sortDirection={sortDirection} />
		      }
	        </div>
	      </React.Fragment>
	    );
  	};
  	const onItemClick = (rowData) => {
		if(selectedItems[rowData.id] !== undefined){
			delete selectedItems[rowData.id];
		} else {
			selectedItems[rowData.id] = rowData;
		}
		setSelectedItems({...selectedItems})
  	}

  	const onRemoveItems = () => {
  		if(Object.keys(selectedItems).length > 0){
	  		setList({
	  			data: list.data.filter(item => selectedItems[item.id] === undefined)
	  		})
	  		setSelectedItems({})
  		}
  	}
   
  	const onScroll = () => {
  		setTimeout(() => {loadMore()}, 500)
  	}
  	const loadMore = () => {
		let newItems = [];
  		let lastIndexOfCurrentList = list.data.length+1;
  		for (let i = 0; i <= 100; i++) {
	        newItems.push(generateRandomItem(lastIndexOfCurrentList + i))
	    }
	    setList({
	    	data: [...list.data, ...newItems]
	    });
  	}

	return (
		<div className="wrapper">
			{
				Object.keys(selectedItems).length > 0 &&
			 	<button onClick={onRemoveItems} className="remove_button">Remove Items</button>
			}
			<CustomTable 
				list={list.data} 
				widths={widths} 
				headers={headerRenderer}
				onScroll={onScroll}
				onItemClick={onItemClick}
				selectedItems={selectedItems}
			/>
		</div>
	)
};

export default TableWrapper;