export default function auth({ next, router }) {
    if (!localStorage.getItem('address')) {
      return router.push({ name: 'home' });
    }
  
    return next();
}
  