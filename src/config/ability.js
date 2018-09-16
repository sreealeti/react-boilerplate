export default store => {
  const { auth: { user } } = store.getState();

  if (user) {
    // protected routes
    switch (user.role) {
      case 'admin':
        return ['/navbar', '/test', '/recipes', '/recipes/:id', '/recipes/new', '/'];
      case 'user_manager':
        return ['/users'];
      default:
        return ['/books'];
    }
  }

  // public routes
  return ['/'];
};
