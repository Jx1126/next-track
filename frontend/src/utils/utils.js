/**
 * Utility functions for formatting duration
 * 
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration in "minutes:seconds" format
 */
export function formatDuration(seconds) {
  if (!seconds) return '--';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Utility function to format date
 * 
 * @param {string|Date} input - Date input
 * @return {string} Formatted date string in "Month Day, Hour:Minute AM/PM" format
 */
export function formatDate(input) {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}