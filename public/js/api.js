const baseUrl = "https://www.thesportsdb.com/";

function status(response) {
	if(response.status != 200) {
		console.log("Error : "+response.status);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
}

function json(response) {
	return response.json();
}

function error(error) {
	console.log("Error :"+error);
}

function getTeams() {
	if ("caches" in window) {
    caches.match(baseUrl + "api/v1/json/1/lookup_all_teams.php?id=4331").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let teamsHTML = "";
		data.teams.forEach(function(team) {
			teamsHTML += `
				<div class="card">
					<a href="./tdetil.html?id=${team.idTeam}">
						<div class="card-image waves-effect waves-block waves-light">
							<img src="${team.strTeamBadge}" alt="Badge Club"/>
						</div>
					</a>
					<div class="card-content">
						<span class="card-title" style="font-weight: bold;">${team.strTeam}</span>
						<p>${team.strDescriptionEN}</p>
					</div>
				</div>
			`;
		});
		document.getElementById("team").innerHTML = teamsHTML;
        });
      }
    });
  }

	fetch(baseUrl + "api/v1/json/1/lookup_all_teams.php?id=4331")
	.then(status)
	.then(json)
	.then(function(data) {
		let teamsHTML = "";
		data.teams.forEach(function(team) {
			teamsHTML += `
				<div class="card">
					<a href="./tdetil.html?id=${team.idTeam}">
						<div class="card-image waves-effect waves-block waves-light">
							<img src="${team.strTeamBadge}" alt="Badge Club"/>
						</div>
					</a>
					<div class="card-content">
						<span class="card-title" style="font-weight: bold;">${team.strTeam}</span>
						<p>${team.strDescriptionEN}</p>
					</div>
				</div>
			`;
		});
		document.getElementById("team").innerHTML = teamsHTML;
	})
	.catch(error);
}

function getPastEvent() {
	if ("caches" in window) {
    caches.match(baseUrl + "api/v1/json/1/eventspastleague.php?id=4331").then(function(response) {
      if (response) {
        response.json().then(function(data) {
        let pastHTML = "";
		data.events.forEach(function(past) {
			pastHTML += `
				<div class="card">
					<div class="card-content">
						<span class="card-title" style="font-weight: bold;">${past.strEvent}</span>
						<table class="centered">
					        <thead>
					          <tr>
					              <th></th>
					              <th>Score</th>
					              <th></th>
					          </tr>
					        </thead>
					        <tbody>
					          <tr>
					            <td>${past.intHomeScore}</td>
					            <td>-</td>
					            <td>${past.intAwayScore}</td>
					          </tr>
					        </tbody>
					    </table>
					    <p style="text-align: center; font-weight: bold;">Goal By:</p>
					    <table class="centered">
					        <thead>
					          <tr>
					              <th>${past.strHomeTeam}</th>
					              <th>${past.strAwayTeam}</th>
					          </tr>
					        </thead>
					        <tbody>
					          <tr>
					            <td>${past.strHomeGoalDetails}</td>
					            <td>${past.strAwayGoalDetails}</td>
					          </tr>
					        </tbody>
					    </table>
					    <p style="text-align: center; font-weight: bold;">Get Card :</p>
					    <table class="centered">
					        <thead>
					          <tr>
					          	  <th>Yellow Card</th>
					              <th>${past.strHomeTeam}</th>
					              <th>Red Card</th>
					          </tr>
					        </thead>
					        <tbody>
					          <tr>
					            <td>${past.strHomeYellowCards}</td>
					            <td>-</td>
					            <td>${past.strHomeRedCards}</td>
					          </tr>
					        </tbody>
					    </table>
					    <table class="centered">
					        <thead>
					          <tr>
					          	  <th>Yellow Card</th>
					              <th>${past.strAwayTeam}</th>
					              <th>Red Card</th>
					          </tr>
					        </thead>
					        <tbody>
					          <tr>
					            <td>${past.strAwayYellowCards}</td>
					            <td>-</td>
					            <td>${past.strAwayRedCards}</td>
					          </tr>
					        </tbody>
					    </table>
					    <p>Date Match : ${past.dateEvent}</p>
					</div>
				</div>
			`;
		});
		document.getElementById("past").innerHTML = pastHTML;
        });
      }
    });
  }

	fetch(baseUrl + "api/v1/json/1/eventspastleague.php?id=4331")
	.then(status)
	.then(json)
	.then(function(data) {
		let pastHTML = "";
		data.events.forEach(function(past) {
			pastHTML += `
				<div class="card">
					<div class="card-content">
						<span class="card-title" style="font-weight: bold;">${past.strEvent}</span>
						<table class="centered">
					        <thead>
					          <tr>
					              <th></th>
					              <th>Score</th>
					              <th></th>
					          </tr>
					        </thead>
					        <tbody>
					          <tr>
					            <td>${past.intHomeScore}</td>
					            <td>-</td>
					            <td>${past.intAwayScore}</td>
					          </tr>
					        </tbody>
					    </table>
					    <p style="text-align: center; font-weight: bold;">Goal By:</p>
					    <table class="centered">
					        <thead>
					          <tr>
					              <th>${past.strHomeTeam}</th>
					              <th>${past.strAwayTeam}</th>
					          </tr>
					        </thead>
					        <tbody>
					          <tr>
					            <td>${past.strHomeGoalDetails}</td>
					            <td>${past.strAwayGoalDetails}</td>
					          </tr>
					        </tbody>
					    </table>
					    <p style="text-align: center; font-weight: bold;">Get Card :</p>
					    <p style="text-align: center;"><i>${past.strHomeTeam}</i></p>
					    <table class="centered">
					        <thead>
					          <tr>
					          	  <th>Yellow Card</th>
					              <th>Red Card</th>
					          </tr>
					        </thead>
					        <tbody>
					          <tr>
					            <td>${past.strHomeYellowCards}</td>
					            <td>${past.strHomeRedCards}</td>
					          </tr>
					        </tbody>
					    </table>
					    <p style="text-align: center;"><i>${past.strAwayTeam}</i></p>
					    <table class="centered">
					        <thead>
					          <tr>
					          	  <th>Yellow Card</th>
					              <th>Red Card</th>
					          </tr>
					        </thead>
					        <tbody>
					          <tr>
					            <td>${past.strAwayYellowCards}</td>
					            <td>${past.strAwayRedCards}</td>
					          </tr>
					        </tbody>
					    </table>
					    <p>Date Match : ${past.dateEvent}</p>
					</div>
				</div>
			`;
		});
		document.getElementById("past").innerHTML = pastHTML;
	})
	.catch(error);
}


