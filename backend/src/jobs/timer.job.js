/*
  Simple placeholder: when a project is created, schedule a 24-hour timer.
  For production use, use a job queue (BullMQ, Redis, or external scheduler).
*/
function schedule24h(projectId) {
  console.log('[jobs] schedule24h called for', projectId);
  // This demo uses setTimeout which will be lost if process restarts.
  setTimeout(() => {
    console.log('[jobs] 24h timer fired for project', projectId);
    // TODO: notify admin/send email/update Supabase
  }, 24 * 60 * 60 * 1000);
}

module.exports = { schedule24h };
