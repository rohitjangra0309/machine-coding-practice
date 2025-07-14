import { useState } from "react";

function CheckboxSelect() {
    const [isChecked, setIsChecked] = useState({});  // Object to track checkboxes
    const [checkboxValues] = useState(["one", "two", "three"]); // List of checkboxes

    const handleChange = (item) => {
        setIsChecked((prev) => ({
            ...prev,
            [item]: !prev[item], // Toggle individual checkbox
        }));
    };

    // Handle "Select All" checkbox
    const handleSelectAll = () => {
        const allSelected = checkboxValues.every((item) => isChecked[item]); // Check if all are selected
        if (allSelected) {
            // If all are selected, unselect all
            setIsChecked({});
        } else {
            // If not all are selected, select all
            const newChecked = checkboxValues.reduce((acc, item) => {
                acc[item] = true;
                return acc;
            }, {});
            setIsChecked(newChecked);
        }
    };

    return (
        <div>
            {/* Select All Checkbox */}
            <label>
                <input 
                    type="checkbox" 
                    checked={checkboxValues.every((item) => isChecked[item])}  // Check if all are selected
                    onChange={handleSelectAll} 
                />
                Select All
            </label>

            {/* Individual checkboxes */}
            {checkboxValues.map((item, index) => (
                <label key={index} style={{ display: "block", marginBottom: "5px" }}>
                    <input 
                        type="checkbox" 
                        checked={!!isChecked[item]}  // Ensure the value is a boolean (true or false)
                        onChange={() => handleChange(item)} 
                    />
                    {item}
                </label>
            ))}

            <p>Selected: {Object.keys(isChecked).filter((key) => isChecked[key]).join(", ") || "None"}</p>
        </div>
    );
}

export default CheckboxSelect;
