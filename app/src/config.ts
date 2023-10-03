const config = {
  swipeEnabled: process.env.SWIPE_ENABLED === undefined ? true : process.env.SWIPE_ENABLED as unknown as boolean,
};

export default config;
