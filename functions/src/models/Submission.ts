import { ObjectId } from "mongodb";

export default interface Submission {
  _id?: ObjectId;
  date: string;
  activity?: string;
  keyMoments?: string;
  hDYFeel?: string;
  satisfaction: number;
  contentment: number;
  joy: number;
  relief: number;
  hopelessness: number;
  loneliness: number;
  disappointment: number;
  gloomy: number;
  anxiety: number;
  stressed: number;
  worried: number;
  doubtful: number;
  mad: number;
  annoyed: number;
  irritation: number;
  frustration: number;
  withdrawn: number;
  uncomfortable: number;
  offended: number;
  disturbed: number;
}
