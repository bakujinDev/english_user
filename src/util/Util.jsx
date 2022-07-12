import moment from "moment";

export function getWeek() {
  const weekOfMonth = (m) => m.week() - moment(m).startOf("month").week() + 1;
  const nowDate = moment().utc(true);

  return `${nowDate.format("MMMM")} ${weekOfMonth(nowDate)}th`;
}
