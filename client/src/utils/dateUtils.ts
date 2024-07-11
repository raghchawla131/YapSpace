export const getTimeDifference = (createdAt: string): string => {
  const createdAtDate = new Date(createdAt);
  const timeDifference = Date.now() - createdAtDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference}s`;
  } else if (secondsDifference < 3600) {
    const minutesDifference = Math.floor(secondsDifference / 60);
    return `${minutesDifference}m`;
  } else if (secondsDifference < 86400) {
    const hoursDifference = Math.floor(secondsDifference / 3600);
    return `${hoursDifference}h`;
  } else {
    const daysDifference = Math.floor(secondsDifference / 86400);
    return `${daysDifference}d`;
  }
};