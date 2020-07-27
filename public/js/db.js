const dbPromised = idb.open("info-bundesliga", 1, function(upgradeDb) {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "idEvent"
  });
  teamsObjectStore.createIndex("post_title", "post_title", {
    unique: false
  });
});

function saveForLater(team) {
  dbPromised
    .then(function(db) {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      console.log(team);
      if(team.events == null){
        console.log("Jadwal ini kosong!");
      } else {
        team.events.forEach(function(data) {
          store.add(data);
        })
      }
      return tx.complete;
    })
    .then(function() {
      console.log("Jadwal berhasil di simpan.");
    })
    .catch(function() {
      alert("Jadwal ini sudah pernah disimpan!")
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(team) {
        resolve(team);
      });
  });
}

function deleteById(id) {
  return new Promise(function(resolve, reject) {
      dbPromised.then(function(db) {
      const tx = db.transaction('teams', 'readwrite');
      const store = tx.objectStore('teams');
      store.delete(id);
      return tx.complete;
    }).then(function() {
      console.log('Item deleted');
      resolve(id);
    });
  });
}