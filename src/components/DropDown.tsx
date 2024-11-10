import React, { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //NEED BOOTSTRAP JS FOR DROPDOWN TO WORK

type DataObject = Playlist | Artist | Track;

interface DropDownProps {
    items: DataObject[]; // The array of items to be passed into the dropdown
    onClick: (item: DataObject) => void; // The function to be called when an item is clicked
    children: string;
}

const DropDown = ({ items, onClick, children }: DropDownProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        // Filter the items based on the search term
        const filtered = items.filter(item => item.name.toLowerCase().includes(value));
        setFilteredItems(filtered);
    };

    return (
        <div className="dropdown" style={{ width: '100%' }}>
            <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: '100%' }}
            >
                {children}
            </button>
            <ul 
                className="dropdown-menu p-3" 
                aria-labelledby="dropdownMenuButton" 
                style={{ minWidth: '200px', maxHeight: '400px', overflowY: 'auto' }}>
                {/* Search Input */}
                <li>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </li>

                {/* Divider */}
                <li>
                    <hr className="dropdown-divider" />
                </li>

                {/* Filtered Items */}
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <li key={index}>
                            <button className="dropdown-item" type="button" onClick={() => onClick(item)} >
                                {item.name}
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="dropdown-item text-muted">No items found</li>
                )}
            </ul>
        </div>
    );
};

export default DropDown;
