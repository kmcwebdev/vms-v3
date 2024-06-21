import { clerkMiddleware, createRouteMatcher, getAuth } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/cms(.*)'
]);

const isManageUsersPage = createRouteMatcher(['/manage-users']);

const isAdmin = async (req:any) => {
  const { sessionId } = getAuth(req);

  if (!sessionId) {
    return false;
  }

  const user = await fetch(`https://api.clerk.dev/v1/users/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
    },
  }).then((res) => res.json());

  console.log(user?.user_metadata?.role);

  return user?.user_metadata?.role === 'admin';
};

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth().protect();
  }

  if (isManageUsersPage(req)) {
    const userIsAdmin = await isAdmin(req);
    if (!userIsAdmin) {
      return new Response('Forbidden', { status: 403 });
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
