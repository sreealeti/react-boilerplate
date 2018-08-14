export default store => {
  const { auth: { user } } = store.getState();

  if (user) {
    // protected routes
    switch (user.role) {
      case 'testing':
        return ['/navbar', '/users'];
      case 'user_manager':
        return ['/users'];
      default:
        return ['/books'];
    }
  }

  // public routes
  return ['/'];
};
