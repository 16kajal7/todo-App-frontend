import axios from 'axios';

const baseUrl = "https://todo-app-backend-szns.onrender.com"; // Adjust endpoint if necessary

// Helper function to remove duplicate to-dos based on 'id'
const removeDuplicateToDos = (data) => {
    // Create a map of to-dos keyed by their ID to remove duplicates
    const uniqueToDos = Array.from(new Map(data.map(item => [item._id, item])).values());
    return uniqueToDos;
};

// Fetch all to-dos
const getAllToDo = (setToDo) => {
    axios.get(baseUrl)
        .then(({ data }) => {
            console.log('Fetched to-dos:', data);

            const uniqueToDos = removeDuplicateToDos(data);
            console.log('Unique to-dos:', uniqueToDos); // Debugging line to check unique to-dos

            setToDo(uniqueToDos);

            // Check for duplicate IDs
            const ids = data.map(item => item.id);
            const uniqueIds = new Set(ids);
            if (ids.length !== uniqueIds.size) {
                console.warn('Duplicate IDs found in fetched data');
            }

            setToDo(data);
        })
        .catch(error => {
            console.error('Failed to fetch to-dos:', error);
            // Optionally, you could handle the error state here
        });
}

// Add a new to-do
const addToDo = (text, setText, setToDo) => {
    axios.post(`${baseUrl}/save`, { text })
        .then(({ data }) => {
            console.log('Added to-do:', data);
            setText("");
            getAllToDo(setToDo); // Refresh the list
        })
        .catch(error => {
            console.error('Failed to add to-do:', error);
            // Optionally, you could handle the error state here
        });
}

const deleteToDo = (_id, setToDo) => {
    axios
        .post(`${baseUrl}/delete`, { _id})
        .then((data) => {
            console.log(data);
            getAllToDo(setToDo)
        })
        .catch((err) => console.log(err));
        }

// Update an existing to-do
const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
    axios.post(`${baseUrl}/update`, { _id: toDoId, text })
        .then(({ data }) => {
            console.log('Updated to-do:', data);
            setText(""); // Clear input field
            setIsUpdating(false); // Exit update mode

            // Fetch the updated list
            getAllToDo((updatedData) => {
                // Check for duplicate IDs
                const ids = updatedData.map(item => item._id);
                const uniqueIds = new Set(ids);
                if (ids.length !== uniqueIds.size) {
                    console.warn('Duplicate IDs found in updated data');
                }

                // Update the state with the new list
                setToDo(updatedData);
            });
        })
        .catch(error => {
            console.error('Failed to update to-do:', error);
            // Optionally, you could handle the error state here
        });
        


}; 



export { getAllToDo, addToDo, updateToDo, deleteToDo };
