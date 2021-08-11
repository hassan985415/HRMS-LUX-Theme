export default async ({ store, redirect }) => {
  if (!store.state.app.user.isAuthenticated) {
    return redirect('/signin')
  }
};
