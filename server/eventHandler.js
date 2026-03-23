function handleEvents(event, sharedState) {
  // Add timestamp if not present
  if (!event.time) {
    event.time = new Date().toLocaleTimeString();
  }


  // Save event to shared state
  sharedState.events.push(event);

  console.log(`📌 New Event: [${event.time}] ${event.text}`);
}


module.exports = { handleEvents };