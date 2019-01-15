
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
import '@babel/polyfill'

import UAParser from 'ua-parser-js'
import rules from './rules'

const userAgentData = new UAParser(navigator.userAgent)

// Matching rules
Object.values(rules).some(({rule, limit}, index) => {
	if (rule(userAgentData)) {
		console.debug('Upload limit detected:', Object.keys(rules)[index]);

		// register listener
		document.getElementById('file_upload_start').addEventListener('input', event => {
			if (event && event.target && event.target.files) {
				// checking files
				[...event.target.files].forEach(file => {
					if (file.size > limit) {
						// warn user
						OC.Notification.showTemporary(t('core', 'One of the file you uploaded is too big for your browser (max {maxsize}).', {
							maxsize: OC.Util.humanFileSize(limit)
						}))
						// stop upload
						event.stopPropagation();
					}
				})
			}
		})

		return true
	}
})
