export default () => next => action => {
  if (process.env.NODE_ENV !== 'production') {
    const { type, payload, meta } = action;

    console.groupCollapsed(type);
    console.groupEnd();
  }

  return next(action);
};
