import moment from "moment";

export const getTimeFromSeconds = (seconds: number) => {
    return moment.utc(moment.duration(seconds, "s").asMilliseconds()).format("HH:mm:ss")
}
