import '../Css/albumTable.css';
import '../Css/common.css';
import { useEffect, useState } from 'react';

const AlbumTable = ({ data, columns, title, enableSearch = false, enableSort = false }) => {
    // State for managing filtered data, search input, sorting, selected types, and filter dropdown visibility
    const [filteredData, setFilteredData] = useState(data);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState({ sortField: "", sortOrder: "" });
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    // Effect to filter, search, and sort data whenever dependencies change
    useEffect(() => {
        let updatedData = [...data];

        // Apply search filter if enabled
        if (enableSearch && search) {
            updatedData = updatedData.filter((item) =>
                Object.values(item).some(val => val?.toString().toLowerCase().includes(search.toLowerCase()))
            );
        }

        // Apply type filtering based on selected checkboxes
        if (selectedTypes.length > 0) {
            updatedData = updatedData.filter((item) => selectedTypes.includes(item.type));
        }

        // Apply sorting if enabled
        if (enableSort && sort.sortField) {
            updatedData = updatedData.sort((a, b) => compare(a[sort.sortField], b[sort.sortField], sort.sortOrder));
        }

        setFilteredData(updatedData);
    }, [data, search, selectedTypes, sort]);

    // Function to compare values for sorting
    const compare = (a, b, order) => {
        return order === 'Asc' ? (a > b ? 1 : b > a ? -1 : 0) : (a > b ? -1 : b > a ? 1 : 0);
    };

    // Toggle filter dropdown visibility
    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown);
    };

    // Function to handle checkbox selection for filtering by type
    const handleTypeFilterChange = (type) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    return (
        <div className='card my-4 app-table-card'>
            <div className="d-flex align-items-center justify-content-between">
                {/* Search functionality */}
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
                            <span className="input-group-text bg-white">
                                <a>
                                    <img src="../Images/search-icon.svg" alt="search icon" />
                                </a>
                            </span>
                        </div>

                        {/* Type Filter Dropdown */}
                        <div className='d-flex position-relative'>
                            <button className='ms-3 filter-button' onClick={toggleFilterDropdown}>
                                <span className='mx-2 text-no-wrap'>
                                    <span className='ms-1'>
                                        Type {selectedTypes.length > 0 ? `(${selectedTypes.length})` : ""}
                                    </span>
                                    <img src="../Images/down-arrow.svg" alt="down arrow icon" />
                                </span>
                            </button>

                            {/* Filter Options Dropdown */}
                            {showFilterDropdown && (
                                <div className="filter-dropdown">
                                    {["EP", "Album", "Single"].map((type) => (
                                        <label key={type} className="filter-option">
                                            <input
                                                type="checkbox"
                                                checked={selectedTypes.includes(type)}
                                                onChange={() => handleTypeFilterChange(type)}
                                            />
                                            {type}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                }
            </div>

            {/* Table displaying the filtered data */}
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
                    {filteredData.map((row, index) => (
                        <tr key={index} className="table-row">
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlbumTable;
