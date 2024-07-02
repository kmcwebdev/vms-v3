import {
  clerkMiddleware,
  createRouteMatcher,
  auth,
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);
const isManageUsersPage = createRouteMatcher(["/manage-users"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
