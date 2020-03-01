/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Generate an upload limit message based on the provided max size
 *
 * @param {int} size The upload limit size
 * @returns {string}
 */
const uploadLimit = size => t(
	'browser_warning',
	'Because you are using an outdated browser, your won\'t be able to upload files bigger than {maxsize}.',
	{ maxsize: OC.Util.humanFileSize(size) }
)

/**
 * Use the result of the ua-parser lib to create your checks
 * Then output your warning here.
 * Only one warning per type will be displayed
 */
export default {
	'32bit': {
		rule: ua => ['amd64', 'arm64'].indexOf(ua.getCPU().architecture) === -1,
		msg: uploadLimit(2 * 1024 * 1024 * 1024),
		type: 'uploadlimit',
	},
	'IE6 - IE8': {
		rule: ua => ua.getBrowser().name === 'IE' && ['6', '7', '8'].indexOf(ua.getBrowser().major) > -1,
		msg: uploadLimit(2 * 1024 * 1024 * 1024),
		type: 'uploadlimit',
	},
	'IE9 - IE11': {
		rule: ua => ua.getBrowser().name === 'IE' && ['9', '10', '11'].indexOf(ua.getBrowser().major) > -1,
		msg: uploadLimit(4 * 1024 * 1024 * 1024),
		type: 'uploadlimit',
	},
}
