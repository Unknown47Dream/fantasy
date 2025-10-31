export interface Transfer {
  date: string;
  ref: string;
  names: { name: string; url: string }[];
  oldTeams: { name: string; url: string; metaData: string }[];
  newTeams: { name: string; url: string; metaData: string }[];
}
