import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Turns the better-auth session into a signed JWT so the Express API
 * can validate protected requests (JWT validation requirement).
 */
export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return NextResponse.json(
        { error: "Server is missing JWT_SECRET" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      {
        sub: session.user.id,
        email: session.user.email,
        name: session.user.name || "",
        image: session.user.image || "",
      },
      secret,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json(
      { error: "Unable to create token" },
      { status: 500 }
    );
  }
}
