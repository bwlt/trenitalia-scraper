declare type SolutionObject = {|
  from:     string,
  to:       string,
  fromTime: moment,
  toTime:   moment,
  duration: moment.duration,
  price:    string,
  trains:   string[],
|}
