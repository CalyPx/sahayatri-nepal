"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  createSessionToken,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  DUMMY_PASSWORD_HASH,
} from "@/lib/auth";

const LOCK_THRESHOLD = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const user = email ? await prisma.adminUser.findUnique({ where: { email } }) : null;
  const isLocked = !!user?.lockedUntil && user.lockedUntil > new Date();

  // Always run the same PBKDF2 work, whether or not the account exists or is
  // locked, so response timing can't be used to enumerate valid admin emails.
  const valid = await verifyPassword(password, user?.passwordHash ?? DUMMY_PASSWORD_HASH);

  if (isLocked) {
    redirect("/admin/login?error=locked");
  }

  if (!user || !valid) {
    if (user) {
      const attempts = user.failedAttempts + 1;
      await prisma.adminUser.update({
        where: { id: user.id },
        data: {
          failedAttempts: attempts,
          lockedUntil: attempts >= LOCK_THRESHOLD ? new Date(Date.now() + LOCK_DURATION_MS) : null,
        },
      });
    }
    redirect("/admin/login?error=1");
  }

  await prisma.adminUser.update({
    where: { id: user.id },
    data: { failedAttempts: 0, lockedUntil: null },
  });

  const token = await createSessionToken({ adminId: user.id, email: user.email });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
