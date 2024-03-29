
/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
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
import UAParser from 'ua-parser-js'
import rules from './rules'

const userAgentData = new UAParser(navigator.userAgent)
const shownTypes = []

// Matching rules
const initBrowserCheck = function() {
	console.debug('Browser warning check started')

	Object.values(rules).forEach(({ rule, msg, type }, index) => {
		if (rule(userAgentData)) {

			// make sure we only display one warning per type
			if (shownTypes.indexOf(type) === -1) {
				console.debug('Matching rule detected:', Object.keys(rules)[index])

				// insert warning
				const warning = '<p class="warning">' + msg + '</p>'

				const submit = document.getElementById('submit-wrapper')
				const saml = document.getElementById('saml-select-user-back-end')

				if (submit) {
					submit.insertAdjacentHTML('afterend', warning)
				} else if (saml) {
					saml.insertAdjacentHTML('afterend', warning)
				}

				// save used type
				shownTypes.push(type)

			// rule type already used
			} else {
				console.debug('Matching rule detected but ignored:', Object.keys(rules)[index])
			}
		}
	})

	console.debug('Browser warning initialized')
}

window.addEventListener('DOMContentLoaded', initBrowserCheck)
