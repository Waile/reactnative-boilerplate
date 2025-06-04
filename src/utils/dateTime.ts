/**
 * DATE TIME UTILITY
 * 
 * THIS UTILITY PROVIDES CONSISTENT DATE FORMATTING AND MANIPULATION
 * IT SIMPLIFIES DATE OPERATIONS THROUGHOUT THE APP
 */

// DATE FORMAT OPTIONS
export enum DateFormat {
  SHORT = 'SHORT', // e.g. 01/25/2023
  MEDIUM = 'MEDIUM', // e.g. Jan 25, 2023
  LONG = 'LONG', // e.g. January 25, 2023
  FULL = 'FULL', // e.g. Wednesday, January 25, 2023
}

// TIME FORMAT OPTIONS
export enum TimeFormat {
  SHORT = 'SHORT', // e.g. 8:30 PM
  MEDIUM = 'MEDIUM', // e.g. 8:30:45 PM
  MILITARY = 'MILITARY', // e.g. 20:30
}

/**
 * FORMAT DATE USING SPECIFIED FORMAT
 * 
 * @param date - Date to format
 * @param format - Desired format
 * @param locale - Optional locale (defaults to system locale)
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | number | string,
  format: DateFormat = DateFormat.MEDIUM,
  locale?: string
): string => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // FORMATTING OPTIONS BASED ON SELECTED FORMAT
    let options: Intl.DateTimeFormatOptions;
    
    switch (format) {
      case DateFormat.SHORT:
        options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        break;
      case DateFormat.MEDIUM:
        options = { year: 'numeric', month: 'short', day: 'numeric' };
        break;
      case DateFormat.LONG:
        options = { year: 'numeric', month: 'long', day: 'numeric' };
        break;
      case DateFormat.FULL:
        options = { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        };
        break;
      default:
        options = { year: 'numeric', month: 'short', day: 'numeric' };
    }
    
    return dateObj.toLocaleDateString(locale, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * FORMAT TIME USING SPECIFIED FORMAT
 * 
 * @param date - Date/time to format
 * @param format - Desired time format
 * @param locale - Optional locale
 * @returns Formatted time string
 */
export const formatTime = (
  date: Date | number | string,
  format: TimeFormat = TimeFormat.SHORT,
  locale?: string
): string => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // FORMATTING OPTIONS BASED ON SELECTED FORMAT
    let options: Intl.DateTimeFormatOptions;
    
    switch (format) {
      case TimeFormat.SHORT:
        options = { hour: 'numeric', minute: '2-digit', hour12: true };
        break;
      case TimeFormat.MEDIUM:
        options = { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true };
        break;
      case TimeFormat.MILITARY:
        options = { hour: '2-digit', minute: '2-digit', hour12: false };
        break;
      default:
        options = { hour: 'numeric', minute: '2-digit', hour12: true };
    }
    
    return dateObj.toLocaleTimeString(locale, options);
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
};

/**
 * FORMAT DATETIME USING SPECIFIED FORMATS
 * 
 * @param date - Date to format
 * @param dateFormat - Desired date format
 * @param timeFormat - Desired time format
 * @param locale - Optional locale
 * @returns Formatted date and time string
 */
export const formatDateTime = (
  date: Date | number | string,
  dateFormat: DateFormat = DateFormat.MEDIUM,
  timeFormat: TimeFormat = TimeFormat.SHORT,
  locale?: string
): string => {
  return `${formatDate(date, dateFormat, locale)} ${formatTime(date, timeFormat, locale)}`;
};

/**
 * GET RELATIVE TIME STRING (e.g. "2 hours ago", "yesterday")
 * 
 * @param date - Date to compare against current time
 * @param locale - Optional locale
 * @returns Relative time string
 */
export const getRelativeTime = (
  date: Date | number | string,
  locale?: string
): string => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    // LESS THAN A MINUTE
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    // LESS THAN AN HOUR
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    // LESS THAN A DAY
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    // LESS THAN A WEEK
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      if (days === 1) {
        return 'yesterday';
      }
      return `${days} days ago`;
    }
    
    // MORE THAN A WEEK, USE STANDARD FORMATTING
    return formatDate(dateObj, DateFormat.MEDIUM, locale);
  } catch (error) {
    console.error('Error calculating relative time:', error);
    return '';
  }
};

/**
 * ADD TIME TO A DATE
 * 
 * @param date - Starting date
 * @param amount - Amount to add
 * @param unit - Time unit (days, hours, etc.)
 * @returns New date with added time
 */
export const addTime = (
  date: Date | number | string,
  amount: number,
  unit: 'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds'
): Date => {
  const dateObj = date instanceof Date ? new Date(date) : new Date(date);
  
  switch (unit) {
    case 'years':
      dateObj.setFullYear(dateObj.getFullYear() + amount);
      break;
    case 'months':
      dateObj.setMonth(dateObj.getMonth() + amount);
      break;
    case 'weeks':
      dateObj.setDate(dateObj.getDate() + (amount * 7));
      break;
    case 'days':
      dateObj.setDate(dateObj.getDate() + amount);
      break;
    case 'hours':
      dateObj.setHours(dateObj.getHours() + amount);
      break;
    case 'minutes':
      dateObj.setMinutes(dateObj.getMinutes() + amount);
      break;
    case 'seconds':
      dateObj.setSeconds(dateObj.getSeconds() + amount);
      break;
  }
  
  return dateObj;
};

/**
 * CHECK IF DATE IS TODAY
 * 
 * @param date - Date to check
 * @returns True if date is today
 */
export const isToday = (date: Date | number | string): boolean => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * CHECK IF DATE IS IN THE PAST
 * 
 * @param date - Date to check
 * @returns True if date is in the past
 */
export const isPast = (date: Date | number | string): boolean => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj < new Date();
};

/**
 * CHECK IF DATE IS IN THE FUTURE
 * 
 * @param date - Date to check
 * @returns True if date is in the future
 */
export const isFuture = (date: Date | number | string): boolean => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj > new Date();
};

/**
 * FORMAT DATE AS CALENDAR DATE (e.g. MAY 15)
 * 
 * @param date - Date to format
 * @returns Month and day string
 */
export const formatCalendarDate = (date: Date | number | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
  const day = dateObj.getDate();
  
  return `${month} ${day}`;
};

export default {
  formatDate,
  formatTime,
  formatDateTime,
  getRelativeTime,
  addTime,
  isToday,
  isPast,
  isFuture,
  formatCalendarDate,
  DateFormat,
  TimeFormat,
};
