function waitForSeconds(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000 * seconds);
  });
}

async function longPoll() {
  try {
    const [response] = await Promise.all([
      fetch("/api/users"),
      waitForSeconds(1),
    ]);

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    longPoll();
  }
}

longPoll();
