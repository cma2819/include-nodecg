import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import execa from 'execa';
import del from 'del';
import appRootPath from 'app-root-path';
import isRoot from 'is-root';
import isDocker from 'is-docker';

const nodecgPath = appRootPath.resolve('node_modules/nodecg');

fs.readdirSync(nodecgPath);

const symlink = promisify(fs.symlink);
const readdir = promisify(fs.readdir);
const mkdir = promisify(fs.mkdir);

export const { name: bundleName } = appRootPath.require('package.json');

export const bowerInstall = async (): Promise<void> => {
	const nodecgDirFiles = await readdir(nodecgPath, { encoding: 'utf8' });
	if (!nodecgDirFiles.includes('bower.json')) {
		return;
	}
	const shouldAllowRoot = isDocker() && isRoot();
	const bowerProcess = execa.command(
		shouldAllowRoot
			? 'bower install --production --allow-root'
			: 'bower install --production',
		{ preferLocal: true, cwd: nodecgPath },
	);
	bowerProcess.stderr.pipe(process.stderr);
	await bowerProcess;
};

export const linkBundle = async (): Promise<void> => {
	const sourceBundlePath = appRootPath.resolve('bundles');
	try {
		await readdir(sourceBundlePath);
	} catch (error) {
		if (error.code === 'ENOENT') {
			await mkdir(sourceBundlePath);
		}
	}
	const bundlePath = path.join(nodecgPath, 'bundles');
	await del(bundlePath);
	await symlink(
		path.relative(path.dirname(bundlePath), sourceBundlePath),
		bundlePath,
		'dir',
	);
};

export const linkCfg = async (): Promise<void> => {
	const sourceCfgPath = appRootPath.resolve('cfg');
	try {
		await readdir(sourceCfgPath);
	} catch (error) {
		if (error.code === 'ENOENT') {
			await mkdir(sourceCfgPath);
		} else {
			throw error;
		}
	}
	const cfgPath = path.join(nodecgPath, 'cfg');
	await del(cfgPath);
	await symlink(
		path.relative(path.dirname(cfgPath), sourceCfgPath),
		cfgPath,
		'dir',
	);
};

export const linkDb = async (): Promise<void> => {
	const sourceDbPath = appRootPath.resolve('db');
	try {
		await readdir(sourceDbPath);
	} catch (error) {
		if (error.code === 'ENOENT') {
			await mkdir(sourceDbPath);
		} else {
			throw error;
		}
	}
	const dbPath = path.join(nodecgPath, 'db');
	await del(dbPath);
	await symlink(
		path.relative(path.dirname(dbPath), sourceDbPath),
		dbPath,
		'dir',
	);
};

export const start = (): void => {
	require(nodecgPath);
};
