const key = 'AIzaSyDW3ZtPKk1x64PEINzrak24_MMt7q0tGNk';

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
.then(res => res.json())
.then(data => {
  if (data.models) {
    const names = data.models.map(m => m.name);
    console.log("Available models:\n" + names.join('\n'));
  } else {
    console.log(data);
  }
})
.catch(err => console.error("ERR:", err));
