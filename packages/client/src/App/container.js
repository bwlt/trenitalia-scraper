// @flow

import { reduxForm } from "redux-form";
import { gql, withApollo } from "react-apollo";
import compose from "recompose/compose";
import withHandlers from "recompose/withHandlers";
import withState from "recompose/withState";
import moment from "moment";

export type Props = ReduxFormProps & {
  solutions: Array<SolutionObject>
};

function range(from: number, to: number): number[] {
  const arr = [];
  for (let i = from; i < to; i++) {
    arr.push(i);
  }
  arr.push(to);
  return arr;
}

const SolutionsQuery = gql`
  query(
    $origin: Station!,
    $destination: Station!,
    $date: Date!,
    $time: TimeHour!,
    $limit: Int,
    $offset: Int
  ) {
    solutions(
      origin: $origin,
      destination: $destination,
      date: $date,
      time: $time,
      limit: $limit,
      offset: $offset
    ) {
      origin
      destination
      arrivaltime
      departuretime
      minprice
    }
  }
`;

const initialValues = {
  date: moment().add(10, "d")
};

function validate(values) {
  const errors = {};

  if (!values.from) errors.from = "Required";
  if (!values.to) errors.to = "Required";
  if (!values.date) errors.date = "Required";

  return errors;
}

const onSubmit = (props: {
  client: ApolloClient,
  appendSolutions: (newSolutions: SolutionObject[]) => void
}) => async data => {
  // Basic function to query solutions
  const getSolutions = async (
    {
      date,
      limit,
      offset = 0
    }: {
      date: moment,
      limit?: number,
      offset?: number
    } = {}
  ) => {
    const { data: { solutions } } = await props.client.query({
      query: SolutionsQuery,
      variables: {
        origin: data.origin,
        destination: data.destination,
        date: date.format("DD-MM-YYYY"),
        time: "00",
        limit,
        offset
      }
    });
    return solutions;
  };

  // Function to "consume" the day incrementing the offset
  const getDailySolutions = async ({
    day,
    onSolutions = () => undefined
  }: {
    day: moment,
    onSolutions?: (solutions: SolutionObject[]) => void
  }) => {
    const dailySolutions = [];

    for (;;) {
      const offset = dailySolutions.length;
      const solutions = await getSolutions({ offset, date: day });
      if (solutions.length === 0) break;

      const nextDaySolution = solutions.findIndex(
        s => !moment(s.departuretime).isSame(day, "day")
      );
      if (nextDaySolution === -1) {
        // We can get other data because the day is not finished.
        dailySolutions.push(...solutions);
        onSolutions(solutions);
      } else {
        throw new Error("Unimplemented");
      }
    }

    return dailySolutions;
  };

  // Search in a range of days.
  // ps is an array of daily searches to await for
  const daysRange = 3;
  const ps = range(-daysRange, daysRange).map(async (num: number) => {
    const selectedDay = moment(data.date).add(num, "days").startOf("day");
    return await getDailySolutions({
      day: selectedDay,
      onSolutions: props.appendSolutions // append solutions while they are found
    });
  });

  await Promise.all(ps); // magic stuff ✨
};

export default compose(
  withState("solutions", "setSolutions", []),
  withHandlers({
    appendSolutions: ({ solutions, setSolutions }) => newSolutions =>
      setSolutions(solutions.concat(newSolutions))
  }),
  withApollo,
  withHandlers({
    onSubmit
  }),
  reduxForm({
    initialValues,
    form: "search",
    validate
  })
);
