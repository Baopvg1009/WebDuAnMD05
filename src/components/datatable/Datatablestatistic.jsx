import React, { useState, useEffect } from "react";
import { DataGridPremium, GridToolbar } from '@mui/x-data-grid-premium';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import { db } from "../../firebase";
import { statisticRows } from "../../datatablesource";
import "./datatable.scss";
import Chartthongke from "../chart/Chartthongke";
import { query, where, getDocs, collection } from 'firebase/firestore';

const Datatablestatistic = () => {
    const [data, setData] = useState([]);
    const [filterModel, setFilterModel] = useState({
        items: [],
        quickFilterValues: [''],
    });
    const [ignoreDiacritics, setIgnoreDiacritics] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db, "HoaDon"), where("trangthai", "==", 3)));
            const fetchedData = [];
            querySnapshot.forEach((doc) => {
                fetchedData.push({ id: doc.id, ...doc.data() });
            });
            setData(fetchedData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };
    

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Thống kê
            </div>
            <div className="custom-search-bar">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimeRangePicker']}>
                        <DateTimeRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
                    </DemoContainer>
                </LocalizationProvider>
                <div className="searchButton">Search</div>
            </div>

            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flex: '1 0 65%' }}>
                    <DataGridPremium
                        key={ignoreDiacritics.toString()}
                        rows={data}
                        columns={statisticRows}
                        filterModel={filterModel}
                        onFilterModelChange={setFilterModel}
                        hideFooter
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{ toolbar: { showQuickFilter: true } }}
                        ignoreDiacritics={ignoreDiacritics}
                        initialState={{
                            aggregation: {
                                model: {
                                    tongtien: 'sum'
                                }
                            }
                        }}
                    />
                </div>
                <div style={{ flex: '1 0 35%' }}>
                    <Chartthongke data={data} />
                </div>
            </div>


        </div>

    );
};

export default Datatablestatistic;
