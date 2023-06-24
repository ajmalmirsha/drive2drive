


import React from 'react';
import DataTable from 'react-data-table-component';
import Checkbox from '@material-ui/core/Checkbox';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const sortIcon = <ArrowDownward  />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

function DataTableBase(props) {
    return (
        <DataTable
            pagination
            selectableRowsComponent={Checkbox}
            selectableRowsComponentProps={selectProps}
            sortIcon={sortIcon}
            dense
            {...props}
        />
    );
}

export default DataTableBase;