'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>

        <div className="w-full">
          <div>
            <label className="mb-2 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <input
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-xs font-medium text-gray-900" htmlFor="password">
              Password
            </label>
            <input
              className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
          </div>
        </div>

        <Button className="mt-4 w-full" type="submit" aria-disabled={isPending}>
          {isPending ? 'Logging in...' : 'Log in'}
        </Button>

        {errorMessage ? (
          <p className="mt-3 text-sm text-red-500">{errorMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
