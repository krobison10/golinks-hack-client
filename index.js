document.getElementById('githubStatsForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const nonForkedOnly = document.getElementById('nonForked').checked;
  
    let url = `https://golinks-github-stats.herokuapp.com/stats?username=${encodeURIComponent(username)}`;
    if (nonForkedOnly) {
      url += '&forked=false';
    }
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Clear previous results
        document.getElementById('result').innerHTML = '';
  
        // Display the JSON data
        const resultContainer = document.getElementById('result');
  
        // Create and append repoCount
        const repoCount = document.createElement('p');
        repoCount.textContent = `Repository Count: ${data.repoCount}`;
        resultContainer.appendChild(repoCount);
  
        // Create and append totalStargazers
        const totalStargazers = document.createElement('p');
        totalStargazers.textContent = `Total Stargazers: ${data.totalStargazers}`;
        resultContainer.appendChild(totalStargazers);
  
        // Create and append totalForkCount
        const totalForkCount = document.createElement('p');
        totalForkCount.textContent = `Total Fork Count: ${data.totalForkCount}`;
        resultContainer.appendChild(totalForkCount);
  
        // Create and append avgRepoSize
        const avgRepoSize = document.createElement('p');
        avgRepoSize.textContent = `Average Repository Size: ${data.avgRepoSize}`;
        resultContainer.appendChild(avgRepoSize);
  
        // Create and append languages
        const languagesTitle = document.createElement('h4');
        languagesTitle.textContent = 'Languages:';
        resultContainer.appendChild(languagesTitle);
  
        const languagesList = document.createElement('ol');
        data.languages.forEach(language => {
          const languageItem = document.createElement('li');
          languageItem.textContent = `${Object.keys(language)[0]}: ${Object.values(language)[0]} repo${Object.values(language)[0] === 1 ? "" : "s"}`;
          languagesList.appendChild(languageItem);
        });
        resultContainer.appendChild(languagesList);
      })
      .catch(error => {
        console.error(error);
        document.getElementById('result').innerText = 'Error fetching GitHub stats.';
      });
  });
  