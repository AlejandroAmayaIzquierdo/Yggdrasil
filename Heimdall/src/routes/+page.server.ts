import { getRequestEvent } from '$app/server';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import * as auth from '$lib/server/auth';

export const load: PageServerLoad = async () => {
	const user = requireLogin();

	return { user };
};

function requireLogin() {
	const { locals } = getRequestEvent();

	if (!locals.user) {
		return redirect(302, '/login');
	}

	return locals.user;
}

export const actions: Actions = {
	logout: async (event) => {
		auth.deleteSessionTokenCookie(event);
		return redirect(302, '/login');
	}
};
