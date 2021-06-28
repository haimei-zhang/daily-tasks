import {
  addDays,
  concatParams,
  dateToTime,
  endOfLocalDay,
  endOfLocalDayTime,
  endOfUTCDay,
  endOfUTCDayTime,
  isAfterEnd,
  isBeforeStart,
  isDateChanged,
  startOfLocalDay,
  startOfLocalDayTime,
  startOfUTCDay,
  startOfUTCDayTime,
  subtractDays,
  transferEndOfDayToStartOfDayDate,
  transferEndOfDayToStartOfDayTime
} from '~utils/core.util';

describe('Core util', () => {

  it('should concat param from object to url string parameters', () => {
    const objParam = {key1: '1', key2: '2'};
    expect(concatParams(objParam)).toEqual('&key1=1&key2=2');
  });

  it('should subtract days', () => {
    const oldDate = new Date(2019, 1, 5);
    const oldTime = new Date(2019, 1, 5).getTime();
    const days = 1;
    const newDate = new Date(2019, 1, 4);
    expect(subtractDays(oldDate, days)).toEqual(newDate);
    expect(subtractDays(oldTime, days)).toEqual(newDate);
  });

  it('should add days', () => {
    const oldDate = new Date(2019, 1, 5);
    const oldTime = new Date(2019, 1, 5).getTime();
    const days = 1;
    const newDate = new Date(2019, 1, 6);
    expect(addDays(oldDate, days)).toEqual(newDate);
    expect(addDays(oldTime, days)).toEqual(newDate);
  });

  it('should transform date to time', () => {
    const oldDate = new Date();
    const oldDateString = new Date().toISOString();
    const oldTime = new Date().getTime();
    const newTime = new Date().getTime();
    expect(dateToTime(oldDate)).toEqual(newTime, 'Date failed');
    expect(dateToTime(oldDateString)).toEqual(newTime, 'String failed');
    expect(dateToTime(oldTime)).toEqual(newTime, 'Number failed');
  });

  it('should set to start of UTC day', () => {
    const oldDate = new Date(new Date().setHours(1, 1, 1, 1));
    const newDate = new Date(new Date().setUTCHours(0, 0, 0, 0));
    const oldTime = new Date().setHours(1, 1, 1, 1);
    expect(startOfUTCDay(oldDate)).toEqual(newDate);
    expect(startOfUTCDay(oldTime)).toEqual(newDate);
  });

  it('should set to end of UTC day', () => {
    const oldDate = new Date(new Date().setHours(1, 1, 1, 1));
    const oldTime = new Date().setHours(1, 1, 1, 1);
    const newDate = new Date(new Date().setUTCHours(23, 59, 59, 999));
    expect(endOfUTCDay(oldDate)).toEqual(newDate);
    expect(endOfUTCDay(oldTime)).toEqual(newDate);
  });

  it('should set to start of UTC day time', () => {
    const oldDate = new Date().setHours(1, 1, 1, 1);
    const oldTime = new Date().setHours(1, 1, 1, 1);
    const newTime = new Date().setUTCHours(0, 0, 0, 0);
    expect(startOfUTCDayTime(oldDate)).toEqual(newTime);
    expect(startOfUTCDayTime(oldTime)).toEqual(newTime);
  });

  it('should set to end of UTC day time', () => {
    const oldDate = new Date(new Date().setHours(1, 1, 1, 1));
    const oldTime = new Date().setHours(1, 1, 1, 1);
    const newTime = new Date().setUTCHours(23, 59, 59, 999);
    expect(endOfUTCDayTime(oldDate)).toEqual(newTime);
    expect(endOfUTCDayTime(oldTime)).toEqual(newTime);
  });

  it('should set to start of local day', () => {
    const oldDate = new Date(new Date().setHours(1, 1, 1, 1));
    const oldTime = new Date().setHours(1, 1, 1, 1);
    const newDate = new Date(new Date().setHours(0, 0, 0, 0));
    expect(startOfLocalDay(oldDate)).toEqual(newDate);
    expect(startOfLocalDay(oldTime)).toEqual(newDate);
  });

  it('should set to end of local day', () => {
    const oldDate = new Date(new Date().setHours(1, 1, 1, 1));
    const oldTime = new Date().setHours(1, 1, 1, 1);
    const newDate = new Date(new Date().setHours(23, 59, 59, 999));
    expect(endOfLocalDay(oldDate)).toEqual(newDate);
    expect(endOfLocalDay(oldTime)).toEqual(newDate);
  });

  it('should set to start of local day time', () => {
    const oldDate = new Date().setHours(1, 1, 1, 1);
    const oldTime = new Date().setHours(1, 1, 1, 1);
    const newTime = new Date().setHours(0, 0, 0, 0);
    expect(startOfLocalDayTime(oldDate)).toEqual(newTime);
    expect(startOfLocalDayTime(oldTime)).toEqual(newTime);
  });

  it('should set to end of local day time', () => {
    const oldDate = new Date(new Date().setHours(1, 1, 1, 1));
    const oldTime = new Date().setHours(1, 1, 1, 1);
    const newTime = new Date().setHours(23, 59, 59, 999);
    expect(endOfLocalDayTime(oldDate)).toEqual(newTime);
    expect(endOfLocalDayTime(oldTime)).toEqual(newTime);
  });

  it('should check whether it is before start', () => {
    const startDate1 = new Date(new Date().getTime() + 1000);
    const startDate2 = new Date(new Date().getTime() - 1000);
    expect(isBeforeStart(startDate1)).toEqual(true);
    expect(isBeforeStart(startDate2)).toEqual(false);
  });

  it('should check whether it is after end', () => {
    const endDate1 = new Date(new Date().getTime() + 1000);
    const endDate2 = new Date(new Date().getTime() - 1000);
    expect(isAfterEnd(endDate1)).toEqual(false);
    expect(isAfterEnd(endDate2)).toEqual(true);
  });

  it('should check whether date is changed', () => {
    const oldDate = new Date(2019, 1, 1);
    const oldTime = new Date(2019, 1, 1).getTime();
    const newDate = new Date(2020, 2, 2);
    const newTime = new Date(2020, 2, 2).getTime();
    expect(isDateChanged(oldDate, oldTime)).toEqual(false);
    expect(isDateChanged(oldDate, newDate)).toEqual(true);
    expect(isDateChanged(oldDate, newTime)).toEqual(true);
    expect(isDateChanged(newDate, newTime)).toEqual(false);
  });

  it('should transfer end of day to start of day time', () => {
    const oldDate = new Date(2019, 1, 1, 23, 59, 59, 59);
    const oldTime = new Date(2019, 1, 1, 23, 59, 59, 59).getTime();
    const newTime = new Date(2019, 1, 1, 0, 0, 0, 0).getTime();

    expect(transferEndOfDayToStartOfDayTime(oldDate)).toEqual(newTime);
    expect(transferEndOfDayToStartOfDayTime(oldTime)).toEqual(newTime);
  });

  it('should transfer end of day to start of day', () => {
    const oldDate = new Date(2019, 1, 1, 23, 59, 59, 59);
    const oldTime = new Date(2019, 1, 1, 23, 59, 59, 59).getTime();
    const newDate = new Date(2019, 1, 1, 0, 0, 0, 0);

    expect(transferEndOfDayToStartOfDayDate(oldDate)).toEqual(newDate);
    expect(transferEndOfDayToStartOfDayDate(oldTime)).toEqual(newDate);
  });

});
