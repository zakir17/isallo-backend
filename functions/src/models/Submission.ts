import { ObjectId } from "mongodb";

export default interface Submission {
  _id?: ObjectId;
  date: string;
  activity?: string;
  keyMoment?: string;
  hDYFeel?: string;
  satisfaction: number;
  contentment: number;
  joy: number;
  relief: number;
  hopeless: number;
  lonely: number;
  disappointed: number;
  gloomy: number;
  anxious: number;
  stressed: number;
  worried: number;
  doubtful: number;
  mad: number;
  annoyed: number;
  irritated: number;
  frustrated: number;
  withdrawn: number;
  uncomfortable: number;
  offended: number;
  disturbed: number;
}
