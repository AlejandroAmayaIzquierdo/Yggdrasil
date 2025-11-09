import { hash } from '@node-rs/argon2';
import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';

// Generate a random user ID
function generateUserId(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(10));
	return encodeBase32LowerCaseNoPadding(bytes);
}

async function generateUserHash() {
	const userPassword = 'admin'; // Change this to your desired password
	const userId = generateUserId();

	const passwordHash = await hash(userPassword, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	console.log('\n=== Admin User Credentials ===');
	console.log('ID:', userId);
	console.log('Username: admin');
	console.log('Password:', userPassword);
	console.log('Password Hash:', passwordHash);
	console.log('\n=== SQL INSERT Statement ===');
	console.log(
		`INSERT INTO user (id, username, password_hash, age) VALUES ('${userId}', 'admin', '${passwordHash}', NULL);`
	);
	console.log('\n⚠️  Make sure to change the admin password after first login!');
}

generateUserHash().catch(console.error);
