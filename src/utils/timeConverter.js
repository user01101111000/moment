import { formatDistanceToNow } from "date-fns";

export default function timeConverter(postTime) {
  const textTime = formatDistanceToNow(postTime);

  return textTime.split("about").join("").trim() + " ago";
}
