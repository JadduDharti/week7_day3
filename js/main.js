window.onload = function () {
    document.querySelector('form').addEventListener('submit', getData);

    function getData(event) {
        event.preventDefault();

        const season = document.querySelector('#season').value;
        const round = document.querySelector('#round').value;

        axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
            .then(function (response) {
                const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                populateTable(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function populateTable(data) {
        const tableBody = document.querySelector('#table-body');

        // Clear table body
        tableBody.innerHTML = '';

        // Add table rows
        for (let driver of data) {
            const row = document.createElement('tr');

            const positionCell = document.createElement('td');
            positionCell.textContent = driver.position;
            row.appendChild(positionCell);

            const driverCell = document.createElement('td');
            driverCell.textContent = `${driver.Driver.givenName} ${driver.Driver.familyName}`;
            row.appendChild(driverCell);

            const nationalityCell = document.createElement('td');
            nationalityCell.textContent = driver.Driver.nationality;
            row.appendChild(nationalityCell);

            const pointsCell = document.createElement('td');
            pointsCell.textContent = driver.points;
            row.appendChild(pointsCell);

            tableBody.appendChild(row);
        }
    }
};