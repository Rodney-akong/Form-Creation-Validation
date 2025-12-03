// fetch-data.js

// 1. Async function that fetches user data and renders it
async function fetchUserData() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const dataContainer = document.getElementById('api-data');

    // Safety: if the container doesn't exist, stop and warn in console
    if (!dataContainer) {
        console.error('No element with id "api-data" found in the document.');
        return;
    }

    try {
        // Show a loading message (in case DOMContentLoaded fired earlier)
        dataContainer.textContent = 'Loading user data...';

        // 2. Fetch the data (await makes the code wait for the network response)
        const response = await fetch(apiUrl);

        // 3. Check HTTP success (status in the 200-299 range)
        if (!response.ok) {
            // Create a helpful error for the catch block
            throw new Error(`Network response was not OK (status: ${response.status})`);
        }

        // 4. Parse JSON body
        const users = await response.json();

        // 5. Clear loading message before rendering results
        dataContainer.innerHTML = '';

        // 6. Build the list
        if (!Array.isArray(users) || users.length === 0) {
            dataContainer.textContent = 'No users found.';
            return;
        }

        const userList = document.createElement('ul');

        users.forEach(user => {
            const li = document.createElement('li');
            // Safety: ensure a name exists; fallback if not
            li.textContent = user && user.name ? user.name : '(no name)';
            userList.appendChild(li);
        });

        dataContainer.appendChild(userList);
    } catch (error) {
        // 7. Error handling: inform the user and log details for debugging
        dataContainer.innerHTML = '';
        dataContainer.textContent = 'Failed to load user data.';
        console.error('Error fetching user data:', error);
    }
}

// 8. Run fetchUserData once the DOM is ready
document.addEventListener('DOMContentLoaded', fetchUserData);
