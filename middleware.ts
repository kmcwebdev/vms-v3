import {
  clerkMiddleware,
  createRouteMatcher,
  getAuth,
  clerkClient
} from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);
const isManageUsersPage = createRouteMatcher(["/manage-users"]);

const isAdmin = async (req: any) => {
  const { userId } = getAuth(req); // Use userId instead of sessionId for clarity and accuracy

  if (!userId) {
    return false;
  }

  try {
    const { userId } = await req.body.json();

    const user = await clerkClient.users.getUser(userId);

    console.log(user.firstName);

  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
};

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth().protect();
  }

  if (isManageUsersPage(req)) {
    const userIsAdmin = await isAdmin(req);
    if (!userIsAdmin) {
      return new Response("Forbidden", { status: 403 });
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import {
//   clerkMiddleware,
//   createRouteMatcher,
//   getAuth,
// } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher(["/cms(.*)"]);
// const isManageUsersPage = createRouteMatcher(["/manage-users"]);

// const isAdmin = async (req) => {
//   const { userId } = getAuth(req); // Use userId instead of sessionId for clarity and accuracy

//   if (!userId) {
//     return false;
//   }

//   try {
//     const userResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//       },
//     });

//     if (!userResponse.ok) {
//       throw new Error("Failed to fetch user data");
//     }

//     const user = await userResponse.json();
//     return user?.user_metadata?.role === "Admin";
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     return false;
//   }
// };

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) {
//     await auth().protect();
//   }

//   if (isManageUsersPage(req)) {
//     const userIsAdmin = await isAdmin(req);
//     if (!userIsAdmin) {
//       return new Response("Forbidden", { status: 403 });
//     }
//   }
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
