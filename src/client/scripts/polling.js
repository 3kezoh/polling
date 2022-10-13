async function poll() {
  const response = await fetch("/api/users");

  if (response.ok) {
    const data = await response.json();

    console.log(data);
  }
}

setInterval(poll, 5000);
