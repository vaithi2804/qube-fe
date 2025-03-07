import Pagination from '@mui/material/Pagination';
import '../Css/albumTable.css';
import '../Css/common.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumTable = ({ data, columns, title, enableSearch = false, enableSort = false, enablePagination = false }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState(data);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ sortField: "", sortOrder: "" });

    useEffect(() => {
        setFilteredData(data);
        setTotalPage(Math.ceil(data?.length / rowsPerPage));
    }, [data, rowsPerPage]);

    const compare = (a, b, order) => {
        return order === 'Asc' ? (a > b ? 1 : b > a ? -1 : 0) : (a > b ? -1 : b > a ? 1 : 0);
    };

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const BindingData = () => {
        let processedData = [...filteredData];
        
        if (enableSort && sort.sortField) {
            processedData = processedData.sort((a, b) => compare(a[sort.sortField], b[sort.sortField], sort.sortOrder));
        }
        
        if (enableSearch && search) {
            processedData = processedData.filter((item) =>
                Object.values(item).some(val => val?.toString().toLowerCase().includes(search.toLowerCase()))
            );
        }
        
        if (enablePagination) {
            const startIndex = (currentPage - 1) * rowsPerPage;
            const endIndex = startIndex + rowsPerPage;
            processedData = processedData.slice(startIndex, endIndex);
        }

        return processedData?.map((row, index) => (
            <tr key={index} className="table-row">
                {columns.map((col, colIndex) => (
                    <td key={colIndex}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
                ))}
            </tr>
        ));
    };

    return (
        <div className='card my-4 app-table-card '>
            <div className="d-flex align-items-center justify-content-between">
            {enableSearch &&
            <div className="d-flex align-items-center gap-0 my-3">                 
                    <div className="input-group search-max-width">
                        <input
                            type="search"
                            className="form-control search-form-field border-end-0 ms-3"
                            placeholder="Search"
                            aria-label="al-search-grp"
                            name='searchData'
                            id="al-search-grp"
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <span className="input-group-text bg-white" >
                            <a>
                                <img src="../Images/search-icon.svg" alt="search icon" />
                            </a>
                        </span>
                    </div>
                    <div className='d-flex'>
                        <button className='ms-3 filter-button'>
                            <span className='mx-2 text-no-wrap'>
                            <span className='ms-1'>Type</span>
                            <img src="../Images/down-arrow.svg" alt="down arrow icon" />     
                            </span>
                        </button>
                    </div>     
            </div>
            }
            </div>
            <table className='table-full-width'>
                <thead>
                    <tr className='table-header'>
                        {columns.map((col, index) => (
                            <th key={index} onClick={() => enableSort && setSort({ sortField: col.key, sortOrder: sort.sortOrder === 'Asc' ? 'Desc' : 'Asc' })}>
                                {col.label} {enableSort && sort.sortField === col.key ? (sort.sortOrder === 'Asc' ? '↑' : '↓') : ''}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {BindingData()}
                </tbody>
            </table>
            {/* {enablePagination && <Pagination count={totalPage} page={currentPage} onChange={handleChange} />} */}
        </div>
    );
};

export default AlbumTable;