function getNextEvent() {
	return new Promise(function(resolve, reject) {
		const urlParams = new URLSearchParams(window.location.search);
		const idParam = urlParams.get("id");

			if ("caches" in window) {
		    caches.match(baseUrl + "api/v1/json/1/eventsnext.php?id=" + idParam).then(function(response) {
		      if (response) {
		        response.json().then(function(data) {
		          let eventHTML = "";
					if(data.events == null){
						eventHTML = `<div class="card">
											<div class="card-content">
											    <span class="card-title">Tidak ada 5 Pertandingan kedepan!</span>
											</div>
									</div>`;
					} else {
						data.events.forEach(function(event) {
							eventHTML += `
								<div class="card">
								    <div class="card-content">
								        <span class="card-title">${event.strEvent}</span>
									    <p>Match in League : ${event.strLeague}</p>
									    <p>Season : ${event.strSeason}</p>
									    <p>Play Match : ${event.dateEvent}</p>
									</div>
								</div>
							`;
						});
					}
					document.getElementById("body-content").innerHTML = eventHTML;
		        	resolve(data);
		        });
		      }
		    });
		  }

		fetch(baseUrl + "api/v1/json/1/eventsnext.php?id=" + idParam)
		.then(status)
		.then(json)
		.then(function(data) {
			let eventHTML = "";
			if(data.events == null){
				eventHTML = `<div class="card">
									<div class="card-content">
									    <span class="card-title">Tidak ada 5 Pertandingan kedepan!</span>
									</div>
							</div>`;
			} else {
				data.events.forEach(function(event) {
					eventHTML += `
						<div class="card">
						    <div class="card-content">
						        <span class="card-title">${event.strEvent}</span>
							    <p>Match in League : ${event.strLeague}</p>
							    <p>Season : ${event.strSeason}</p>
							    <p>Play Match : ${event.dateEvent}</p>
							</div>
						</div>
					`;
				});
			}
			document.getElementById("body-content").innerHTML = eventHTML;
			resolve(data);
		});
	});
}

function getSavedJadwalTeams() {
	getAll().then(function(teams) {
		if (teams.length==0) {
			document.getElementById("jadwal").innerHTML = `
				<div class="card">
					<div class="card-content">
						<p>Maaf, Tidak ada jadwal yang tersimpan!</p>
					</div>
			</div>
			`;
		} else {
			console.log(teams);
			let jadwalHTML ="";
			teams.forEach(function(team) {
				jadwalHTML += `
					<div class="card">
						<div class="card-content">
							<span class="card-title">${team.strEvent}</span>
							<p>Match in League : ${team.strLeague}</p>
							<p>Season : ${team.strSeason}</p>
							<p>Play Match : ${team.dateEvent}</p>
							<p><a href="./thapus.html?id=${team.idEvent}">Hapus Jadwal ini</a></p>
						</div>
					</div>
				`;
			});
			document.getElementById("jadwal").innerHTML = jadwalHTML;
		}
	});
}

function deleteJadwalById() {
	const urlParams = new URLSearchParams(window.location.search);
	const idParam = urlParams.get("id");

	deleteById(idParam).then(function(team) {
		let teamHTML = "";
		teamHTML = `
			<div class="card">
					<div class="card-content">
						<p>Jadwal Sudah Terhapus</p>
					</div>
			</div>
		`;

		document.getElementById("body-content").innerHTML = teamHTML;
	})
}