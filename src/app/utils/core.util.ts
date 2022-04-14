import * as R from 'ramda';
import { User } from '~models/user.model';

export const concatParams = (param: any): string => {
  if (param) {
    let newParam = '';
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        newParam += `&${key}=${param[key]}`;
      }
    }
    return newParam;
  }
  return '';
};

/*dates*/
export const subtractDays = (target: Date | number, days: number): Date => {
  return new Date(dateToTime(target) - (days * 24 * 60 * 60 * 1000));
};

export const addDays = (target: Date | number, days: number): Date => {
  return new Date(dateToTime(target) + (days * 24 * 60 * 60 * 1000));
};

export const dateToTime = (val: any): number => {
  if (val) {
    if (typeof val === 'string') {
      return new Date(val).getTime();
    } else if (typeof val === 'number') {
      return val;
    } else {
      return val.getTime();
    }
  } else {
    return val;
  }
};

export const timeToDate = (val: Date | number): Date => {
  if (typeof val === 'string' || typeof val === 'number') {
    return new Date(val);
  } else {
    return val;
  }
};

export const startOfUTCDay = (date: any): Date => {
  const newDate = dateToTime(date) + new Date().getTimezoneOffset() * 60 * 1000; // add on the timezone offset
  const start = new Date(newDate).setUTCHours(0, 0, 0, 0); // set to beginning of day
  return new Date(start);
};

export const endOfUTCDay = (date: any): Date => {
  const newDate = dateToTime(date) + new Date().getTimezoneOffset() * 60 * 1000; // add on the timezone offset
  const start = new Date(newDate).setUTCHours(23, 59, 59, 999); // set to end of day
  return new Date(start);
};

export const startOfLocalDayTime = (date: Date | number): number => {
  return timeToDate(date) ? timeToDate(date).setHours(0, 0, 0, 0) : dateToTime(date);
};

export const endOfLocalDayTime = (date: Date | number): number => {
  return timeToDate(date) ? timeToDate(date).setHours(23, 59, 59, 999) : dateToTime(date);
};

export const startOfLocalDay = (date: Date | number): Date => {
  return timeToDate(date) ? timeToDate(timeToDate(date).setHours(0, 0, 0, 0)) : timeToDate(date);
};

export const endOfLocalDay = (date: Date | number): Date => {
  return timeToDate(date) ? timeToDate(timeToDate(date).setHours(23, 59, 59, 999)) : timeToDate(date);
};

export const startOfUTCDayTime = (date: Date | number): number => {
  return timeToDate(date) ? timeToDate(date).setUTCHours(0, 0, 0, 0) : dateToTime(date);
};

export const endOfUTCDayTime = (date: Date | number): number => {
  return timeToDate(date) ? timeToDate(date).setUTCHours(23, 59, 59, 999) : dateToTime(date);
};

export const isBeforeStart = (startDate: Date | number): boolean => {
  const today = new Date();
  return dateToTime(startDate) > today.getTime();
};

export const isAfterEnd = (endDate: Date | number): boolean => {
  const today = new Date();
  return dateToTime(endDate) < today.getTime();
};

export const isDateChanged = (oldDate: Date | number, newDate: Date | number): boolean => {
  // if it's on same day, regardless of the time
  if (oldDate && newDate) {
    const oldDay = timeToDate(oldDate).getDate();
    const oldMonth = timeToDate(oldDate).getMonth();
    const oldYear = timeToDate(oldDate).getFullYear();
    const newDay = timeToDate(newDate).getDate();
    const newMonth = timeToDate(newDate).getMonth();
    const newYear = timeToDate(newDate).getFullYear();
    return dateToTime(new Date(oldYear, oldMonth, oldDay)) !== dateToTime(new Date(newYear, newMonth, newDay));
  }
  return !R.equals(oldDate, newDate);
};

export const transferEndOfDayToStartOfDayTime = (endOfDay: any): number => {
  if (endOfDay) {
    return dateToTime(endOfDay) - 24 * 60 * 60 * 1000 + 1;
  } else {
    return endOfDay;
  }
};

export const transferEndOfDayToStartOfDayDate = (endOfDay: any): Date => {
  if (endOfDay) {
    return timeToDate(dateToTime(endOfDay) - 24 * 60 * 60 * 1000 + 1);
  } else {
    return endOfDay;
  }
};

export const getLoggedInUser = (): User => {
  return JSON.parse(sessionStorage.getItem('user'));
};
