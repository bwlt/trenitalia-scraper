// @flow

process.on("unhandledRejection", reason => {
  console.error(reason); // eslint-disable-line no-console
  // TODO future: send a mail
});
