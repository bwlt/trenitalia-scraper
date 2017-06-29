declare type SolutionObject = {|
  from: string,
  to: string,
  fromTime: moment$Moment,
  toTime: moment$Moment,
  duration: moment$MomentDuration,
  price: string,
  trains: string[]
|};

declare type StationObject = {|
  id: string,
  name: string
|};
