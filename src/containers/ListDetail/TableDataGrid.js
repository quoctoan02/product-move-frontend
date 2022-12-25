import * as React from 'react';
import { useState } from 'react';
import { Grid, Box, Menu, MenuItem, Button } from '@mui/material';
import { useDemoData } from '@mui/x-data-grid-generator';
import MuiIcons from '../../components/MuiIcons'
import LinearProgress from '@mui/material/LinearProgress';
import {
    DataGrid,
    GridToolbar,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    MoreVertIcon
} from '@mui/x-data-grid';
const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

function CustomToolbar({ handleOpenModal }) {
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const openMenu = Boolean(anchorElMenu);

    return (
        <GridToolbarContainer>
            {/* default buttons */}
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />

            <Button
                variant="contained"
                size="small"
                startIcon=''
                //disabled={selectionModel.length === 0}
                onClick={() => {
                    handleOpenModal();
                    //setAnchorElMenu(event.currentTarget);
                }}
            >
                ADD
            </Button>

            {/* <Menu
                id="menu-options"
                anchorEl={anchorElMenu}
                open={openMenu}
                onClose={() => {
                    setAnchorElMenu(null);
                }}
            >
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </Menu> */}
        </GridToolbarContainer>
    );
}

export default function TableDataGrid(props) {
    const [selectionModel, setSelectionModel] = useState([]);
    const [pageSize, setPageSize] = React.useState(25);
    const { data } = useDemoData({
        dataSet: 'Employee',
        visibleFields: VISIBLE_FIELDS,
        rowLength: 100,
    });

    const handleOpenModal = () => {
        props.toggleOpenModal();
    }

    const handleRowClick = (params, event, details) => {
        console.log(params.row.name);
    };

    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                {...data}
                sx={{
                    "& .MuiDataGrid-virtualScroller": {
                        'border-left': '1px solid #dddddd',
                        'border-right': '1px solid #dddddd',
                    },
                    "&.MuiDataGrid-root": {
                        border: 'none'
                    },
                    "& .MuiDataGrid-columnSeparator": {
                        //display: "none"
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        //display: "none"
                        color: '#666',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                    },
                    "& .MuiDataGrid-toolbarContainer": {
                        backgroundColor: "#f5f5f5"
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "#f5f5f5"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        border: '1px solid #c5e7f2',
                        backgroundColor: '#c9eefa'
                    },
                    "& .MuiDataGrid-cell:focus-within": {
                        outline: "none",
                    },
                    "& .MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within": {
                        outline: "none",
                    },
                    "& .MuiDataGrid-columnHeader:focus-within": {
                        outline: "none",
                    },
                    '& .MuiDataGrid-row:hover': {
                        cursor: "pointer",
                        backgroundColor: "#36e75d21"
                        //backgroundColor: "#edf4fb"
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: "#36e75d21"
                        //backgroundColor: "rgb(0 255 56 / 13%)"
                    },
                    '& .MuiDataGrid-row.Mui-selected:hover': {
                        //backgroundColor: "rgba(87, 197, 111, 0.13)"
                        backgroundColor: "#b7f9da"
                    },
                    '& .MuiDataGrid-row:nth-child(even):not(:hover):not(.MuiDataGrid-row.Mui-selected)': {
                        backgroundColor: '#f8f8f8'
                    },
                    backgroundColor: '#fff'
                }}
                onRowClick={handleRowClick}
                GridLinesVisibility="None"
                pageSize={pageSize}
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                pagination
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
                //loading
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                components={{
                    Toolbar: CustomToolbar,
                    //LoadingOverlay: LinearProgress,
                }}
                get
                componentsProps={{
                    toolbar: {
                        selectionModel,
                        handleOpenModal
                    },
                }}
            />
        </Box>
    );
}