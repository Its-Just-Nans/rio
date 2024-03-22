import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
    // Retrieve the stored value from localStorage on component mount
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    // State to track the current value
    const [value, setValue] = useState(initial);

    // Update localStorage whenever the value changes
    const setStoredValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    // Event listener for changes in localStorage
    const handleStorageChange = (event) => {
        console.log("event");
        if (event.key === key) {
            setValue(event.newValue ? JSON.parse(event.newValue) : null);
        }
    };

    useEffect(() => {
        // Add event listener on component mount
        window.addEventListener("storage", handleStorageChange);

        return () => {
            // Remove event listener on component unmount
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [key]);

    return [value, setStoredValue];
};
