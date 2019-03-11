

export const getFormattedHour = (time) => {
    let date = new Date(parseInt(time) * 1000);
    return date.getHours() < 10 ? "0" + date.getHours() + ":00" : date.getHours() + ":00";
};

export const getDayName = (time) => {
    let date = new Date(parseInt(time) * 1000);
    return new Intl.DateTimeFormat(
        'en-US',
        {weekday: 'long'})
        .format(date);
};

export const sliceHourlyData = (time, data) => {
    return data["data"].filter((val) => {
            return new Date(val["time"] * 1000).getDate() === new Date(time * 1000).getDate();
        }
    );
};

export const getCityName = (str) => str
    .split('/')
    .slice(-1)
    .toString()
    .replace('_',' ');
