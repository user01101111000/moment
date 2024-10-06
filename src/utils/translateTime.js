export default function translateTime(timeText, t) {
  switch (true) {
    case timeText.includes("less than a minute ago"):
      return ["", t("time.lessThanAMinuteAgo")];

    case timeText.includes("minute ago"):
      return [timeText.split("minute ago")[0], t("time.minuteAgo")];
    case timeText.includes("minutes ago"):
      return [timeText.split("minutes ago")[0], t("time.minutesAgo")];
    case timeText.includes("hour ago"):
      return [timeText.split("hour ago")[0], t("time.hourAgo")];
    case timeText.includes("hours ago"):
      return [timeText.split("hours ago")[0], t("time.hoursAgo")];
    case timeText.includes("day ago"):
      return [timeText.split("day ago")[0], t("time.dayAgo")];
    case timeText.includes("days ago"):
      return [timeText.split("days ago")[0], t("time.daysAgo")];
    case timeText.includes("month ago"):
      return [timeText.split("month ago")[0], t("time.monthAgo")];
    case timeText.includes("months ago"):
      return [timeText.split("months ago")[0], t("time.monthsAgo")];
    case timeText.includes("year ago"):
      return [timeText.split("year ago")[0], t("time.yearAgo")];
    case timeText.includes("years ago"):
      return [timeText.split("years ago")[0], t("time.yearsAgo")];

    default:
      return "";
  }
}
