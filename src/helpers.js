function getUnhandledProps(ComponentProps, props) {
  const handledProps = Object.keys(ComponentProps);
  return Object.keys(props).reduce((acc, prop) => {
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop];
    return acc;
  }, {});
}

export { getUnhandledProps };
