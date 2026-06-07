export function checkIsOpen(openingHoursStr: string): boolean {
  if (!openingHoursStr) return false;
  
  const cleanStr = openingHoursStr.toLowerCase().trim();
  if (cleanStr === '24 hours' || cleanStr === '24/7' || cleanStr === 'always open') return true;
  if (cleanStr === 'closed') return false;

  const parts = openingHoursStr.split('-');
  if (parts.length !== 2) return true; // fallback if format is completely different

  try {
    const parseTime = (timeStr: string) => {
      const match = timeStr.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
      if (!match) return null;
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2] || '0', 10);
      const period = match[3].toUpperCase();
      
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      return hours * 60 + minutes;
    };

    const startMins = parseTime(parts[0]);
    const endMins = parseTime(parts[1]);

    if (startMins === null || endMins === null) {
      return true; // We can't parse it, so default to showing it
    }

    const now = new Date();
    // Bonny Island is usually WAT (UTC+1). We rely on local browser time here.
    const currentMins = now.getHours() * 60 + now.getMinutes();

    return currentMins >= startMins && currentMins <= endMins;
  } catch (e) {
    console.error("Error evaluating opening hours", e);
    return true; // fallback
  }
}
