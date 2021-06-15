import moment from 'moment';

export const timeHandler = (dataStr) => {
    return moment(dataStr).format("YYYY-MM-DD HH:mm:ss");
};
